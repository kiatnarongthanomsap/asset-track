-- ================================================================================
-- Schema for Supabase (PostgreSQL)
-- Asset Track Database Schema
-- ================================================================================

-- Create ENUM type for asset status
CREATE TYPE asset_status AS ENUM ('Normal', 'Repair', 'Check', 'Disposed');

-- ================================================================================
-- 1. Users Table
-- ================================================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    role VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================================
-- 2. Categories Table
-- ================================================================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    prefix VARCHAR(10) NOT NULL UNIQUE
);

-- ================================================================================
-- 3. Assets Table
-- ================================================================================
CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    serial VARCHAR(100),
    price NUMERIC(12, 2) DEFAULT 0.00,
    location VARCHAR(200),
    status asset_status DEFAULT 'Normal',
    purchase_date DATE,
    category VARCHAR(100),
    useful_life INTEGER DEFAULT 5,
    image TEXT,
    is_sticker_printed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_assets_updated_at 
    BEFORE UPDATE ON assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================================================
-- 4. Audit Logs Table
-- ================================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    action_date DATE,
    action VARCHAR(100) NOT NULL,
    asset_code VARCHAR(50),
    operator VARCHAR(100),
    document_ref VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================================
-- Indexes for better performance
-- ================================================================================
CREATE INDEX IF NOT EXISTS idx_assets_code ON assets(code);
CREATE INDEX IF NOT EXISTS idx_assets_category ON assets(category);
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_asset_code ON audit_logs(asset_code);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action_date ON audit_logs(action_date);

-- ================================================================================
-- Seed Data (Optional)
-- ================================================================================
INSERT INTO users (username, password, name, role) 
VALUES ('admin', '123456', 'Administrator', 'Manager')
ON CONFLICT (username) DO NOTHING;

INSERT INTO categories (name) 
VALUES ('Computer'), ('Appliance'), ('Furniture'), ('Peripheral'), ('Tablet')
ON CONFLICT (name) DO NOTHING;

-- ================================================================================
-- Row Level Security (RLS) - Enable if needed
-- ================================================================================
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ================================================================================
-- Comments for documentation
-- ================================================================================
COMMENT ON TABLE users IS 'ตารางผู้ใช้งานระบบ';
COMMENT ON TABLE categories IS 'ตารางหมวดหมู่ครุภัณฑ์';
COMMENT ON COLUMN categories.prefix IS 'อักษรนำหน้ารหัสครุภัณฑ์ (เช่น A, B, C)';
COMMENT ON TABLE assets IS 'ตารางข้อมูลครุภัณฑ์';
COMMENT ON TABLE audit_logs IS 'ตารางบันทึกการทำงาน (Audit Trail)';

COMMENT ON COLUMN assets.code IS 'รหัสครุภัณฑ์ (ต้องไม่ซ้ำ)';
COMMENT ON COLUMN assets.status IS 'สถานะ: Normal, Repair, Check, Disposed';
COMMENT ON COLUMN assets.is_sticker_printed IS 'สถานะการพิมพ์สติกเกอร์';

