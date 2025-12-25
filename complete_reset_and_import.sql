-- ================================================================================
-- Complete Reset and Import Script
-- ลบข้อมูลทั้งหมดและ import ข้อมูลใหม่จาก Excel
-- ================================================================================
-- 
-- คำเตือน: สคริปต์นี้จะลบข้อมูลทั้งหมดในตาราง assets และ audit_logs
-- กรุณาตรวจสอบและสำรองข้อมูลก่อนรันสคริปต์นี้
-- ================================================================================
-- 
-- วิธีใช้งาน:
-- 1. รัน generate_inserts.py เพื่อสร้าง INSERT statements:
--    python3 generate_inserts.py insert_statements_supabase_new.sql
-- 
-- 2. คัดลอก INSERT statements จาก insert_statements_supabase_new.sql
--    มาใส่ในส่วน "PART 2: Import Data" ด้านล่าง
-- 
-- 3. รันสคริปต์นี้ทั้งหมดใน Supabase SQL Editor
-- ================================================================================

-- ================================================================================
-- PART 1: Reset Database (ลบข้อมูลทั้งหมด)
-- ================================================================================

-- ลบ audit logs ทั้งหมด
DELETE FROM audit_logs;

-- ลบข้อมูลทั้งหมดในตาราง assets
TRUNCATE TABLE assets RESTART IDENTITY CASCADE;

-- รีเซ็ต sequence ให้เริ่มที่ 1
-- ALTER SEQUENCE assets_id_seq RESTART WITH 1;

-- ================================================================================
-- PART 2: Import Data (นำเข้าข้อมูลใหม่)
-- ================================================================================
-- 
-- คัดลอก INSERT statements จาก insert_statements_supabase_new.sql มาใส่ที่นี่
-- หรือใช้คำสั่ง \i ใน psql:
-- \i insert_statements_supabase_new.sql
-- 
-- ตัวอย่าง:
-- 
-- INSERT INTO categories (name, prefix, icon_name, useful_life) VALUES 
-- ('คอมพิวเตอร์', 'A', 'Monitor', 5),
-- ('Printer', 'B', 'Printer', 5),
-- ...
-- ON CONFLICT (name) DO UPDATE SET
--     prefix = EXCLUDED.prefix,
--     icon_name = EXCLUDED.icon_name,
--     useful_life = EXCLUDED.useful_life;
-- 
-- INSERT INTO assets (code, name, brand, color, serial, price, location, status, purchase_date, category, useful_life, image, is_sticker_printed) VALUES
-- ('A004-09-04-2557', 'HP Pavilion', 'HP', 'ดำ', 'SN123', 25000.00, 'ห้องไอที', 'Normal', '2014-04-09', 'คอมพิวเตอร์', 5, NULL, false),
-- ...
-- ON CONFLICT (code) DO UPDATE SET
--     name = EXCLUDED.name,
--     brand = EXCLUDED.brand,
--     color = EXCLUDED.color,
--     serial = EXCLUDED.serial,
--     price = EXCLUDED.price,
--     location = EXCLUDED.location,
--     status = EXCLUDED.status,
--     purchase_date = EXCLUDED.purchase_date,
--     category = EXCLUDED.category,
--     useful_life = EXCLUDED.useful_life,
--     image = EXCLUDED.image,
--     is_sticker_printed = EXCLUDED.is_sticker_printed;
-- 
-- ================================================================================

-- ================================================================================
-- PART 3: อัพเดตวันที่ซื้อจากรหัส (สำหรับรายการที่ยังไม่มีวันที่)
-- ================================================================================

-- ใช้ function extract_date_from_code (ต้องรัน migration_update_purchase_date_from_code.sql ก่อน)
-- UPDATE assets
-- SET purchase_date = extract_date_from_code(code)
-- WHERE purchase_date IS NULL
-- AND code IS NOT NULL
-- AND code != ''
-- AND extract_date_from_code(code) IS NOT NULL;

-- ================================================================================
-- PART 4: ตรวจสอบผลลัพธ์
-- ================================================================================

-- ดูจำนวนรายการที่ import
-- SELECT 
--     COUNT(*) as total_assets,
--     COUNT(purchase_date) as assets_with_date,
--     COUNT(*) - COUNT(purchase_date) as assets_without_date
-- FROM assets;

-- ดูหมวดหมู่ทั้งหมด
-- SELECT id, name, prefix, icon_name, useful_life 
-- FROM categories 
-- ORDER BY prefix;

-- ================================================================================
-- END OF SCRIPT
-- ================================================================================

