-- ================================================================================
-- Complete Migration Script: เพิ่มฟิลด์ทั้งหมดที่ขาดไป
-- สำหรับอัพเดตตาราง assets ที่มีอยู่แล้วให้ครบถ้วน
-- ================================================================================
-- 
-- รันไฟล์นี้ใน Supabase SQL Editor เพื่อเพิ่มฟิลด์ทั้งหมด
-- ================================================================================

-- เพิ่มคอลัมน์ notes (ถ้ายังไม่มี)
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS notes TEXT;

-- เพิ่มคอลัมน์ custodian (ถ้ายังไม่มี)
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS custodian VARCHAR(200);

-- เพิ่มคอลัมน์ vendor (ถ้ายังไม่มี)
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS vendor VARCHAR(200);

-- เพิ่มคอลัมน์ warranty_expiry (ถ้ายังไม่มี)
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS warranty_expiry DATE;

-- เพิ่มคอลัมน์ color (ถ้ายังไม่มี)
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS color VARCHAR(50);

-- เพิ่ม comments สำหรับ documentation
COMMENT ON COLUMN assets.notes IS 'หมายเหตุเพิ่มเติม';
COMMENT ON COLUMN assets.custodian IS 'ผู้รับผิดชอบ / ผู้ใช้งาน';
COMMENT ON COLUMN assets.vendor IS 'ร้านค้า / ผู้จำหน่าย';
COMMENT ON COLUMN assets.warranty_expiry IS 'วันสิ้นสุดการรับประกัน';
COMMENT ON COLUMN assets.color IS 'สีของทรัพย์สิน';

-- ================================================================================
-- ตรวจสอบผลลัพธ์ - รันคำสั่งนี้เพื่อดูว่ามีคอลัมน์ครบหรือไม่
-- ================================================================================
-- SELECT 
--     column_name, 
--     data_type, 
--     is_nullable,
--     column_default
-- FROM information_schema.columns 
-- WHERE table_name = 'assets' 
-- ORDER BY ordinal_position;

-- ================================================================================
-- สรุปฟิลด์ทั้งหมดในตาราง assets
-- ================================================================================
-- 1. id (SERIAL PRIMARY KEY)
-- 2. code (VARCHAR(50) NOT NULL UNIQUE)
-- 3. name (VARCHAR(255) NOT NULL)
-- 4. brand (VARCHAR(100))
-- 5. serial (VARCHAR(100))
-- 6. price (NUMERIC(12, 2))
-- 7. location (VARCHAR(200))
-- 8. status (asset_status ENUM)
-- 9. purchase_date (DATE)
-- 10. category (VARCHAR(100))
-- 11. useful_life (INTEGER)
-- 12. image (TEXT)
-- 13. is_sticker_printed (BOOLEAN)
-- 14. notes (TEXT) ⭐ เพิ่มใหม่
-- 15. custodian (VARCHAR(200)) ⭐ เพิ่มใหม่
-- 16. vendor (VARCHAR(200)) ⭐ เพิ่มใหม่
-- 17. warranty_expiry (DATE) ⭐ เพิ่มใหม่
-- 18. created_at (TIMESTAMP)
-- 19. updated_at (TIMESTAMP)
-- ================================================================================

