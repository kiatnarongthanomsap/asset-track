-- ================================================================================
-- Fix: แก้ไขปัญหา prefix ซ้ำในตาราง categories
-- ================================================================================
-- 
-- ถ้ามี error: duplicate key value violates unique constraint "categories_prefix_unique"
-- ให้รันสคริปต์นี้ก่อน INSERT ข้อมูลใหม่
-- ================================================================================

-- ตรวจสอบ prefix ที่ซ้ำ
SELECT prefix, COUNT(*) as count, array_agg(name) as category_names
FROM categories
GROUP BY prefix
HAVING COUNT(*) > 1;

-- แก้ไข prefix ที่ซ้ำโดยเพิ่มตัวเลขต่อท้าย
-- (ปรับตามความเหมาะสม)
UPDATE categories
SET prefix = prefix || '1'
WHERE id IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY prefix ORDER BY id) as rn
        FROM categories
    ) t
    WHERE rn > 1
);

-- หรือลบหมวดหมู่ที่ซ้ำ (ถ้าต้องการ)
-- DELETE FROM categories
-- WHERE id IN (
--     SELECT id FROM (
--         SELECT id, ROW_NUMBER() OVER (PARTITION BY prefix ORDER BY id) as rn
--         FROM categories
--     ) t
--     WHERE rn > 1
-- );

