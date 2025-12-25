-- ================================================================================
-- Migration Script: อัพเดตค่า icon_name สำหรับหมวดหมู่ทั้งหมด
-- อัพเดตตามชื่อหมวดหมู่ที่มีในระบบ
-- ================================================================================
-- 
-- สคริปต์นี้จะอัพเดตค่า icon_name ให้ตรงกับชื่อหมวดหมู่ที่แท้จริง
-- ใช้ชื่อ icon จาก lucide-react
-- ================================================================================

-- ตรวจสอบว่ามีคอลัมน์ icon_name หรือยัง
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS icon_name VARCHAR(50);

-- ================================================================================
-- อัพเดต icon_name ตามชื่อหมวดหมู่ที่แน่นอน
-- ================================================================================

-- A - คอมพิวเตอร์
UPDATE categories 
SET icon_name = 'Monitor' 
WHERE name = 'คอมพิวเตอร์' OR name ILIKE '%คอมพิวเตอร์%'
AND (icon_name IS NULL OR icon_name = '');

-- B - Printer
UPDATE categories 
SET icon_name = 'Printer' 
WHERE name = 'Printer' OR name ILIKE '%printer%' OR name ILIKE '%เครื่องพิมพ์%'
AND (icon_name IS NULL OR icon_name = '');

-- C - กล้องถ่ายรูป
UPDATE categories 
SET icon_name = 'Camera' 
WHERE name = 'กล้องถ่ายรูป' OR name ILIKE '%กล้อง%'
AND (icon_name IS NULL OR icon_name = '');

-- D - ตู้เก็บเอกสาร
UPDATE categories 
SET icon_name = 'Archive' 
WHERE name = 'ตู้เก็บเอกสาร' OR name ILIKE '%ตู้เก็บเอกสาร%'
AND (icon_name IS NULL OR icon_name = '');

-- E - โต๊ะ
UPDATE categories 
SET icon_name = 'FileText' 
WHERE name = 'โต๊ะ' OR name ILIKE '%โต๊ะ%'
AND (icon_name IS NULL OR icon_name = '');

-- F - เก้าอี้
UPDATE categories 
SET icon_name = 'Sofa' 
WHERE name = 'เก้าอี้' OR name ILIKE '%เก้าอี้%'
AND (icon_name IS NULL OR icon_name = '');

-- G - แอร์
UPDATE categories 
SET icon_name = 'AirVent' 
WHERE name = 'แอร์' OR name ILIKE '%แอร์%'
AND (icon_name IS NULL OR icon_name = '');

-- H - ปรับสมุด
UPDATE categories 
SET icon_name = 'Book' 
WHERE name = 'ปรับสมุด' OR name ILIKE '%ปรับสมุด%'
AND (icon_name IS NULL OR icon_name = '');

-- I - โน๊ตบุค
UPDATE categories 
SET icon_name = 'Laptop' 
WHERE name = 'โน๊ตบุค' OR name ILIKE '%โน๊ตบุค%' OR name ILIKE '%โน้ตบุ๊ค%' OR name ILIKE '%laptop%'
AND (icon_name IS NULL OR icon_name = '');

-- J - สแกนลายนิ้วมือ
UPDATE categories 
SET icon_name = 'Database' 
WHERE name = 'สแกนลายนิ้วมือ' OR name ILIKE '%สแกนลายนิ้วมือ%' OR name ILIKE '%fingerprint%'
AND (icon_name IS NULL OR icon_name = '');

-- K - เครื่องพับ
UPDATE categories 
SET icon_name = 'Folder' 
WHERE name = 'เครื่องพับ' OR name ILIKE '%เครื่องพับ%'
AND (icon_name IS NULL OR icon_name = '');

-- L - รถเข็น
UPDATE categories 
SET icon_name = 'Car' 
WHERE name = 'รถเข็น' OR name ILIKE '%รถเข็น%'
AND (icon_name IS NULL OR icon_name = '');

-- M - แท็ปเล็ต
UPDATE categories 
SET icon_name = 'Tablet' 
WHERE name = 'แท็ปเล็ต' OR name ILIKE '%แท็ปเล็ต%' OR name ILIKE '%tablet%'
AND (icon_name IS NULL OR icon_name = '');

-- N - เน็ตเวิร์ค
UPDATE categories 
SET icon_name = 'Wifi' 
WHERE name = 'เน็ตเวิร์ค' OR name ILIKE '%เน็ตเวิร์ค%' OR name ILIKE '%network%' OR name ILIKE '%router%'
AND (icon_name IS NULL OR icon_name = '');

-- O - อื่นๆ
UPDATE categories 
SET icon_name = 'Package' 
WHERE name = 'อื่นๆ' OR name ILIKE '%อื่นๆ%' OR name ILIKE '%อื่น%'
AND (icon_name IS NULL OR icon_name = '');

-- P - เครื่องเสียง
UPDATE categories 
SET icon_name = 'Speaker' 
WHERE name = 'เครื่องเสียง' OR name ILIKE '%เครื่องเสียง%' OR name ILIKE '%speaker%' OR name ILIKE '%ลำโพง%'
AND (icon_name IS NULL OR icon_name = '');

-- Q - ฉายภาพ
UPDATE categories 
SET icon_name = 'Video' 
WHERE name = 'ฉายภาพ' OR name ILIKE '%ฉายภาพ%' OR name ILIKE '%projector%'
AND (icon_name IS NULL OR icon_name = '');

-- R - สแกน
UPDATE categories 
SET icon_name = 'FileText' 
WHERE name = 'สแกน' OR (name ILIKE '%สแกน%' AND name NOT ILIKE '%ลายนิ้ว%')
AND (icon_name IS NULL OR icon_name = '');

-- S - (ไม่มีชื่อชัดเจน)
UPDATE categories 
SET icon_name = 'Package' 
WHERE name = 'S' OR (prefix = 'S' AND (name IS NULL OR name = ''))
AND (icon_name IS NULL OR icon_name = '');

-- T - แฟกซ์
UPDATE categories 
SET icon_name = 'Printer' 
WHERE name = 'แฟกซ์' OR name ILIKE '%แฟกซ์%' OR name ILIKE '%fax%'
AND (icon_name IS NULL OR icon_name = '');

-- U - เครื่องนับ
UPDATE categories 
SET icon_name = 'Calculator' 
WHERE name = 'เครื่องนับ' OR name ILIKE '%เครื่องนับ%'
AND (icon_name IS NULL OR icon_name = '');

-- V - ตู้เย็น , ถังต้มน้ำไฟฟ้า
UPDATE categories 
SET icon_name = 'Thermometer' 
WHERE name = 'ตู้เย็น , ถังต้มน้ำไฟฟ้า' OR name ILIKE '%ตู้เย็น%' OR name ILIKE '%ถังต้มน้ำ%' OR name ILIKE '%refrigerator%'
AND (icon_name IS NULL OR icon_name = '');

-- W - (ไม่มีชื่อชัดเจน)
UPDATE categories 
SET icon_name = 'Package' 
WHERE name = 'W' OR (prefix = 'W' AND (name IS NULL OR name = ''))
AND (icon_name IS NULL OR icon_name = '');

-- X - เครื่องฟอกอากาศ
UPDATE categories 
SET icon_name = 'AirVent' 
WHERE name = 'เครื่องฟอกอากาศ' OR name ILIKE '%เครื่องฟอกอากาศ%'
AND (icon_name IS NULL OR icon_name = '');

-- ================================================================================
-- อัพเดตตาม prefix (กรณีที่ชื่อไม่ตรงกับข้างบน)
-- ================================================================================

-- อัพเดตตาม prefix A
UPDATE categories 
SET icon_name = 'Monitor' 
WHERE prefix = 'A' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix B
UPDATE categories 
SET icon_name = 'Printer' 
WHERE prefix = 'B' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix C
UPDATE categories 
SET icon_name = 'Camera' 
WHERE prefix = 'C' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix D
UPDATE categories 
SET icon_name = 'Archive' 
WHERE prefix = 'D' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix E
UPDATE categories 
SET icon_name = 'FileText' 
WHERE prefix = 'E' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix F
UPDATE categories 
SET icon_name = 'Sofa' 
WHERE prefix = 'F' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix G
UPDATE categories 
SET icon_name = 'AirVent' 
WHERE prefix = 'G' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix H
UPDATE categories 
SET icon_name = 'Book' 
WHERE prefix = 'H' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix I
UPDATE categories 
SET icon_name = 'Laptop' 
WHERE prefix = 'I' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix J
UPDATE categories 
SET icon_name = 'Database' 
WHERE prefix = 'J' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix K
UPDATE categories 
SET icon_name = 'Folder' 
WHERE prefix = 'K' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix L
UPDATE categories 
SET icon_name = 'Car' 
WHERE prefix = 'L' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix M
UPDATE categories 
SET icon_name = 'Tablet' 
WHERE prefix = 'M' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix N
UPDATE categories 
SET icon_name = 'Wifi' 
WHERE prefix = 'N' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix O
UPDATE categories 
SET icon_name = 'Package' 
WHERE prefix = 'O' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix P
UPDATE categories 
SET icon_name = 'Speaker' 
WHERE prefix = 'P' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix Q
UPDATE categories 
SET icon_name = 'Video' 
WHERE prefix = 'Q' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix R
UPDATE categories 
SET icon_name = 'FileText' 
WHERE prefix = 'R' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix S
UPDATE categories 
SET icon_name = 'Package' 
WHERE prefix = 'S' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix T
UPDATE categories 
SET icon_name = 'Printer' 
WHERE prefix = 'T' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix U
UPDATE categories 
SET icon_name = 'Calculator' 
WHERE prefix = 'U' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix V
UPDATE categories 
SET icon_name = 'Thermometer' 
WHERE prefix = 'V' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix W
UPDATE categories 
SET icon_name = 'Package' 
WHERE prefix = 'W' AND (icon_name IS NULL OR icon_name = '');

-- อัพเดตตาม prefix X
UPDATE categories 
SET icon_name = 'AirVent' 
WHERE prefix = 'X' AND (icon_name IS NULL OR icon_name = '');

-- ตั้งค่า default icon สำหรับหมวดหมู่ที่ยังไม่มี icon
UPDATE categories 
SET icon_name = 'Package' 
WHERE (icon_name IS NULL OR icon_name = '');

-- ================================================================================
-- เพิ่ม comment
-- ================================================================================

COMMENT ON COLUMN categories.icon_name IS 'ชื่อ icon component จาก lucide-react สำหรับแสดงกรณีที่ไม่มีรูปภาพ (เช่น Monitor, Printer, Package)';

-- ================================================================================
-- ตรวจสอบผลลัพธ์ (Optional - Uncomment to run)
-- ================================================================================
-- 
-- ดูหมวดหมู่ทั้งหมดพร้อม icon
-- SELECT id, name, prefix, icon_name 
-- FROM categories 
-- ORDER BY prefix, name;
-- 
-- ดูหมวดหมู่ที่ยังไม่มี icon
-- SELECT id, name, prefix, icon_name 
-- FROM categories 
-- WHERE icon_name IS NULL OR icon_name = ''
-- ORDER BY name;
-- 
-- ดูสรุป icon ที่ใช้
-- SELECT icon_name, COUNT(*) as count
-- FROM categories
-- GROUP BY icon_name
-- ORDER BY count DESC, icon_name;

