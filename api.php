<?php
ob_start(); // Buffer output to prevent accidental whitespace/errors from breaking JSON headers

if (isset($_GET['debug'])) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Ensure CORS is handled for both local and production environments
header('Content-Type: application/json; charset=utf-8');

// Handle OPTIONS request for CORS
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    exit(0);
}


// 3. ตั้งค่า Database (ตรวจสอบรหัสผ่านให้ถูกต้อง)
$host = 'localhost';
$db   = 'asset_track_db';
$user = 'root';
$pass = 'kt%8156982'; 
$charset = 'utf8mb4';
$socket = '/Applications/MAMP/tmp/mysql/mysql.sock'; // MAMP socket path

$dsn = "mysql:host=$host;dbname=$db;charset=$charset;unix_socket=$socket";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     http_response_code(500);
     echo json_encode(['status' => 'error', 'message' => 'DB Connection Failed: ' . $e->getMessage()]);
     exit;
}

// 4. ระบบ Routing
$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'login':
        handleLogin($pdo);
        break;
    case 'assets':
        if ($method == 'GET') fetchAssets($pdo);
        if ($method == 'POST') saveAsset($pdo);
        if ($method == 'DELETE') deleteAsset($pdo);
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

// 5. Functions
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
        echo json_encode(['status' => 'error', 'message' => 'Login failed: Invalid credentials']);
    }
}

function fetchAssets($pdo) {
    $stmt = $pdo->query("SELECT * FROM assets ORDER BY id DESC");
    echo json_encode($stmt->fetchAll());
}

function saveAsset($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $uLife = $data['usefulLife'] ?? 5;
    $isSticker = (isset($data['isStickerPrinted']) && $data['isStickerPrinted']) ? 1 : 0;
    $pDate = $data['purchaseDate'] ?? date('Y-m-d');

    if (isset($data['id']) && $data['id'] > 0) {
        $sql = "UPDATE assets SET code=?, name=?, brand=?, serial=?, price=?, location=?, status=?, purchase_date=?, category=?, useful_life=?, image=?, is_sticker_printed=? WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['code'], $data['name'], $data['brand'], $data['serial'], 
            $data['price'], $data['location'], $data['status'], $pDate,
            $data['category'], $uLife, $data['image'], $isSticker,
            $data['id']
        ]);
        echo json_encode(['status' => 'success', 'message' => 'Asset updated']);
    } else {
        $sql = "INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, image, is_sticker_printed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['code'], $data['name'], $data['brand'], $data['serial'], 
            $data['price'], $data['location'], $data['status'], $pDate,
            $data['category'], $uLife, $data['image'], $isSticker
        ]);
        echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
    }
}

function deleteAsset($pdo) {
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("DELETE FROM assets WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        echo json_encode(['status' => 'success']);
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
