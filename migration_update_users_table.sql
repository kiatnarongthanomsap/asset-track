-- ================================================================================
-- Migration: Update Users Table for Complete User Management
-- ================================================================================
-- Description: เพิ่ม columns สำหรับจัดการผู้ใช้และสิทธิ์การเข้าถึงให้สมบูรณ์
-- Date: 2024
-- ================================================================================

-- เพิ่ม columns ที่ขาดหายไป (ถ้ายังไม่มี)
DO $$ 
BEGIN
    -- เพิ่ม email column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'email'
    ) THEN
        ALTER TABLE users ADD COLUMN email VARCHAR(255);
    END IF;

    -- เพิ่ม status column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'status'
    ) THEN
        ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'Active';
    END IF;

    -- เพิ่ม updated_at column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
    END IF;

    -- อัพเดท role default value
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'role'
    ) THEN
        -- ตรวจสอบว่า role มี default หรือไม่
        ALTER TABLE users ALTER COLUMN role SET DEFAULT 'Viewer';
    END IF;
END $$;

-- สร้าง trigger สำหรับอัพเดท updated_at อัตโนมัติ
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ลบ trigger เก่า (ถ้ามี)
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

-- สร้าง trigger ใหม่
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- อัพเดทข้อมูลผู้ใช้ที่มีอยู่แล้วให้มี status = 'Active' (ถ้ายังไม่มี)
UPDATE users 
SET status = 'Active' 
WHERE status IS NULL;

-- อัพเดท role ของผู้ใช้ที่มีอยู่แล้วให้เป็น 'Manager' (ถ้าเป็น null)
UPDATE users 
SET role = 'Manager' 
WHERE role IS NULL;

-- สร้าง index สำหรับ email (ถ้ายังไม่มี)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL;

-- สร้าง index สำหรับ status
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- สร้าง index สำหรับ role
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- ================================================================================
-- Initial User Data (ถ้ายังไม่มีผู้ใช้)
-- ================================================================================

-- เพิ่มผู้ใช้ admin เริ่มต้น (ถ้ายังไม่มี)
INSERT INTO users (username, password, name, email, role, status)
SELECT 'admin', '123456', 'Administrator', 'admin@coop.ku.ac.th', 'Admin', 'Active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin');

-- เพิ่มผู้ใช้ตัวอย่าง (ถ้ายังไม่มี)
INSERT INTO users (username, password, name, email, role, status)
SELECT 'manager', '123456', 'ผู้จัดการระบบ', 'manager@coop.ku.ac.th', 'Manager', 'Active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'manager');

INSERT INTO users (username, password, name, email, role, status)
SELECT 'staff', '123456', 'เจ้าหน้าที่', 'staff@coop.ku.ac.th', 'Staff', 'Active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'staff');

INSERT INTO users (username, password, name, email, role, status)
SELECT 'viewer', '123456', 'ผู้ดูข้อมูล', 'viewer@coop.ku.ac.th', 'Viewer', 'Active'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'viewer');

-- ================================================================================
-- Comments
-- ================================================================================

COMMENT ON TABLE users IS 'ตารางผู้ใช้งานระบบ';
COMMENT ON COLUMN users.username IS 'ชื่อผู้ใช้ (unique)';
COMMENT ON COLUMN users.password IS 'รหัสผ่าน (ควรเข้ารหัสในอนาคต)';
COMMENT ON COLUMN users.name IS 'ชื่อ-นามสกุล';
COMMENT ON COLUMN users.email IS 'อีเมล';
COMMENT ON COLUMN users.role IS 'บทบาท: Admin, Manager, Staff, Viewer';
COMMENT ON COLUMN users.status IS 'สถานะ: Active, Inactive';
COMMENT ON COLUMN users.created_at IS 'วันที่สร้าง';
COMMENT ON COLUMN users.updated_at IS 'วันที่อัพเดทล่าสุด';

-- ================================================================================
-- Verification
-- ================================================================================

-- ตรวจสอบว่า migration สำเร็จ
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

