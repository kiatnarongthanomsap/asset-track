-- ================================================================================
-- Migration: Create Settings Table
-- ================================================================================
-- Description: สร้างตารางสำหรับเก็บการตั้งค่าระบบ
-- Date: 2024
-- ================================================================================

-- สร้างตาราง settings
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string', -- string, number, boolean, json
    description TEXT,
    category VARCHAR(50) DEFAULT 'general', -- general, numbering, depreciation, system
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- สร้าง index
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON settings(category);

-- สร้าง trigger สำหรับอัพเดท updated_at
CREATE OR REPLACE FUNCTION update_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_settings_updated_at();

-- ================================================================================
-- Initial Settings Data
-- ================================================================================

-- ตั้งค่าทั่วไป
INSERT INTO settings (setting_key, setting_value, setting_type, description, category)
VALUES 
    ('organization_name', 'สหกรณ์ออมทรัพย์มหาวิทยาลัยเกษตรศาสตร์ จำกัด', 'string', 'ชื่อสหกรณ์/หน่วยงาน', 'general')
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO settings (setting_key, setting_value, setting_type, description, category)
VALUES 
    ('current_year', '2567', 'string', 'ปีระบบปัจจุบัน', 'general')
ON CONFLICT (setting_key) DO NOTHING;

-- ตั้งค่ารหัสทรัพย์สิน
INSERT INTO settings (setting_key, setting_value, setting_type, description, category)
VALUES 
    ('numbering_pattern', '{PREFIX}{RUNNING}-{DD}-{MM}-{YYYY}', 'string', 'รูปแบบรหัสทรัพย์สิน', 'numbering')
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO settings (setting_key, setting_value, setting_type, description, category)
VALUES 
    ('numbering_start_number', '1', 'number', 'เลขเริ่มต้น', 'numbering')
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO settings (setting_key, setting_value, setting_type, description, category)
VALUES 
    ('numbering_padding', '3', 'number', 'จำนวนหลักเลขรัน', 'numbering')
ON CONFLICT (setting_key) DO NOTHING;

-- ตั้งค่าค่าเสื่อม
INSERT INTO settings (setting_key, setting_value, setting_type, description, category)
VALUES 
    ('depreciation_method', 'Straight-Line', 'string', 'วิธีคำนวณค่าเสื่อม', 'depreciation')
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO settings (setting_key, setting_value, setting_type, description, category)
VALUES 
    ('depreciation_scrap_value', '1', 'number', 'มูลค่าซากขั้นต่ำ (บาท)', 'depreciation')
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO settings (setting_key, setting_value, setting_type, description, category)
VALUES 
    ('depreciation_rounding', '2-decimal', 'string', 'การปัดเศษ', 'depreciation')
ON CONFLICT (setting_key) DO NOTHING;

-- Comments
COMMENT ON TABLE settings IS 'ตารางเก็บการตั้งค่าระบบ';
COMMENT ON COLUMN settings.setting_key IS 'คีย์ของการตั้งค่า (unique)';
COMMENT ON COLUMN settings.setting_value IS 'ค่าของการตั้งค่า (เก็บเป็น text)';
COMMENT ON COLUMN settings.setting_type IS 'ประเภทของค่า: string, number, boolean, json';
COMMENT ON COLUMN settings.description IS 'คำอธิบายการตั้งค่า';
COMMENT ON COLUMN settings.category IS 'หมวดหมู่: general, numbering, depreciation, system';

