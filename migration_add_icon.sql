-- ================================================================================
-- Migration Script: เพิ่มคอลัมน์ icon_name สำหรับเก็บชื่อ icon component
-- สำหรับอัพเดตตาราง categories ที่มีอยู่แล้ว
-- ================================================================================
-- 
-- คอลัมน์ icon_name จะเก็บชื่อ icon component จาก lucide-react
-- เช่น 'Monitor', 'Printer', 'Package', 'Laptop' เป็นต้น
-- ================================================================================

-- เพิ่มคอลัมน์ icon_name (ถ้ายังไม่มี)
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS icon_name VARCHAR(50);

-- อัพเดต icon_name สำหรับหมวดหมู่ที่มีอยู่แล้ว
-- ใช้ชื่อ icon จาก lucide-react ที่ตรงกับหมวดหมู่

-- คอมพิวเตอร์
UPDATE categories SET icon_name = 'Monitor' 
WHERE (name ILIKE '%คอมพิวเตอร์%' OR name ILIKE '%computer%' OR name ILIKE '%pc%')
AND (icon_name IS NULL OR icon_name = '');

-- โน้ตบุ๊ค
UPDATE categories SET icon_name = 'Laptop' 
WHERE (name ILIKE '%โน๊ตบุค%' OR name ILIKE '%laptop%' OR name ILIKE '%โน้ตบุ๊ค%')
AND (icon_name IS NULL OR icon_name = '');

-- แท็บเล็ต
UPDATE categories SET icon_name = 'Tablet' 
WHERE (name ILIKE '%แท็ปเล็ต%' OR name ILIKE '%tablet%')
AND (icon_name IS NULL OR icon_name = '');

-- เครื่องพิมพ์
UPDATE categories SET icon_name = 'Printer' 
WHERE (name ILIKE '%เครื่องพิมพ์%' OR name ILIKE '%printer%')
AND (icon_name IS NULL OR icon_name = '');

-- กล้อง
UPDATE categories SET icon_name = 'Camera' 
WHERE (name ILIKE '%กล้อง%' OR name ILIKE '%camera%')
AND (icon_name IS NULL OR icon_name = '');

-- ตู้เก็บเอกสาร
UPDATE categories SET icon_name = 'Archive' 
WHERE (name ILIKE '%ตู้เก็บเอกสาร%' OR name ILIKE '%ตู้%')
AND (icon_name IS NULL OR icon_name = '');

-- โต๊ะ
UPDATE categories SET icon_name = 'FileText' 
WHERE (name ILIKE '%โต๊ะ%' OR name ILIKE '%table%' OR name ILIKE '%desk%')
AND (icon_name IS NULL OR icon_name = '');

-- เก้าอี้
UPDATE categories SET icon_name = 'Sofa' 
WHERE (name ILIKE '%เก้าอี้%' OR name ILIKE '%chair%')
AND (icon_name IS NULL OR icon_name = '');

-- แอร์ / เครื่องฟอกอากาศ
UPDATE categories SET icon_name = 'AirVent' 
WHERE (name ILIKE '%แอร์%' OR name ILIKE '%เครื่องฟอกอากาศ%' OR name ILIKE '%air%')
AND (icon_name IS NULL OR icon_name = '');

-- ปรับสมุด
UPDATE categories SET icon_name = 'Book' 
WHERE (name ILIKE '%ปรับสมุด%')
AND (icon_name IS NULL OR icon_name = '');

-- สแกนลายนิ้วมือ
UPDATE categories SET icon_name = 'Database' 
WHERE (name ILIKE '%สแกนลายนิ้วมือ%' OR name ILIKE '%fingerprint%')
AND (icon_name IS NULL OR icon_name = '');

-- เครื่องพับ
UPDATE categories SET icon_name = 'Folder' 
WHERE (name ILIKE '%เครื่องพับ%')
AND (icon_name IS NULL OR icon_name = '');

-- รถเข็น
UPDATE categories SET icon_name = 'Car' 
WHERE (name ILIKE '%รถเข็น%' OR name ILIKE '%รถ%' OR name ILIKE '%car%')
AND (icon_name IS NULL OR icon_name = '');

-- เน็ตเวิร์ค
UPDATE categories SET icon_name = 'Wifi' 
WHERE (name ILIKE '%เน็ตเวิร์ค%' OR name ILIKE '%network%' OR name ILIKE '%router%')
AND (icon_name IS NULL OR icon_name = '');

-- เครื่องเสียง
UPDATE categories SET icon_name = 'Speaker' 
WHERE (name ILIKE '%เครื่องเสียง%' OR name ILIKE '%speaker%' OR name ILIKE '%ลำโพง%')
AND (icon_name IS NULL OR icon_name = '');

-- ฉายภาพ
UPDATE categories SET icon_name = 'Video' 
WHERE (name ILIKE '%ฉายภาพ%' OR name ILIKE '%projector%')
AND (icon_name IS NULL OR icon_name = '');

-- สแกน
UPDATE categories SET icon_name = 'FileText' 
WHERE (name ILIKE '%สแกน%' AND name NOT ILIKE '%ลายนิ้ว%')
AND (icon_name IS NULL OR icon_name = '');

-- แฟกซ์
UPDATE categories SET icon_name = 'Printer' 
WHERE (name ILIKE '%แฟกซ์%' OR name ILIKE '%fax%')
AND (icon_name IS NULL OR icon_name = '');

-- เครื่องนับ
UPDATE categories SET icon_name = 'Calculator' 
WHERE (name ILIKE '%เครื่องนับ%')
AND (icon_name IS NULL OR icon_name = '');

-- ตู้เย็น / ถังต้มน้ำ
UPDATE categories SET icon_name = 'Thermometer' 
WHERE (name ILIKE '%ตู้เย็น%' OR name ILIKE '%ถังต้มน้ำ%' OR name ILIKE '%refrigerator%' OR name ILIKE '%water%')
AND (icon_name IS NULL OR icon_name = '');

-- ตั้งค่า default icon สำหรับหมวดหมู่ที่ยังไม่มี icon
UPDATE categories SET icon_name = 'Package' 
WHERE (icon_name IS NULL OR icon_name = '');

-- เพิ่ม comment
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

