-- ================================================================================
-- Insert Default User for Supabase
-- ================================================================================
-- 
-- รันไฟล์นี้ใน Supabase SQL Editor เพื่อเพิ่ม user สำหรับ login
-- Username: admin
-- Password: 123456
-- ================================================================================

INSERT INTO users (username, password, name, role) 
VALUES ('admin', '123456', 'Administrator', 'Manager')
ON CONFLICT (username) DO UPDATE 
SET 
    password = EXCLUDED.password,
    name = EXCLUDED.name,
    role = EXCLUDED.role;

-- ตรวจสอบผลลัพธ์
SELECT * FROM users WHERE username = 'admin';

