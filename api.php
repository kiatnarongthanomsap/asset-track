<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// --- Database Configuration ---
$host = 'localhost';
$db   = 'asset_track_db';
$user = 'root';
$pass = ''; // Adjust to your local mysql password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
     exit;
}

// --- Simple Routing ---
$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'login':
        handleLogin($pdo);
        break;
    case 'assets':
        if ($method == 'GET') fetchAssets($pdo);
        if ($method == 'POST') saveAsset($pdo);
        break;
    case 'audit_logs':
        fetchAuditLogs($pdo);
        break;
    case 'categories':
        fetchCategories($pdo);
        break;
    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
        break;
}

// --- Handlers ---

function handleLogin($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $pdo->prepare("SELECT id, username, name, role FROM users WHERE username = ? AND password = ?");
    $stmt->execute([$username, $password]);
    $user = $stmt->fetch();

    if ($user) {
        echo json_encode(['status' => 'success', 'user' => $user]);
    } else {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Login failed']);
    }
}

function fetchAssets($pdo) {
    $stmt = $pdo->query("SELECT * FROM assets ORDER BY id DESC");
    echo json_encode($stmt->fetchAll());
}

function saveAsset($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['id']) && $data['id'] > 0) {
        // UPDATE
        $sql = "UPDATE assets SET code=?, name=?, brand=?, serial=?, price=?, location=?, status=?, purchase_date=?, category=?, useful_life=?, image=?, is_sticker_printed=? WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['code'], $data['name'], $data['brand'], $data['serial'], 
            $data['price'], $data['location'], $data['status'], $data['purchaseDate'],
            $data['category'], $data['usefulLife'], $data['image'], $data['isStickerPrinted'] ? 1 : 0,
            $data['id']
        ]);
        echo json_encode(['status' => 'success', 'message' => 'Asset updated']);
    } else {
        // INSERT
        $sql = "INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['code'], $data['name'], $data['brand'], $data['serial'], 
            $data['price'], $data['location'], $data['status'], $data['purchaseDate'],
            $data['category'], $data['usefulLife'], $data['image']
        ]);
        echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
    }
}

function fetchAuditLogs($pdo) {
    $stmt = $pdo->query("SELECT * FROM audit_logs ORDER BY id DESC LIMIT 50");
    echo json_encode($stmt->fetchAll());
}

function fetchCategories($pdo) {
    $stmt = $pdo->query("SELECT * FROM categories");
    echo json_encode($stmt->fetchAll());
}
?>
