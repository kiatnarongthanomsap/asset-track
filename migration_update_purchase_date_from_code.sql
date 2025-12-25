-- ================================================================================
-- Migration Script: อัพเดตวันที่ซื้อจากรหัสทรัพย์สิน
-- สำหรับรหัสที่มีรูปแบบ: {PREFIX}{RUNNING}-{DAY}-{MONTH}-{YEAR}
-- เช่น A004-09-04-2557 -> วันที่ซื้อ = 09/04/2557 (แปลงเป็น 2014-04-09)
-- ================================================================================
-- 
-- สคริปต์นี้จะ:
-- 1. ดึงวันที่จากรหัสทรัพย์สิน (ถ้ามีรูปแบบวันที่)
-- 2. แปลงจาก พ.ศ. เป็น ค.ศ. (ลบ 543)
-- 3. อัพเดต purchase_date ในตาราง assets
-- ================================================================================

-- ================================================================================
-- Function: แปลงวันที่จากรหัสทรัพย์สิน
-- ================================================================================

-- สร้าง function เพื่อดึงวันที่จากรหัส
CREATE OR REPLACE FUNCTION extract_date_from_code(asset_code VARCHAR)
RETURNS DATE AS $$
DECLARE
    date_part VARCHAR;
    day_part VARCHAR;
    month_part VARCHAR;
    year_part VARCHAR;
    year_int INTEGER;
    month_int INTEGER;
    day_int INTEGER;
    result_date DATE;
BEGIN
    -- ตรวจสอบว่ารหัสมีรูปแบบวันที่หรือไม่ (มี - อย่างน้อย 3 ตัว)
    IF asset_code IS NULL OR asset_code = '' THEN
        RETURN NULL;
    END IF;
    
    -- แยกส่วนหลัง - ออกมา (เช่น A004-09-04-2557 -> 09-04-2557)
    -- หาตำแหน่ง - แรก (prefix-running)
    -- แล้วแยกส่วนที่เหลือ (day-month-year)
    date_part := SUBSTRING(asset_code FROM '^[^-]+-[^-]+-(.+)$');
    
    -- ถ้าไม่พบรูปแบบ ให้ลองหาว่าเป็นรูปแบบ DD-MM-YYYY หรือไม่
    IF date_part IS NULL OR date_part = '' THEN
        -- ลองหารูปแบบ DD-MM-YYYY หรือ D-M-YYYY
        date_part := SUBSTRING(asset_code FROM '(\d{1,2}-\d{1,2}-\d{4})$');
    END IF;
    
    IF date_part IS NULL OR date_part = '' THEN
        RETURN NULL;
    END IF;
    
    -- แยก day, month, year
    day_part := SPLIT_PART(date_part, '-', 1);
    month_part := SPLIT_PART(date_part, '-', 2);
    year_part := SPLIT_PART(date_part, '-', 3);
    
    -- แปลงเป็นตัวเลข
    BEGIN
        day_int := CAST(day_part AS INTEGER);
        month_int := CAST(month_part AS INTEGER);
        year_int := CAST(year_part AS INTEGER);
        
        -- ตรวจสอบว่าเป็น พ.ศ. หรือ ค.ศ. (ถ้า > 2500 แสดงว่าเป็น พ.ศ.)
        IF year_int > 2500 THEN
            year_int := year_int - 543; -- แปลง พ.ศ. เป็น ค.ศ.
        END IF;
        
        -- ตรวจสอบความถูกต้องของวันที่
        IF year_int < 1900 OR year_int > 2100 THEN
            RETURN NULL;
        END IF;
        
        IF month_int < 1 OR month_int > 12 THEN
            RETURN NULL;
        END IF;
        
        IF day_int < 1 OR day_int > 31 THEN
            RETURN NULL;
        END IF;
        
        -- สร้าง DATE
        result_date := MAKE_DATE(year_int, month_int, day_int);
        
        -- ตรวจสอบว่าเป็นวันที่ที่ถูกต้องหรือไม่ (เช่น 31 ก.พ. จะไม่ถูกต้อง)
        IF EXTRACT(YEAR FROM result_date) = year_int AND 
           EXTRACT(MONTH FROM result_date) = month_int AND 
           EXTRACT(DAY FROM result_date) = day_int THEN
            RETURN result_date;
        ELSE
            RETURN NULL;
        END IF;
        
    EXCEPTION
        WHEN OTHERS THEN
            RETURN NULL;
    END;
    
END;
$$ LANGUAGE plpgsql;

-- ================================================================================
-- อัพเดต purchase_date จากรหัสทรัพย์สิน
-- ================================================================================

-- อัพเดตเฉพาะรายการที่ยังไม่มี purchase_date หรือ purchase_date เป็น NULL
UPDATE assets
SET purchase_date = extract_date_from_code(code)
WHERE purchase_date IS NULL
AND code IS NOT NULL
AND code != ''
AND extract_date_from_code(code) IS NOT NULL;

-- อัพเดตทุกรายการ (overwrite) - Uncomment ถ้าต้องการอัพเดตทุกรายการ
-- UPDATE assets
-- SET purchase_date = extract_date_from_code(code)
-- WHERE code IS NOT NULL
-- AND code != ''
-- AND extract_date_from_code(code) IS NOT NULL;

-- ================================================================================
-- เพิ่ม comment
-- ================================================================================

COMMENT ON FUNCTION extract_date_from_code IS 'Function สำหรับดึงวันที่ซื้อจากรหัสทรัพย์สิน (รูปแบบ: PREFIX-DD-MM-YYYY)';

-- ================================================================================
-- ตรวจสอบผลลัพธ์ (Optional - Uncomment to run)
-- ================================================================================
-- 
-- ดูรายการที่อัพเดตแล้ว
-- SELECT 
--     code,
--     name,
--     purchase_date,
--     extract_date_from_code(code) as extracted_date
-- FROM assets
-- WHERE code IS NOT NULL
-- ORDER BY purchase_date DESC
-- LIMIT 20;
-- 
-- ดูรายการที่ยังไม่มี purchase_date
-- SELECT 
--     code,
--     name,
--     purchase_date,
--     extract_date_from_code(code) as extracted_date
-- FROM assets
-- WHERE purchase_date IS NULL
-- AND code IS NOT NULL
-- LIMIT 20;
-- 
-- สรุปจำนวนรายการที่อัพเดตได้
-- SELECT 
--     COUNT(*) as total_assets,
--     COUNT(purchase_date) as assets_with_date,
--     COUNT(*) - COUNT(purchase_date) as assets_without_date,
--     COUNT(CASE WHEN extract_date_from_code(code) IS NOT NULL THEN 1 END) as can_extract_from_code
-- FROM assets
-- WHERE code IS NOT NULL;

