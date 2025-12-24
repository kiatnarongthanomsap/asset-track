-- Create Database
CREATE DATABASE IF NOT EXISTS asset_track_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE asset_track_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 3. Assets Table
CREATE TABLE IF NOT EXISTS assets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    serial VARCHAR(100),
    price DECIMAL(12, 2) DEFAULT 0.00,
    location VARCHAR(200),
    status ENUM('Normal', 'Repair', 'Check', 'Disposed') DEFAULT 'Normal',
    purchase_date DATE,
    category VARCHAR(100),
    useful_life INT DEFAULT 5,
    image TEXT,
    is_sticker_printed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action_date DATE,
    action VARCHAR(100) NOT NULL,
    asset_code VARCHAR(50),
    operator VARCHAR(100),
    document_ref VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Seed Data (Optional)
INSERT INTO users (username, password, name, role) VALUES ('admin', '123456', 'Administrator', 'Manager');
INSERT INTO categories (name) VALUES ('Computer'), ('Appliance'), ('Furniture'), ('Peripheral'), ('Tablet');

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, image, is_sticker_printed) VALUES 
('A003-09-04-2557', 'HP Envy Touch Smart 20-d106d', 'HP', '5CM40301RX', 26990.00, 'เคาน์เตอร์การเงิน ช่อง 1', 'Normal', '2014-04-09', 'Computer', 5, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400', 0),
('A004-09-04-2557', 'MacBook Pro 16" (2021)', 'Apple', '5CM40301SS', 79900.00, 'เคาน์เตอร์ประชาสัมพันธ์', 'Normal', '2021-12-09', 'Computer', 5, 'https://images.unsplash.com/photo-1517336714460-d15f697ce537?auto=format&fit=crop&q=80&w=400', 1),
('X006-22-02-2564', 'Air Purifier 3H', 'Xiaomi', '2860100008560', 7490.00, 'ฝ่ายเทคโนโลยีสารสนเทศ', 'Normal', '2021-02-22', 'Appliance', 3, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=400', 0),
('X007-08-07-2564', 'Air Purifier KJ1000F-A03', 'AWAC', 'MPO100035', 16050.00, 'กำแพงแสน', 'Repair', '2021-07-08', 'Appliance', 5, 'https://images.unsplash.com/photo-1594832281358-1be2fa47f631?auto=format&fit=crop&q=80&w=400', 0),
('X008-08-07-2564', 'Ergonomic Office Chair', 'Herman Miller', 'HM-AERON-01', 45000.00, 'หน้าเคาน์เตอร์สินเชื่อ', 'Normal', '2023-01-15', 'Furniture', 10, 'https://images.unsplash.com/photo-1505797149-43b007664a3d?auto=format&fit=crop&q=80&w=400', 1),
('A010-15-11-2560', 'Printer LaserJet Pro', 'HP', 'VNC30221', 12500.00, 'ห้องบัญชี', 'Disposed', '2017-11-15', 'Peripheral', 5, 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=400', 1),
('X009-08-07-2564', 'Dell UltraSharp 27 Monitor', 'Dell', 'MPO100047', 18900.00, 'บริหารทั่วไป', 'Check', '2022-07-08', 'Peripheral', 5, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400', 0),
('A012-01-02-2565', 'iPad Pro 12.9" M2', 'Apple', 'HXC9982M', 36900.00, 'ผู้จัดการ', 'Normal', '2023-02-01', 'Tablet', 3, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=400', 1);

INSERT INTO audit_logs (action_date, action, asset_code, operator, document_ref) VALUES 
('2024-03-31', 'ตรวจนับ', 'A001-2560', 'จนท.1', 'คก.01'),
('2024-03-30', 'ซ่อม', 'B014-2562', 'จนท.2', 'ซร.05'),
('2024-03-28', 'โอนย้าย', 'C022-2564', 'จนท.1', 'อย.02'),
('2024-03-25', 'จำหน่าย', 'X009-2559', 'หน.พัสดุ', 'จน.01');
