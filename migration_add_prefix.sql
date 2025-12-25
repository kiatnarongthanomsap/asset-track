-- ================================================================================
-- Migration Script: Add prefix column to categories table
-- สำหรับอัพเดตตาราง categories ที่มีอยู่แล้ว
-- ================================================================================

-- เพิ่มคอลัมน์ prefix (ถ้ายังไม่มี)
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS prefix VARCHAR(10);

-- สร้าง unique constraint สำหรับ prefix (ถ้ายังไม่มี)
CREATE UNIQUE INDEX IF NOT EXISTS categories_prefix_unique ON categories(prefix) WHERE prefix IS NOT NULL;

-- อัพเดต prefix สำหรับหมวดหมู่ที่มีอยู่แล้ว
UPDATE categories SET prefix = 'A' WHERE name = 'คอมพิวเตอร์';
UPDATE categories SET prefix = 'B' WHERE name = 'Printer';
UPDATE categories SET prefix = 'C' WHERE name = 'กล้องถ่ายรูป';
UPDATE categories SET prefix = 'D' WHERE name = 'ตู้เก็บเอกสาร';
UPDATE categories SET prefix = 'E' WHERE name = 'โต๊ะ';
UPDATE categories SET prefix = 'F' WHERE name = 'เก้าอี้';
UPDATE categories SET prefix = 'G' WHERE name = 'แอร์';
UPDATE categories SET prefix = 'H' WHERE name = 'ปรับสมุด';
UPDATE categories SET prefix = 'I' WHERE name = 'โน๊ตบุค';
UPDATE categories SET prefix = 'J' WHERE name = 'สแกนลายนิ้วมือ';
UPDATE categories SET prefix = 'K' WHERE name = 'เครื่องพับ';
UPDATE categories SET prefix = 'L' WHERE name = 'รถเข็น';
UPDATE categories SET prefix = 'M' WHERE name = 'แท็ปเล็ต';
UPDATE categories SET prefix = 'N' WHERE name = 'เน็ตเวิร์ค';
UPDATE categories SET prefix = 'O' WHERE name = 'อื่นๆ';
UPDATE categories SET prefix = 'P' WHERE name = 'เครื่องเสียง';
UPDATE categories SET prefix = 'Q' WHERE name = 'ฉายภาพ';
UPDATE categories SET prefix = 'R' WHERE name = 'สแกน';
UPDATE categories SET prefix = 'S' WHERE name = 'S';
UPDATE categories SET prefix = 'T' WHERE name = 'แฟกซ์';
UPDATE categories SET prefix = 'U' WHERE name = 'เครื่องนับ';
UPDATE categories SET prefix = 'V' WHERE name = 'ตู้เย็น , ถังต้มน้ำไฟฟ้า';
UPDATE categories SET prefix = 'W' WHERE name = 'W';
UPDATE categories SET prefix = 'X' WHERE name = 'เครื่องฟอกอากาศ';

-- ตั้งค่า NOT NULL constraint (หลังจากอัพเดตข้อมูลแล้ว)
-- ALTER TABLE categories ALTER COLUMN prefix SET NOT NULL;

-- เพิ่ม comment
COMMENT ON COLUMN categories.prefix IS 'อักษรนำหน้ารหัสครุภัณฑ์ (เช่น A, B, C)';

-- ================================================================================
-- ตรวจสอบผลลัพธ์
-- ================================================================================
-- SELECT name, prefix FROM categories ORDER BY prefix;

