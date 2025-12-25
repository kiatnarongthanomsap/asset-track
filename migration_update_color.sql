-- ================================================================================
-- Migration Script: อัพเดตค่า color จากรายละเอียด asset
-- สำหรับอัพเดตตาราง assets ที่มีอยู่แล้ว
-- ================================================================================
-- 
-- สคริปต์นี้จะอัพเดตค่า color จาก:
-- 1. brand field (ถ้า brand เป็นสี เช่น 'ดำ', 'ขาว', 'เทา')
-- 2. name field (ถ้าสีอยู่ในชื่อทรัพย์สิน)
-- ================================================================================

-- ตรวจสอบว่ามีคอลัมน์ color หรือยัง
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS color VARCHAR(50);

-- ================================================================================
-- ขั้นตอนที่ 1: อัพเดต color จาก brand field (ถ้า brand เป็นสี)
-- กรณีที่ brand field มีค่าสีโดยตรง เช่น 'ดำ', 'ขาว', 'เทา', 'เงิน'
-- ================================================================================

UPDATE assets
SET color = brand
WHERE brand IN (
    'ดำ', 'ขาว', 'เทา', 'เงิน', 'ทอง', 'แดง', 'เขียว', 'ฟ้า', 
    'น้ำตาล', 'ม่วง', 'ส้ม', 'ชมพู', 'ฟ้าขาว', 'ดำ-ขาว',
    'ดำเทา', 'ขาวเทา', 'เงินเทา'
)
AND (color IS NULL OR color = '');

-- ================================================================================
-- ขั้นตอนที่ 2: ดึงสีออกมาจาก name field (กรณีที่ brand เป็นยี่ห้อจริง)
-- ใช้ regex เพื่อดึงคำว่าสีที่อยู่ท้ายชื่อหรือในชื่อ
-- ================================================================================

-- ดึงสีแบบผสมก่อน (เช่น 'ดำ-ขาว', 'ฟ้าขาว') เพื่อความแม่นยำ
UPDATE assets
SET color = CASE
    WHEN name ~ '.*ดำ-ขาว.*|.*ดำขาว.*' AND (color IS NULL OR color = '') THEN 'ดำ-ขาว'
    WHEN name ~ '.*ฟ้าขาว.*|.*ฟ้า-ขาว.*' AND (color IS NULL OR color = '') THEN 'ฟ้าขาว'
    WHEN name ~ '.*ดำเทา.*|.*ดำ-เทา.*' AND (color IS NULL OR color = '') THEN 'ดำเทา'
    WHEN name ~ '.*ขาวเทา.*|.*ขาว-เทา.*' AND (color IS NULL OR color = '') THEN 'ขาวเทา'
    WHEN name ~ '.*เงินเทา.*|.*เงิน-เทา.*' AND (color IS NULL OR color = '') THEN 'เงินเทา'
    ELSE color
END
WHERE (color IS NULL OR color = '')
AND name ~ '(ดำ-ขาว|ดำขาว|ฟ้าขาว|ฟ้า-ขาว|ดำเทา|ดำ-เทา|ขาวเทา|ขาว-เทา|เงินเทา|เงิน-เทา)';

-- ดึงสีเดี่ยวจากท้ายชื่อ (ตัวอย่าง: 'HP Pavilion ดำ', 'DELL Monitor ขาว')
UPDATE assets
SET color = CASE
    WHEN name ~ '.*ดำ[^-]*$' AND (color IS NULL OR color = '') THEN 'ดำ'
    WHEN name ~ '.*ขาว[^-]*$' AND (color IS NULL OR color = '') AND name !~ '.*ดำ.*' THEN 'ขาว'
    WHEN name ~ '.*เทา[^-]*$' AND (color IS NULL OR color = '') THEN 'เทา'
    WHEN name ~ '.*เงิน[^-]*$' AND (color IS NULL OR color = '') THEN 'เงิน'
    WHEN name ~ '.*ทอง[^-]*$' AND (color IS NULL OR color = '') THEN 'ทอง'
    WHEN name ~ '.*แดง[^-]*$' AND (color IS NULL OR color = '') THEN 'แดง'
    WHEN name ~ '.*เขียว[^-]*$' AND (color IS NULL OR color = '') THEN 'เขียว'
    WHEN name ~ '.*ฟ้า[^-]*$' AND (color IS NULL OR color = '') AND name !~ '.*ฟ้าขาว.*' THEN 'ฟ้า'
    WHEN name ~ '.*น้ำตาล[^-]*$' AND (color IS NULL OR color = '') THEN 'น้ำตาล'
    WHEN name ~ '.*ม่วง[^-]*$' AND (color IS NULL OR color = '') THEN 'ม่วง'
    WHEN name ~ '.*ส้ม[^-]*$' AND (color IS NULL OR color = '') THEN 'ส้ม'
    WHEN name ~ '.*ชมพู[^-]*$' AND (color IS NULL OR color = '') THEN 'ชมพู'
    ELSE color
END
WHERE (color IS NULL OR color = '')
AND name ~ '(ดำ|ขาว|เทา|เงิน|ทอง|แดง|เขียว|ฟ้า|น้ำตาล|ม่วง|ส้ม|ชมพู)';

-- ดึงสีจากส่วนกลางของชื่อ (กรณีที่สีอยู่กลางชื่อ เช่น 'HP Pavilion ดำ All-in-One')
-- ทำหลังจากขั้นตอนที่ 2 เพื่อให้ได้สีที่ถูกต้องกว่า
UPDATE assets
SET color = CASE
    WHEN name ~ '.*ดำ.*' AND (color IS NULL OR color = '') AND name !~ '.*ดำ-ขาว.*|.*ดำขาว.*' THEN 'ดำ'
    WHEN name ~ '.*ขาว.*' AND (color IS NULL OR color = '') AND name !~ '.*ดำ.*|.*ฟ้าขาว.*|.*ฟ้า-ขาว.*' THEN 'ขาว'
    WHEN name ~ '.*เทา.*' AND (color IS NULL OR color = '') AND name !~ '.*ดำเทา.*|.*ดำ-เทา.*|.*ขาวเทา.*|.*ขาว-เทา.*|.*เงินเทา.*|.*เงิน-เทา.*' THEN 'เทา'
    WHEN name ~ '.*เงิน.*' AND (color IS NULL OR color = '') AND name !~ '.*เงินเทา.*|.*เงิน-เทา.*' THEN 'เงิน'
    WHEN name ~ '.*ทอง.*' AND (color IS NULL OR color = '') THEN 'ทอง'
    WHEN name ~ '.*แดง.*' AND (color IS NULL OR color = '') THEN 'แดง'
    WHEN name ~ '.*เขียว.*' AND (color IS NULL OR color = '') THEN 'เขียว'
    WHEN name ~ '.*ฟ้า.*' AND (color IS NULL OR color = '') AND name !~ '.*ฟ้าขาว.*|.*ฟ้า-ขาว.*' THEN 'ฟ้า'
    WHEN name ~ '.*น้ำตาล.*' AND (color IS NULL OR color = '') THEN 'น้ำตาล'
    WHEN name ~ '.*ม่วง.*' AND (color IS NULL OR color = '') THEN 'ม่วง'
    WHEN name ~ '.*ส้ม.*' AND (color IS NULL OR color = '') THEN 'ส้ม'
    WHEN name ~ '.*ชมพู.*' AND (color IS NULL OR color = '') THEN 'ชมพู'
    ELSE color
END
WHERE (color IS NULL OR color = '')
AND (
    name ~ '(ดำ|ขาว|เทา|เงิน|ทอง|แดง|เขียว|ฟ้า|น้ำตาล|ม่วง|ส้ม|ชมพู)'
);

-- ================================================================================
-- เพิ่ม comment สำหรับ documentation
-- ================================================================================

COMMENT ON COLUMN assets.color IS 'สีของทรัพย์สิน (อัพเดตจาก brand หรือ name field)';

-- ================================================================================
-- ตรวจสอบผลลัพธ์ (Optional - Uncomment to run)
-- ================================================================================
-- 
-- ดูจำนวน asset ที่มี color แล้ว
-- SELECT 
--     COUNT(*) as total_assets,
--     COUNT(color) as assets_with_color,
--     COUNT(*) - COUNT(color) as assets_without_color
-- FROM assets;
-- 
-- ดูตัวอย่าง asset ที่อัพเดตแล้ว
-- SELECT code, name, brand, color 
-- FROM assets 
-- WHERE color IS NOT NULL 
-- LIMIT 20;
-- 
-- ดู asset ที่ยังไม่มี color (กรณีที่ต้องอัพเดตด้วยมือ)
-- SELECT code, name, brand, color 
-- FROM assets 
-- WHERE color IS NULL OR color = ''
-- LIMIT 20;

