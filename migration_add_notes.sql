-- ================================================================================
-- Migration Script: Add notes, custodian, vendor, warranty_expiry columns
-- สำหรับอัพเดตตาราง assets ที่มีอยู่แล้ว
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

-- เพิ่ม comment
COMMENT ON COLUMN assets.notes IS 'หมายเหตุเพิ่มเติม';
COMMENT ON COLUMN assets.custodian IS 'ผู้รับผิดชอบ / ผู้ใช้งาน';
COMMENT ON COLUMN assets.vendor IS 'ร้านค้า / ผู้จำหน่าย';
COMMENT ON COLUMN assets.warranty_expiry IS 'วันสิ้นสุดการรับประกัน';
COMMENT ON COLUMN assets.color IS 'สีของทรัพย์สิน';

-- ================================================================================
-- ตรวจสอบผลลัพธ์
-- ================================================================================
-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'assets' 
-- AND column_name IN ('notes', 'custodian', 'vendor', 'warranty_expiry');

