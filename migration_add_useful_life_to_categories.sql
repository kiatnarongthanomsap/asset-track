-- ================================================================================
-- Migration Script: เพิ่มคอลัมน์ useful_life ในตาราง categories
-- และอัพเดตระยะเวลาคิดค่าเสื่อมตามหลักราชการ
-- ================================================================================
-- 
-- ระยะเวลาคิดค่าเสื่อมตามหลักราชการ:
-- - คอมพิวเตอร์/อุปกรณ์อิเล็กทรอนิกส์: 5 ปี
-- - เครื่องพิมพ์/เครื่องสแกน: 5 ปี
-- - เฟอร์นิเจอร์: 8 ปี
-- - ยานพาหนะ: 5 ปี
-- - เครื่องใช้ไฟฟ้า: 5 ปี
-- - อื่นๆ: 5 ปี (default)
-- ================================================================================

-- เพิ่มคอลัมน์ useful_life (ถ้ายังไม่มี)
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS useful_life INTEGER DEFAULT 5;

-- ================================================================================
-- อัพเดต useful_life ตามหลักราชการ
-- ================================================================================

-- A - คอมพิวเตอร์: 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE (name = 'คอมพิวเตอร์' OR name ILIKE '%คอมพิวเตอร์%' OR name ILIKE '%computer%')
AND (useful_life IS NULL OR useful_life = 0);

-- B - Printer: 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE (name = 'Printer' OR name ILIKE '%printer%' OR name ILIKE '%เครื่องพิมพ์%')
AND (useful_life IS NULL OR useful_life = 0);

-- C - กล้องถ่ายรูป: 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE (name = 'กล้องถ่ายรูป' OR name ILIKE '%กล้อง%' OR name ILIKE '%camera%')
AND (useful_life IS NULL OR useful_life = 0);

-- D - ตู้เก็บเอกสาร: 8 ปี (เฟอร์นิเจอร์)
UPDATE categories 
SET useful_life = 8
WHERE (name = 'ตู้เก็บเอกสาร' OR name ILIKE '%ตู้เก็บเอกสาร%')
AND (useful_life IS NULL OR useful_life = 0);

-- E - โต๊ะ: 8 ปี (เฟอร์นิเจอร์)
UPDATE categories 
SET useful_life = 8
WHERE (name = 'โต๊ะ' OR name ILIKE '%โต๊ะ%' OR name ILIKE '%table%' OR name ILIKE '%desk%')
AND (useful_life IS NULL OR useful_life = 0);

-- F - เก้าอี้: 8 ปี (เฟอร์นิเจอร์)
UPDATE categories 
SET useful_life = 8
WHERE (name = 'เก้าอี้' OR name ILIKE '%เก้าอี้%' OR name ILIKE '%chair%')
AND (useful_life IS NULL OR useful_life = 0);

-- G - แอร์: 5 ปี (เครื่องใช้ไฟฟ้า)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'แอร์' OR name ILIKE '%แอร์%' OR name ILIKE '%air%')
AND (useful_life IS NULL OR useful_life = 0);

-- H - ปรับสมุด: 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE (name = 'ปรับสมุด' OR name ILIKE '%ปรับสมุด%')
AND (useful_life IS NULL OR useful_life = 0);

-- I - โน๊ตบุค: 5 ปี (คอมพิวเตอร์)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'โน๊ตบุค' OR name ILIKE '%โน๊ตบุค%' OR name ILIKE '%โน้ตบุ๊ค%' OR name ILIKE '%laptop%')
AND (useful_life IS NULL OR useful_life = 0);

-- J - สแกนลายนิ้วมือ: 5 ปี (อุปกรณ์อิเล็กทรอนิกส์)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'สแกนลายนิ้วมือ' OR name ILIKE '%สแกนลายนิ้วมือ%' OR name ILIKE '%fingerprint%')
AND (useful_life IS NULL OR useful_life = 0);

-- K - เครื่องพับ: 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE (name = 'เครื่องพับ' OR name ILIKE '%เครื่องพับ%')
AND (useful_life IS NULL OR useful_life = 0);

-- L - รถเข็น: 5 ปี (ยานพาหนะ/อุปกรณ์)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'รถเข็น' OR name ILIKE '%รถเข็น%' OR name ILIKE '%รถ%' OR name ILIKE '%car%' OR name ILIKE '%vehicle%')
AND (useful_life IS NULL OR useful_life = 0);

-- M - แท็ปเล็ต: 5 ปี (คอมพิวเตอร์)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'แท็ปเล็ต' OR name ILIKE '%แท็ปเล็ต%' OR name ILIKE '%tablet%')
AND (useful_life IS NULL OR useful_life = 0);

-- N - เน็ตเวิร์ค: 5 ปี (อุปกรณ์อิเล็กทรอนิกส์)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'เน็ตเวิร์ค' OR name ILIKE '%เน็ตเวิร์ค%' OR name ILIKE '%network%' OR name ILIKE '%router%')
AND (useful_life IS NULL OR useful_life = 0);

-- O - อื่นๆ: 5 ปี (default)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'อื่นๆ' OR name ILIKE '%อื่นๆ%' OR name ILIKE '%อื่น%')
AND (useful_life IS NULL OR useful_life = 0);

-- P - เครื่องเสียง: 5 ปี (เครื่องใช้ไฟฟ้า)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'เครื่องเสียง' OR name ILIKE '%เครื่องเสียง%' OR name ILIKE '%speaker%' OR name ILIKE '%ลำโพง%')
AND (useful_life IS NULL OR useful_life = 0);

-- Q - ฉายภาพ: 5 ปี (อุปกรณ์อิเล็กทรอนิกส์)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'ฉายภาพ' OR name ILIKE '%ฉายภาพ%' OR name ILIKE '%projector%')
AND (useful_life IS NULL OR useful_life = 0);

-- R - สแกน: 5 ปี (อุปกรณ์อิเล็กทรอนิกส์)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'สแกน' OR (name ILIKE '%สแกน%' AND name NOT ILIKE '%ลายนิ้ว%'))
AND (useful_life IS NULL OR useful_life = 0);

-- S - (ไม่มีชื่อชัดเจน): 5 ปี (default)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'S' OR (prefix = 'S' AND (name IS NULL OR name = '')))
AND (useful_life IS NULL OR useful_life = 0);

-- T - แฟกซ์: 5 ปี (เครื่องพิมพ์)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'แฟกซ์' OR name ILIKE '%แฟกซ์%' OR name ILIKE '%fax%')
AND (useful_life IS NULL OR useful_life = 0);

-- U - เครื่องนับ: 5 ปี (อุปกรณ์อิเล็กทรอนิกส์)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'เครื่องนับ' OR name ILIKE '%เครื่องนับ%')
AND (useful_life IS NULL OR useful_life = 0);

-- V - ตู้เย็น , ถังต้มน้ำไฟฟ้า: 5 ปี (เครื่องใช้ไฟฟ้า)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'ตู้เย็น , ถังต้มน้ำไฟฟ้า' OR name ILIKE '%ตู้เย็น%' OR name ILIKE '%ถังต้มน้ำ%' OR name ILIKE '%refrigerator%')
AND (useful_life IS NULL OR useful_life = 0);

-- W - (ไม่มีชื่อชัดเจน): 5 ปี (default)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'W' OR (prefix = 'W' AND (name IS NULL OR name = '')))
AND (useful_life IS NULL OR useful_life = 0);

-- X - เครื่องฟอกอากาศ: 5 ปี (เครื่องใช้ไฟฟ้า)
UPDATE categories 
SET useful_life = 5
WHERE (name = 'เครื่องฟอกอากาศ' OR name ILIKE '%เครื่องฟอกอากาศ%')
AND (useful_life IS NULL OR useful_life = 0);

-- ================================================================================
-- อัพเดตตาม prefix (กรณีที่ชื่อไม่ตรงกับข้างบน)
-- ================================================================================

-- อัพเดตตาม prefix A (คอมพิวเตอร์): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'A' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix B (Printer): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'B' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix C (กล้อง): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'C' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix D (ตู้เก็บเอกสาร): 8 ปี
UPDATE categories 
SET useful_life = 8
WHERE prefix = 'D' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix E (โต๊ะ): 8 ปี
UPDATE categories 
SET useful_life = 8
WHERE prefix = 'E' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix F (เก้าอี้): 8 ปี
UPDATE categories 
SET useful_life = 8
WHERE prefix = 'F' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix G (แอร์): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'G' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix H (ปรับสมุด): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'H' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix I (โน๊ตบุค): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'I' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix J (สแกนลายนิ้วมือ): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'J' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix K (เครื่องพับ): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'K' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix L (รถเข็น): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'L' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix M (แท็ปเล็ต): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'M' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix N (เน็ตเวิร์ค): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'N' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix O (อื่นๆ): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'O' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix P (เครื่องเสียง): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'P' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix Q (ฉายภาพ): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'Q' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix R (สแกน): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'R' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix S: 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'S' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix T (แฟกซ์): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'T' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix U (เครื่องนับ): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'U' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix V (ตู้เย็น): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'V' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix W: 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'W' AND (useful_life IS NULL OR useful_life = 0);

-- อัพเดตตาม prefix X (เครื่องฟอกอากาศ): 5 ปี
UPDATE categories 
SET useful_life = 5
WHERE prefix = 'X' AND (useful_life IS NULL OR useful_life = 0);

-- ตั้งค่า default สำหรับหมวดหมู่ที่ยังไม่มี useful_life
UPDATE categories 
SET useful_life = 5
WHERE (useful_life IS NULL OR useful_life = 0);

-- ================================================================================
-- เพิ่ม comment
-- ================================================================================

COMMENT ON COLUMN categories.useful_life IS 'ระยะเวลาคิดค่าเสื่อมตามหลักราชการ (หน่วย: ปี) - คอมพิวเตอร์/อุปกรณ์อิเล็กทรอนิกส์: 5 ปี, เฟอร์นิเจอร์: 8 ปี';

-- ================================================================================
-- ตรวจสอบผลลัพธ์ (Optional - Uncomment to run)
-- ================================================================================
-- 
-- ดูหมวดหมู่ทั้งหมดพร้อม useful_life
-- SELECT id, name, prefix, useful_life, icon_name 
-- FROM categories 
-- ORDER BY prefix, name;
-- 
-- ดูสรุป useful_life ตามหมวดหมู่
-- SELECT useful_life, COUNT(*) as count
-- FROM categories
-- GROUP BY useful_life
-- ORDER BY useful_life;

