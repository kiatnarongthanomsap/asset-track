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

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, image, is_sticker_printed) 
VALUES ('A003-2567', 'MacBook Pro 16', 'Apple', 'SN12345', 79900.00, 'Finance Dept', 'Normal', '2024-01-20', 'Computer', 5, 'https://images.unsplash.com/photo-1517336714460-d15f697ce537?auto=format&fit=crop&q=80&w=400', 0);
