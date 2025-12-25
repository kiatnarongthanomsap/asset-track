-- ================================================================================
-- SQL Script: Reset และ Import ข้อมูลจาก Excel
-- สร้างเมื่อ: 2025-12-25 13:00:21
-- ================================================================================

-- ================================================================================
-- PART 1: ลบข้อมูลเดิม
-- ================================================================================

-- ลบ audit logs ทั้งหมด
DELETE FROM audit_logs;

-- ลบข้อมูลทั้งหมดในตาราง assets
TRUNCATE TABLE assets RESTART IDENTITY CASCADE;

-- ลบหมวดหมู่ทั้งหมด (ถ้าต้องการเริ่มใหม่)
-- TRUNCATE TABLE categories RESTART IDENTITY CASCADE;

-- ================================================================================
-- PART 2: INSERT Categories
-- ================================================================================

-- หมวดหมู่: Printer (prefix: B)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('Printer', 'B', 5, 'Printer')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: กล้องถ่ายรูป (prefix: C)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('กล้องถ่ายรูป', 'C', 5, 'Camera')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: คอมพิวเตอร์ (prefix: A)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('คอมพิวเตอร์', 'A', 5, 'Monitor')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: ฉายภาพ (prefix: Q)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('ฉายภาพ', 'Q', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: ตู้เก็บเอกสาร (prefix: D)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('ตู้เก็บเอกสาร', 'D', 5, 'Archive')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: ตู้เย็น/ถังต้มน้ำไฟฟ้า (prefix: V)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('ตู้เย็น/ถังต้มน้ำไฟฟ้า', 'V', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: ปรับสมุด (prefix: H)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('ปรับสมุด', 'H', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: รถเข็น (prefix: L)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('รถเข็น', 'L', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: สแกน (prefix: R)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('สแกน', 'R', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: สแกนลายนิ้วมือ (prefix: J)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('สแกนลายนิ้วมือ', 'J', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: อื่นๆ (prefix: O)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('อื่นๆ', 'O', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: เก้าอี้ (prefix: F)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('เก้าอี้', 'F', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: เครื่องนับ (prefix: U)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('เครื่องนับ', 'U', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: เครื่องพับ (prefix: K)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('เครื่องพับ', 'K', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: เครื่องฟอกอากาศ (prefix: X)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('เครื่องฟอกอากาศ', 'X', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: เครื่องเสียง (prefix: P)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('เครื่องเสียง', 'P', 5, 'Speaker')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: เน็ตเวิร์ค (prefix: N)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('เน็ตเวิร์ค', 'N', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: แท็ปเล็ต (prefix: M)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('แท็ปเล็ต', 'M', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: แฟกซ์ (prefix: T)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('แฟกซ์', 'T', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: แอร์ (prefix: G)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('แอร์', 'G', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: โต๊ะ (prefix: E)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('โต๊ะ', 'E', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- หมวดหมู่: โน๊ตบุค (prefix: I)
INSERT INTO categories (name, prefix, useful_life, icon_name)
VALUES ('โน๊ตบุค', 'I', 5, 'Package')
ON CONFLICT (name) DO UPDATE SET
    useful_life = EXCLUDED.useful_life,
    icon_name = EXCLUDED.icon_name;

-- ================================================================================
-- PART 3: INSERT Assets
-- ================================================================================

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A004-09-04-2557',
    'HP ENVY TOUCH SMART 20-d106d',
    'HP',
    '5CM40301SS',
    26990.0,
    NULL,
    'Normal',
    '2014-04-09',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A010-09-04-2557',
    'HP ENVY TOUCH SMART 20-d106d',
    'HP',
    '5CM40301X1',
    26990.0,
    NULL,
    'Normal',
    '2014-04-09',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A018-03-03-2559',
    'DELL U2515H',
    'DELL',
    'CN-001N56-64180-5CG-00FL-A02',
    14500.0,
    NULL,
    'Normal',
    '2016-03-03',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A019-03-03-2559',
    'DELL U2515H',
    'DELL',
    'CN-001N56-64180-5CG-04KL-A02',
    14500.0,
    NULL,
    'Normal',
    '2016-03-03',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A020-31-03-2559',
    'ELO 2201L',
    'ELO',
    'G153000653',
    20000.0,
    NULL,
    'Normal',
    '2016-03-31',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A021-18-08-2559',
    'HP Pavilion All-in-One 23-q130d',
    'HP',
    '8CC60503DR',
    32410.0,
    NULL,
    'Normal',
    '2016-08-18',
    'คอมพิวเตอร์',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A022-18-08-2559',
    'HP Pavilion All-in-One 23-q130d',
    'HP',
    '8CC60507GH',
    32410.0,
    NULL,
    'Normal',
    '2016-08-18',
    'คอมพิวเตอร์',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A023-18-08-2559',
    'HP Pavilion All-in-One 23-q130d',
    'HP',
    '8CC60507PR',
    32410.0,
    NULL,
    'Normal',
    '2016-08-18',
    'คอมพิวเตอร์',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A024-18-08-2559',
    'HP Pavilion All-in-One 23-q130d',
    'HP',
    '8CC60503DG',
    32410.0,
    NULL,
    'Normal',
    '2016-08-18',
    'คอมพิวเตอร์',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A025-18-08-2559',
    'HP Pavilion All-in-One 23-q130d',
    'HP',
    '8CC60503DD',
    32410.0,
    NULL,
    'Normal',
    '2016-08-18',
    'คอมพิวเตอร์',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A026-18-08-2559',
    'HP Pavilion All-in-One 23-q130d',
    'HP',
    '8CC60503DM',
    32410.0,
    NULL,
    'Normal',
    '2016-08-18',
    'คอมพิวเตอร์',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A027-18-08-2559',
    'HP Pavilion All-in-One 23-q130d',
    'HP',
    '8CC60503DJ',
    32410.0,
    NULL,
    'Normal',
    '2016-08-18',
    'คอมพิวเตอร์',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A028-18-08-2559',
    'HP Pavilion All-in-One 23-q130d',
    'HP',
    '8CC60503DV',
    32410.0,
    NULL,
    'Normal',
    '2016-08-18',
    'คอมพิวเตอร์',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A029-18-08-2559',
    'HP Pavilion All-in-One 23-q130d',
    'HP',
    '8CC60503D4',
    32410.0,
    NULL,
    'Normal',
    '2016-08-18',
    'คอมพิวเตอร์',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A030-18-08-2559',
    'HP Pavilion All-in-One 23-q130d',
    'HP',
    '8CC60503FO',
    32410.0,
    NULL,
    'Normal',
    '2016-08-18',
    'คอมพิวเตอร์',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A031-26-12-2560',
    'DELL Inspiron One 3264 Touch Screen',
    'DELL',
    'C243ZH2',
    28900.0,
    NULL,
    'Normal',
    '2017-12-26',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A032-13-07-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    '9CFWL42',
    30281.0,
    NULL,
    'Normal',
    '2018-07-13',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A033-13-07-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    '4Q36902',
    30281.0,
    NULL,
    'Normal',
    '2018-07-13',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A034-13-07-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    '68X7L42',
    30281.0,
    NULL,
    'Normal',
    '2018-07-13',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A035-13-07-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    'CMFWL42',
    30281.0,
    NULL,
    'Normal',
    '2018-07-13',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A036-13-07-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    '79X7L42',
    30281.0,
    NULL,
    'Normal',
    '2018-07-13',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A037-13-07-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    'FKFWL42',
    30281.0,
    NULL,
    'Normal',
    '2018-07-13',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A038-08-08-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    '82JRL42',
    30281.0,
    NULL,
    'Normal',
    '2018-08-08',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A039-08-08-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    'F2JRL42',
    30281.0,
    NULL,
    'Normal',
    '2018-08-08',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A040-08-08-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    '7PFWL42',
    30281.0,
    NULL,
    'Normal',
    '2018-08-08',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A041-08-08-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    'C2JRL42',
    30281.0,
    NULL,
    'Normal',
    '2018-08-08',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A042-08-08-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    '5KFWL42',
    30281.0,
    NULL,
    'Normal',
    '2018-08-08',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A043-08-08-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    'DJ7WL42',
    30281.0,
    NULL,
    'Normal',
    '2018-08-08',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A044-06-09-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    '7936902',
    30281.0,
    NULL,
    'Normal',
    '2018-09-06',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A045-06-09-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    '6HFWL42',
    30281.0,
    NULL,
    'Normal',
    '2018-09-06',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A046-06-09-2561',
    'DELL Inspiron One 24 3477',
    'DELL',
    'D8X7L42',
    30281.0,
    NULL,
    'Normal',
    '2018-09-06',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A047-12-09-2561',
    'HPE ProLiant DL380 Gen 9',
    'HPE ProLiant',
    'CN775206WC',
    299600.0,
    NULL,
    'Normal',
    '2018-09-12',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A049-11-04-2562',
    'COMPONENT COMPONENT Smart Card',
    'COMPONENT',
    '-',
    8500.0,
    NULL,
    'Normal',
    '2019-04-11',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A050-12-09-2562',
    'DELL PowerEdge R740',
    'DELL',
    'C915HY2',
    293073.0,
    NULL,
    'Normal',
    '2019-09-12',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A051-17-10-2562',
    'DELL OptiPlex 5270 AIO',
    'DELL',
    '518FRZ3',
    35845.0,
    NULL,
    'Normal',
    '2019-10-17',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A052-17-10-2562',
    'DELL OptiPlex 5270 AIO',
    'DELL',
    '518FRZ2',
    35845.0,
    NULL,
    'Normal',
    '2019-10-17',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A053-17-10-2562',
    'DELL OptiPlex 5270 AIO',
    'DELL',
    '519FRZ2',
    35845.0,
    NULL,
    'Normal',
    '2019-10-17',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A054-17-10-2562',
    'DELL OptiPlex 5270 AIO',
    'DELL',
    '518LRZ2',
    35845.0,
    NULL,
    'Normal',
    '2019-10-17',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A055-17-10-2562',
    'DELL OptiPlex 5270 AIO',
    'DELL',
    '518JRZ2',
    35845.0,
    NULL,
    'Normal',
    '2019-10-17',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A056-17-10-2562',
    'DELL OptiPlex 5270 AIO',
    'DELL',
    '517LRZ2',
    35845.0,
    NULL,
    'Normal',
    '2019-10-17',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A057-17-10-2562',
    'DELL OptiPlex 5270 AIO',
    'DELL',
    '519DRZ2',
    35845.0,
    NULL,
    'Normal',
    '2019-10-17',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A058-11-12-2562',
    'DELL Optiplex 3070 Micro',
    'DELL',
    'JZ2N6Z2',
    12305.0,
    NULL,
    'Normal',
    '2019-12-11',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A059-27-12-2562',
    'Polycom Group 500',
    'Polycom',
    '8G19124CCC3CCV',
    269961.0,
    NULL,
    'Normal',
    '2019-12-27',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A060-24-04-2563',
    'HPE ProLiant DL380 Gen 10',
    'HPE ProLiant',
    'SGH944S00R',
    337050.0,
    NULL,
    'Normal',
    '2020-04-24',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A061-06-11-2563',
    'Synology RS2418+',
    'Synology',
    '2080P9N158600',
    159644.0,
    NULL,
    'Normal',
    '2020-11-06',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A062-15-03-2564',
    'DELL U270Q',
    'DELL',
    '8XX8C23',
    18725.0,
    NULL,
    'Normal',
    '2021-03-15',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A063-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    'J36PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A064-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    'F46PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    '.A065-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    '646PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A066-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    'D46PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A067-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    'C46PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A068-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    'B46PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A069-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    '146PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A070-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    '846PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A071-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    '746PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A072-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    'G46PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A073-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    '546PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A074-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    '446PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A075-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    '346PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A076-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    '246PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A077-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    '946PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A078-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    'H46PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A079-23-07-2564',
    'DELL 7090 Micro',
    'DELL',
    'H36PQF3',
    33865.5,
    NULL,
    'Normal',
    '2021-06-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A080-00-00-0000',
    'APC SU48RMX',
    'APC',
    'SGS02351425901',
    0.0,
    NULL,
    'Normal',
    NULL,
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A081-00-00-0000',
    'APC SU48RMX',
    'APC',
    'SGS0235142586',
    0.0,
    NULL,
    'Normal',
    NULL,
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A082-00-00-0000',
    'APC SU3000RMX',
    'APC',
    'SGS0234171062',
    0.0,
    NULL,
    'Normal',
    NULL,
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A083-28-11-2565',
    'APC Smart-UPS 1500VA LCD RM 2U 230V',
    'APC',
    'AS2210260348',
    20865.0,
    NULL,
    'Normal',
    '2022-11-28',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A084-23-02-2566',
    'Lenovo ThinkCentre Neo 50t Gen 3',
    'Lenovo',
    'PC2L6SS2',
    21614.0,
    NULL,
    'Normal',
    '2023-02-22',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A085-23-02-2566',
    'Lenovo ThinkCentre Neo 50t Gen 3',
    'Lenovo',
    'PC2L6STY',
    21614.0,
    NULL,
    'Normal',
    '2023-02-23',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A086-20-03-2566',
    'Lenovo Thinkpad E15 Gen 4',
    'Lenovo',
    'PF48RCQZ',
    37664.0,
    NULL,
    'Normal',
    '2023-03-20',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A087-20-03-2566',
    'Lenovo Thinkpad E15 Gen 4',
    'Lenovo',
    'SPF48R1EX',
    37664.0,
    NULL,
    'Normal',
    '2023-03-20',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A088-20-03-2566',
    'Lenovo Thinkpad E15 Gen 4',
    'Lenovo',
    NULL,
    37664.0,
    NULL,
    'Normal',
    '2023-03-20',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A089-20-03-2566',
    'DELL U2722DE',
    'DELL',
    '47MLZN3',
    15087.0,
    NULL,
    'Normal',
    '2023-03-20',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A090-20-03-2566',
    'DELL U2722DE',
    'DELL',
    '28MLZN3',
    15087.0,
    NULL,
    'Normal',
    '2023-03-20',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A091-20-03-2566',
    'DELL U2722DE',
    'DELL',
    '3WHJYN3',
    15087.0,
    NULL,
    'Normal',
    '2023-03-20',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A092-19-02-2567',
    'DELL U2723QE',
    'DELL',
    'G3S9BP3',
    17974.93,
    NULL,
    'Normal',
    '2024-02-19',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A093-19-02-2567',
    'DELL U2723QE',
    'DELL',
    'J4S9BP3',
    17974.93,
    NULL,
    'Normal',
    '2024-02-19',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A094-19-02-2567',
    'DELL U2723QE',
    'DELL',
    '71FLCP3',
    17974.93,
    NULL,
    'Normal',
    '2024-02-19',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A095-20-03-2567',
    'DELL SFF 7010',
    'DELL',
    'B4KG824',
    28500.52,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A096-20-03-2567',
    'DELL SFF 7010',
    'DELL',
    '74KG824',
    28500.52,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A097-29-03-2567',
    'DELL SFF 7010',
    'DELL',
    '94KG824',
    28500.52,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A098-29-03-2567',
    'DELL SFF 7010',
    'DELL',
    '54KG824',
    28500.52,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A099-29-03-2567',
    'DELL SFF 7010',
    'DELL',
    '64KG824',
    28500.52,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A100-29-03-2567',
    'DELL SFF 7010',
    'DELL',
    '84KH824',
    28500.52,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A101-29-03-2567',
    'DELL P2422H',
    'DELL',
    '2ZOT714',
    5890.35,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A102-29-03-2567',
    'DELL P2422H',
    'DELL',
    '2KLT714',
    5890.35,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A103-29-03-2567',
    'DELL P2422H',
    'DELL',
    '31LT714',
    5890.35,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A104-29-03-2567',
    'DELL P2422H',
    'DELL',
    '33LT714',
    5890.35,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A105-29-03-2567',
    'DELL P2422H',
    'DELL',
    '2ZZT714',
    5890.35,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A106-29-03-2567',
    'DELL P2422H',
    'DELL',
    '33OV714',
    5890.35,
    NULL,
    'Normal',
    '2024-03-20',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A107-20-09-2567',
    'DELL PowerEdge R760',
    'DELL',
    'BXW2564',
    349569.0,
    NULL,
    'Normal',
    '2024-09-20',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A108-12-12-2567',
    'DELL P2425HE',
    'DELL',
    '9N6NK34',
    8142.7,
    NULL,
    'Normal',
    '2024-12-12',
    'คอมพิวเตอร์',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A109-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    '2Y4MN54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A110-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    '2X4MN54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A111-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    'FP98P54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A112-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    '3R98P54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A113-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    'FY4MN54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A114-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    'HP98P54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A115-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    '9Y4MN54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A116-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    '8Q98P54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A117-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    '2P98P54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A118-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    '7Q98P54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A119-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    'GW4MN54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A120-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    'HY4MN54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A121-19-02-2568',
    'DELL SFF 7020',
    'DELL',
    'DQ98P54',
    31602.45,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A122-19-02-2568',
    'DELL P2425H',
    'DELL',
    '93RYK34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A123-19-02-2568',
    'DELL P2425H',
    'DELL',
    '93TWK34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A124-19-02-2568',
    'DELL P2425H',
    'DELL',
    '96TWK34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A125-19-02-2568',
    'DELL P2425H',
    'DELL',
    'B2TRK34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A126-19-02-2568',
    'DELL P2425H',
    'DELL',
    '90Y1L34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A127-19-02-2568',
    'DELL P2425H',
    'DELL',
    '96LWK34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A128-19-02-2568',
    'DELL P2425H',
    'DELL',
    '950RK34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A129-19-02-2568',
    'DELL P2425H',
    'DELL',
    '953WK34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A130-19-02-2568',
    'DELL P2425H',
    'DELL',
    'B2M0L34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A131-19-02-2568',
    'DELL P2425H',
    'DELL',
    '93RQK34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A132-19-02-2568',
    'DELL P2425H',
    'DELL',
    'B2VRK34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A133-19-02-2568',
    'DELL P2425H',
    'DELL',
    'B2VXK34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'A134-19-02-2568',
    'DELL P2425H',
    'DELL',
    '9DY0L34',
    5885.0,
    NULL,
    'Normal',
    '2025-02-19',
    'คอมพิวเตอร์',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B002-20-05-2557',
    'HP LASER JET P1606DN',
    'HP',
    'VNF3L21859',
    14390.0,
    NULL,
    'Normal',
    '2014-05-20',
    'Printer',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B004-19-06-2557',
    'HP M603',
    'HP',
    'CNCXG49JN4',
    75114.0,
    NULL,
    'Normal',
    '2014-06-19',
    'Printer',
    5,
    'ดำ-ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B005-22-09-2557',
    'PRINTRONIX P8200HD (P8000)',
    'PRINTRONIX',
    '7PTX81403027',
    390550.0,
    NULL,
    'Normal',
    '2014-09-22',
    'Printer',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B007-13-03-2558',
    'EPSON LW - 1000P',
    'EPSON',
    'U5PZ430001H',
    11663.0,
    NULL,
    'Normal',
    '2015-03-13',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B008-13-03-2558',
    'PRINTRONIX P8005 (P8000)',
    'PRINTRONIX',
    '7PTX81449122',
    283550.0,
    NULL,
    'Normal',
    '2015-03-25',
    'Printer',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B011-21-05-2558',
    'EPSON LQ - 590',
    'EPSON',
    'FSVY054360',
    19474.0,
    NULL,
    'Normal',
    '2015-05-21',
    'Printer',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B013-21-05-2558',
    'HP LASER JET PRO 400',
    'HP',
    'VNH4326195',
    17548.0,
    NULL,
    'Normal',
    '2015-05-21',
    'Printer',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B014-21-05-2558',
    'HP LASER JET PRO 400',
    'HP',
    'VNH4326199',
    17548.0,
    NULL,
    'Normal',
    '2015-05-21',
    'Printer',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B016-25-11-2558',
    'HP LASER JET PRO 400 M401dn',
    'HP',
    'VNH3k43646',
    15087.0,
    NULL,
    'Normal',
    '2015-11-25',
    'Printer',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B020-31-03-2559',
    'BROTHER MFC-9330CDW',
    'BROTHER',
    'E71879767611347',
    19590.0,
    NULL,
    'Normal',
    '2016-10-05',
    'Printer',
    5,
    'ครีม - ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B021-22-08-2560',
    'BROTHER MFC-J2330DW',
    'BROTHER',
    'E77011F7F147366',
    7150.0,
    NULL,
    'Normal',
    '2017-08-22',
    'Printer',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B022-31-10-2560',
    'EPSON L805',
    'EPSON',
    'W8LY012005',
    10280.0,
    NULL,
    'Normal',
    '2017-10-31',
    'Printer',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B024-07-06-2561',
    'HP MFP M180N',
    'HP',
    'VNC3601577',
    13990.0,
    NULL,
    'Normal',
    '2018-06-07',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B027-17-10-2561',
    'Brother MFC-J2330DW',
    'Brother',
    'E77011H8F139579',
    7990.0,
    NULL,
    'Normal',
    '2018-10-17',
    'Printer',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B028-24-12-2561',
    'HP Color LaserJet Pro MFP M181fw (T6B71A)',
    'HP',
    'VNC4C06187',
    15654.1,
    NULL,
    'Normal',
    '2018-12-24',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B029-24-12-2562',
    'HP MFP M428fdw',
    'HP',
    'CNBKM63DZH',
    24503.0,
    NULL,
    'Normal',
    '2019-12-24',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B030-02-08-2562',
    'HP MFP M428fdw',
    'HP',
    'CNBKM63F35',
    24503.0,
    NULL,
    'Normal',
    '2019-08-30',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B031-02-08-2562',
    'HP MFP M428fdw',
    'HP',
    'CNBKM63F0P',
    24503.0,
    NULL,
    'Normal',
    '2019-08-02',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B032-02-08-2562',
    'HP MFP M428fdw',
    'HP',
    'CNBKM63F1H',
    24503.0,
    NULL,
    'Normal',
    '2019-08-02',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B033-18-07-2562',
    'Canon G4010',
    'Canon',
    'KLLR09852',
    7270.0,
    NULL,
    'Normal',
    '2019-07-18',
    'Printer',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B035-23-08-2562',
    'EPSON LQ2190',
    'EPSON',
    'MK5Y030458',
    27300.0,
    NULL,
    'Normal',
    '2019-08-23',
    'Printer',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B039-15-03-2564',
    'HP M227SDN',
    'HP',
    'VNCNX01499',
    8881.0,
    NULL,
    'Normal',
    '2021-03-15',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B040-15-03-2564',
    'HP M130NW',
    'HP',
    'VNCR101466',
    6206.0,
    NULL,
    'Normal',
    '2021-03-15',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B041-30-03-2565',
    'EPSON M428FDW',
    'EPSON',
    'CNDRPCM39C',
    27980.5,
    NULL,
    'Normal',
    '2022-03-30',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B042-23-06-2565',
    'Ricoh MFP IM 600F',
    'Ricoh',
    '3219XB03040',
    118770.0,
    NULL,
    'Normal',
    '2022-06-23',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B043-01-07-2565',
    'HP Smart Tank 720',
    'HP',
    'CN19A272H1',
    6896.0,
    NULL,
    'Normal',
    '2022-07-01',
    'Printer',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B044-22-02-2566',
    'HP M406dn',
    'HP',
    'PHCBH01084',
    17120.0,
    NULL,
    'Normal',
    '2023-02-22',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B045-27-03-2567',
    'HP OfficeJet Pro 9720',
    'HP',
    'CN3CJBH0ZH',
    10000.0,
    NULL,
    'Normal',
    '2024-03-27',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B046-10-06-2567',
    'HP HP LaserJet MFP M430',
    'HP',
    'CNBRS4J21L',
    30000.0,
    NULL,
    'Normal',
    '2024-06-10',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B047-10-06-2567',
    'HP HP LaserJet MFP M430',
    'HP',
    'CNBRS4J1XK',
    30000.0,
    NULL,
    'Normal',
    '2024-06-10',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B048-27-03-2568',
    'Canon GX7070',
    'Canon',
    'KNHB12386',
    11770.0,
    NULL,
    'Normal',
    '2025-03-27',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B049-27-03-2568',
    'Canon GX7070',
    'Canon',
    NULL,
    11770.0,
    NULL,
    'Normal',
    '2025-03-27',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B050-27-03-2568',
    'Canon GX7070',
    'Canon',
    NULL,
    11770.0,
    NULL,
    'Normal',
    '2025-03-27',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'B051-27-03-2568',
    'HP HP LaserJet MFP M4103',
    'HP',
    'CNCRSC5073',
    27820.0,
    NULL,
    'Normal',
    '2025-03-27',
    'Printer',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'C001-13-03-2557',
    'CANNON EOS700D',
    'CANNON',
    '138032008821',
    25000.0,
    NULL,
    'Normal',
    '2014-03-13',
    'กล้องถ่ายรูป',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'C002-04-03-2562',
    'SONY RX100 Vi',
    'SONY',
    'WW771132',
    40000.0,
    NULL,
    'Normal',
    '2019-03-04',
    'กล้องถ่ายรูป',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'C003-23-11-2565',
    'OBSBOT OBSBOT TINY',
    'OBSBOT',
    'RMOWNHD8051OYQ',
    6990.0,
    NULL,
    'Normal',
    '2022-11-23',
    'กล้องถ่ายรูป',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'C004-23-11-2565',
    'OBSBOT OBSBOT TINY',
    'OBSBOT',
    'RMOWNHDB091JXC',
    6990.0,
    NULL,
    'Normal',
    '2022-11-23',
    'กล้องถ่ายรูป',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'C005-23-11-2565',
    'OBSBOT OBSBOT TINY',
    'OBSBOT',
    'RMOWNHDB091SHG',
    6990.0,
    NULL,
    'Normal',
    '2022-11-23',
    'กล้องถ่ายรูป',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'C006-23-11-2565',
    'OBSBOT OBSBOT TINY',
    'OBSBOT',
    'RMOWNHD8131LVF',
    6990.0,
    NULL,
    'Normal',
    '2022-11-23',
    'กล้องถ่ายรูป',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'C007-07-04-2566',
    'SONY ZV-1',
    'SONY',
    NULL,
    20900.0,
    NULL,
    'Normal',
    '2023-04-07',
    'กล้องถ่ายรูป',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D001-16-06-2557',
    'TATA KEYBOX KB-120 (ตู้เก็บกุญแจ)',
    'TATA KEYBOX',
    '-',
    5186.92,
    NULL,
    'Normal',
    '2014-06-16',
    'ตู้เก็บเอกสาร',
    5,
    'ครีม',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D002-16-06-2557',
    'TATA KEYBOX KB-120 (ตู้เก็บกุญแจ)',
    'TATA KEYBOX',
    '-',
    5186.92,
    NULL,
    'Normal',
    '2015-06-16',
    'ตู้เก็บเอกสาร',
    5,
    'ครีม',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D003-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D004-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D005-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D006-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D007-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D008-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D009-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D010-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D011-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D012-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D013-21-08-2557',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2014-08-21',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D014-02-03-2558',
    'GERMANY EXPORT RACK RACK 19" (60x60x139 cm.)',
    'GERMANY EXPORT RACK',
    'Size60X60X139 cm.',
    19260.0,
    NULL,
    'Normal',
    '2015-03-02',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D015-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D016-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D017-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D018-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D019-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D020-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D021-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D022-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D023-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D024-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D025-08-06-2560',
    '- ตู้เอกสารสูง',
    '-',
    'Size1974X400X800',
    7575.6,
    NULL,
    'Normal',
    '2017-06-08',
    'ตู้เก็บเอกสาร',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D026-27-11-2566',
    'Offieintrend ตู้เก็บของบานกระจก PD-SLG15',
    'Offieintrend',
    NULL,
    6890.8,
    NULL,
    'Normal',
    '2023-11-27',
    'ตู้เก็บเอกสาร',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D027-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D028-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D029-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D030-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D031-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D032-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D033-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D034-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D035-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D036-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D037-19-11-2567',
    'ตู้เอกสารบานสวิง',
    NULL,
    'Size847X400X800',
    5855.04,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D038-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size847X400X800',
    6051.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D039-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size847X400X800',
    6051.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D040-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size847X400X800',
    6051.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D041-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size847X400X800',
    6051.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D042-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size700X400X800',
    5623.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D043-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size700X400X800',
    5623.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D044-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size700X400X800',
    5623.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D045-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size700X400X800',
    5623.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D046-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size700X400X800',
    5623.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D047-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size700X400X800',
    5623.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D048-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size700X400X800',
    5623.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D049-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size700X400X800',
    5623.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D050-19-11-2567',
    'ตู้เอกสารบานสไลด์',
    NULL,
    'Size700X400X800',
    5623.92,
    NULL,
    'Normal',
    '2024-11-19',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D051-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D052-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D053-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D054-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D055-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D056-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D057-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D058-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D059-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D060-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D061-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต้น)',
    NULL,
    'Size100X50X256.50',
    6019.72,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D062-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D063-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D064-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D065-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D066-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D067-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D068-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D069-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D070-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D071-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D072-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D073-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D074-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D075-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D076-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D077-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D078-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D079-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D080-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D081-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D082-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D083-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D084-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D085-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D086-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D087-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D088-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D089-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D090-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D091-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D092-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D093-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D094-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D095-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D096-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D097-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D098-13-12-2567',
    'Eagle ชั้นสต๊อก (ชุดต่อ6ชั้น)',
    NULL,
    'Size100X50X256.50',
    5625.37,
    NULL,
    'Normal',
    '2024-12-13',
    'ตู้เก็บเอกสาร',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D99-20/12/2567',
    'แผ่นชั้นสต๊อก',
    NULL,
    '47 แผ่น',
    32688.5,
    NULL,
    'Normal',
    '2024-12-20',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D100-20/12/2567',
    'CABINET ตู้เก็บเอกสารสูง',
    'CABINET',
    'Size1974X400X800',
    9901.78,
    NULL,
    'Normal',
    '2024-12-20',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D101-20/12/2567',
    'CABINET ตู้เก็บเอกสารสูง',
    'CABINET',
    'Size1974X400X800',
    9901.78,
    NULL,
    'Normal',
    '2024-12-20',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D102-20/12/2567',
    'CABINET ตู้เก็บเอกสารสูง',
    'CABINET',
    'Size1974X400X800',
    9901.78,
    NULL,
    'Normal',
    '2024-12-20',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'D103-20/12/2567',
    'CABINET ตู้เก็บเอกสารสูง',
    'CABINET',
    'Size1974X400X800',
    9901.78,
    NULL,
    'Normal',
    '2024-12-20',
    'ตู้เก็บเอกสาร',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E000-28-06-2556',
    'โต๊ะประชุม',
    NULL,
    NULL,
    139017.68,
    NULL,
    'Normal',
    '2013-06-28',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E001-21-08-2557',
    '- โต๊ะทำงาน โต๊ะไม้',
    '-',
    'Size 740X750X1800',
    4737.96,
    NULL,
    'Normal',
    '2014-08-21',
    'โต๊ะ',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E002-21-08-2557',
    '- โต๊ะทำงาน โต๊ะไม้',
    '-',
    'Size 740X750X1801',
    4737.96,
    NULL,
    'Normal',
    '2014-08-21',
    'โต๊ะ',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E003-21-08-2557',
    '- ชุดลิ้นชักไม้ ล้อเลื่อน',
    '-',
    'Size 644X500X800',
    4025.34,
    NULL,
    'Normal',
    '2014-08-21',
    'โต๊ะ',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E004-21-08-2557',
    '- ชุดลิ้นชักไม้ ล้อเลื่อน',
    '-',
    'Size 644X500X801',
    4025.34,
    NULL,
    'Normal',
    '2014-08-21',
    'โต๊ะ',
    5,
    'ไม้เหลือง',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E005-17-08-2564',
    'Offieintrend Table Wooden',
    'Offieintrend',
    'โต๊ะขนาด 150 ซม*75 ซม',
    8510.51,
    NULL,
    'Normal',
    '2021-08-17',
    'โต๊ะ',
    5,
    'เทา/ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E006-17-08-2564',
    'Offieintrend Table Wooden',
    'Offieintrend',
    'โต๊ะขนาด 150 ซม*75 ซม',
    8510.51,
    NULL,
    'Normal',
    '2021-08-17',
    'โต๊ะ',
    5,
    'เทา/ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E007-17-08-2564',
    'Offieintrend Table Wooden',
    'Offieintrend',
    'โต๊ะขนาด 150 ซม*75 ซม',
    8510.51,
    NULL,
    'Normal',
    '2021-08-17',
    'โต๊ะ',
    5,
    'เทา/ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E008-27-11-2566',
    'Offieintrend Table Wooden',
    'Offieintrend',
    'โต๊ะขนาด 150 ซม*75 ซม',
    12582.5,
    NULL,
    'Normal',
    '2023-11-27',
    'โต๊ะ',
    5,
    'เทา/ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E009-19-11-2567',
    'ฉากกั้นหน้าโต๊ะ 3 ชุด',
    NULL,
    'Size 600X19X1500',
    7479.3,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E010-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E011-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E012-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E013-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E014-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E015-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E016-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E017-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E018-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E019-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E020-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E021-19-11-2567',
    'โต๊ะประชุม+แผ่นบังตา',
    NULL,
    NULL,
    13028.43,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E022-19-11-2567',
    'โต๊ะกาแฟ (กลม)',
    NULL,
    NULL,
    9482.34,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E023-19-11-2567',
    'โต๊ะกาแฟ (กลม)',
    NULL,
    NULL,
    9482.34,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E024-19-11-2567',
    'โต๊ะกาแฟ (กลม)',
    NULL,
    NULL,
    9482.34,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E025-19-11-2567',
    'โต๊ะกาแฟ (กลม)',
    NULL,
    NULL,
    9482.34,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E026-19-11-2567',
    'โต๊ะกาแฟ (กลม)',
    NULL,
    NULL,
    9482.34,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E027-19-11-2567',
    'โต๊ะกาแฟ (กลม)',
    NULL,
    NULL,
    9482.34,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'E028-19-11-2567',
    'โต๊ะกาแฟ (กลม)',
    NULL,
    NULL,
    9482.34,
    NULL,
    'Normal',
    '2024-11-19',
    'โต๊ะ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F001-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F002-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F003-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F004-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F005-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F006-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F007-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F008-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F009-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F010-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F011-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F012-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F013-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F014-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F015-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F016-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F017-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F018-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F019-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F020-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F021-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F022-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F023-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F024-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F025-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F026-21-08-2557',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 1125X700X700',
    4680.18,
    NULL,
    'Normal',
    '2014-08-21',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F027-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F028-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F029-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F030-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F031-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F032-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F033-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F034-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F035-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F036-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F037-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F038-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F039-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F040-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F041-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F042-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังไม่มีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    3635.0,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F043-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F044-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F045-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F046-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F047-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F048-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F049-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F050-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F051-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F052-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F053-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F054-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F055-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F056-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F057-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F058-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F059-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F060-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F061-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F062-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F063-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F064-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F065-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F066-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F067-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F068-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F069-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F070-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F071-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F072-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F073-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    'Size 970X700X700',
    4501.06,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F074-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน พนักพิงสูง',
    'ROCK WORTH',
    'Size 1265X700X700',
    4998.98,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F075-31-08-2559',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน พนักพิงสูง',
    'ROCK WORTH',
    'Size 1265X700X700',
    4998.98,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F076-31-08-2559',
    'ROCK WORTH เก้าอี้สำหรับนั่งรอ แบบแถวๆ ละ 4 ตัว',
    'ROCK WORTH',
    'Size 780X540X2080',
    15808.61,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F077-31-08-2559',
    'ROCK WORTH เก้าอี้สำหรับนั่งรอ แบบแถวๆ ละ 4 ตัว',
    'ROCK WORTH',
    'Size 780X540X2080',
    15808.61,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F078-06-11-2567',
    'โซฟา',
    NULL,
    NULL,
    18750.0,
    NULL,
    'Normal',
    '2024-11-06',
    'เก้าอี้',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F098-06-11-2567',
    'โซฟา',
    NULL,
    NULL,
    18750.0,
    NULL,
    'Normal',
    '2024-11-06',
    'เก้าอี้',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F080-06-11-2567',
    'โซฟา',
    NULL,
    NULL,
    18750.0,
    NULL,
    'Normal',
    '2024-11-06',
    'เก้าอี้',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F081-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F082-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F083-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F084-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F085-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F086-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F087-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F088-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F089-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F090-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F091-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F092-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F093-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F094-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F095-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F096-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F097-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F098-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F099-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F100-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F101-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F102-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F103-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F104-19-11-2567',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    8889.88,
    NULL,
    'Normal',
    '2024-11-19',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F105-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F106-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F107-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F108-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F109-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F110-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F111-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F112-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F113-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F114-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F115-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F116-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F117-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F118-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F119-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F120-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F121-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F122-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F123-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F124-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F125-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F126-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F127-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F128-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F129-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    5932.08,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F130-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F131-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F132-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F133-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F134-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F135-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F136-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F137-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F138-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F139-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F140-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F141-26-08-2556',
    'ROCK WORTH เก้าอี้เบาะหนังมีที่วางแขน',
    'ROCK WORTH',
    NULL,
    4680.18,
    NULL,
    'Normal',
    '2013-08-26',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F142-31-08-2559',
    'ROCK WORTH เก้าอี้สำหรับนั่งรอ แบบแถวๆ ละ 4 ตัว',
    'ROCK WORTH',
    'Size 780X540X2080',
    15808.61,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F143-31-08-2559',
    'ROCK WORTH เก้าอี้สำหรับนั่งรอ แบบแถวๆ ละ 4 ตัว',
    'ROCK WORTH',
    'Size 780X540X2080',
    15808.61,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'F144-31-08-2559',
    'ROCK WORTH เก้าอี้สำหรับนั่งรอ แบบแถวๆ ละ 4 ตัว',
    'ROCK WORTH',
    'Size 780X540X2080',
    15808.61,
    NULL,
    'Normal',
    '2016-08-31',
    'เก้าอี้',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'G001-22-08-2557',
    'MITSUBISHI MS-GK09VA-T1',
    'MITSUBISHI',
    '4045456',
    17500.0,
    NULL,
    'Normal',
    '2014-08-22',
    'แอร์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'G002-27-07-2566',
    'MITSUBISHI PC-P18KAKL (17,400 BTU)',
    'MITSUBISHI',
    '36M00012',
    35300.0,
    NULL,
    'Normal',
    '2023-07-27',
    'แอร์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'G003-27-07-2566',
    'MITSUBISHI PC-P18KAKL (17,400 BTU)',
    'MITSUBISHI',
    '36M00022',
    35300.0,
    NULL,
    'Normal',
    '2023-07-27',
    'แอร์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'G004-27-07-2566',
    'MITSUBISHI PC-P18KAKL (17,400 BTU)',
    'MITSUBISHI',
    '36M00023',
    35300.0,
    NULL,
    'Normal',
    '2023-07-27',
    'แอร์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'G005-27-07-2566',
    'MITSUBISHI PC-P30KAKL (28,300 BTU)',
    'MITSUBISHI',
    NULL,
    28300.0,
    NULL,
    'Normal',
    '2023-07-27',
    'แอร์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'G006-27-07-2566',
    'MITSUBISHI MS-GN13VF (12,966 BTU)',
    'MITSUBISHI',
    '3013206T',
    23000.0,
    NULL,
    'Normal',
    '2023-07-27',
    'แอร์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'G007-23-09-2567',
    'MITSUBISHI PC-M24KAKL (42,309 BTU)',
    'MITSUBISHI',
    NULL,
    53000.0,
    NULL,
    'Normal',
    '2024-09-23',
    'แอร์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'G008-23-09-2567',
    'MITSUBISHI PC-M24KAKL (42,309 BTU)',
    'MITSUBISHI',
    NULL,
    53000.0,
    NULL,
    'Normal',
    '2024-09-23',
    'แอร์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'G009-18-11-2567',
    'MITSUBISHI MS-GY18VF (18}000 BTU)',
    'MITSUBISHI',
    '4003304T',
    36000.0,
    NULL,
    'Normal',
    '2024-11-18',
    'แอร์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H001-11-04-2557',
    'OLIVETTI MB2',
    'OLIVETTI',
    '1495597 (478918)',
    55500.0,
    NULL,
    'Normal',
    '2014-04-11',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H003-11-04-2557',
    'OLIVETTI MB2',
    'OLIVETTI',
    '1495672 (480814)',
    55500.0,
    NULL,
    'Normal',
    '2014-04-11',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H004-11-04-2557',
    'OLIVETTI MB2',
    'OLIVETTI',
    '1495502 (467886)',
    55500.0,
    NULL,
    'Normal',
    '2014-04-11',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H005-11-04-2557',
    'OLIVETTI MB2',
    'OLIVETTI',
    '1495494 (467882)',
    55500.0,
    NULL,
    'Normal',
    '2014-04-11',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H006-11-04-2557',
    'OLIVETTI MB2',
    'OLIVETTI',
    '1495673 (483417)',
    55500.0,
    NULL,
    'Normal',
    '2014-04-11',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H007-07-04-2558',
    'HITACHI BH180AZ-Sx',
    'HITACHI',
    '02959',
    197950.0,
    NULL,
    'Normal',
    '2015-04-07',
    'ปรับสมุด',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H008-12-04-2559',
    'OLIVETTI MB2',
    'OLIVETTI',
    '1459697 (392094)',
    59920.0,
    NULL,
    'Normal',
    '2016-04-12',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H009-12-04-2559',
    'OLIVETTI MB2',
    'OLIVETTI',
    '1459711 (368978)',
    59920.0,
    NULL,
    'Normal',
    '2016-04-12',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H010-12-04-2559',
    'OLIVETTI MB2',
    'OLIVETTI',
    '1459991 (392070)',
    59920.0,
    NULL,
    'Normal',
    '2016-04-12',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H011-23-06-2563',
    'OLIVETTI MB2',
    'OLIVETTI',
    '8117839',
    59920.0,
    NULL,
    'Normal',
    '2020-06-23',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H012-12-04-2559',
    'OLIVETTI MB2',
    'OLIVETTI',
    '8117819',
    59920.0,
    NULL,
    'Normal',
    '2020-06-23',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H013-19-06-2561',
    'OLIVETTI MB2',
    'OLIVETTI',
    '8011074',
    59920.0,
    NULL,
    'Normal',
    '2018-05-31',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H014-19-06-2561',
    'OLIVETTI MB2',
    'OLIVETTI',
    '8011068',
    59920.0,
    NULL,
    'Normal',
    '2018-05-31',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H015-01-07-2565',
    'OLIVETTI MB2',
    'OLIVETTI',
    '8117856',
    59920.0,
    NULL,
    'Normal',
    '2022-07-07',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H015-23-02-2566',
    'OLIVETTI MB2',
    'OLIVETTI',
    '8117851',
    59920.0,
    NULL,
    'Normal',
    '2023-02-23',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'H016-15-03-2567',
    'OLIVETTI MB2',
    'OLIVETTI',
    '8117760',
    59920.0,
    NULL,
    'Normal',
    '2024-03-15',
    'ปรับสมุด',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I001-12-05-2557',
    'SONY VIO Fit 15A',
    'SONY',
    'P54643258JS010000238%',
    42900.0,
    NULL,
    'Normal',
    '2014-05-12',
    'โน๊ตบุค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I002-12-05-2557',
    'SONY VIO Fit 15A',
    'SONY',
    'P54643258JS010000370$',
    42900.0,
    NULL,
    'Normal',
    '2014-05-12',
    'โน๊ตบุค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I003-26-02-2558',
    'APPLE Macbook Pro 15"',
    'APPLE',
    'EDACAD89A892',
    57951.0,
    NULL,
    'Normal',
    '2015-02-26',
    'โน๊ตบุค',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I004-26-02-2558',
    'APPLE Macbook Pro 15"',
    'APPLE',
    '221F5E1EFD9F',
    57951.0,
    NULL,
    'Normal',
    '2015-02-26',
    'โน๊ตบุค',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I005-29-02-2560',
    'ASUS Zenbook UX510UX-CN266',
    'ASUS',
    'H2NOCV14H033086',
    32500.0,
    NULL,
    'Normal',
    '2017-12-29',
    'โน๊ตบุค',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I006-29-02-2560',
    'ASUS Zenbook UX510UX-CN266',
    'ASUS',
    'H2N0CV14H109086',
    32500.0,
    NULL,
    'Normal',
    '2017-12-29',
    'โน๊ตบุค',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I007-29-02-2560',
    'ASUS Zenbook UX510UX-CN266',
    'ASUS',
    'H2N0CV14H168087',
    32500.0,
    NULL,
    'Normal',
    '2017-12-29',
    'โน๊ตบุค',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I008-13-07-2561',
    'ASUS ROG Strix GL503VM-FY365T',
    'ASUS',
    'J4NOCX01L116148',
    46384.5,
    NULL,
    'Normal',
    '2018-07-13',
    'โน๊ตบุค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I009-13-07-2561',
    'ASUS ROG Strix GL503VM-FY365T',
    'ASUS',
    'J4NOCX01L151144',
    46384.5,
    NULL,
    'Normal',
    '2018-07-13',
    'โน๊ตบุค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I010-21-03-2562',
    'HP Omen Gaming 15',
    'HP',
    '5CD9090NOW',
    55900.0,
    NULL,
    'Normal',
    '2019-03-21',
    'โน๊ตบุค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I011-18-06-2562',
    'APPLE MACBOOK PRO 17"',
    'APPLE',
    'C02YNX2YLVCG',
    86900.0,
    NULL,
    'Normal',
    '2019-06-18',
    'โน๊ตบุค',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I012-27-02-2563',
    'APPLE MACBOOK PRO 17"',
    'APPLE',
    'C02ZE3W5MD6Q',
    93183.0,
    NULL,
    'Normal',
    '2020-02-27',
    'โน๊ตบุค',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I013-31-08-2564',
    'Huawei MateBook D15',
    'Huawei',
    'KGHPM21319004153',
    24190.0,
    NULL,
    'Normal',
    '2021-08-31',
    'โน๊ตบุค',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I014-31-08-2564',
    'Huawei MateBook D15',
    'Huawei',
    'KGHPM21319004176',
    24140.0,
    NULL,
    'Normal',
    '2021-08-31',
    'โน๊ตบุค',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I015-31-08-2564',
    'Huawei MateBook D15',
    'Huawei',
    'KGHPM21319004034',
    24140.0,
    NULL,
    'Normal',
    '2021-08-31',
    'โน๊ตบุค',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I016-31-08-2564',
    'Huawei MateBook D15',
    'Huawei',
    'KGHPM21319004197',
    24490.0,
    NULL,
    'Normal',
    '2021-08-31',
    'โน๊ตบุค',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I017-18-04-2567',
    'APPLE MacBook Air M3',
    'APPLE',
    'KWQ6696RQD',
    59999.18,
    NULL,
    'Normal',
    '2024-04-18',
    'โน๊ตบุค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I018-26-02-2568',
    'APPLE MacBook Pro 16',
    'APPLE',
    NULL,
    106289.52,
    NULL,
    'Normal',
    '2025-02-26',
    'โน๊ตบุค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I019-26-03-2568',
    'Lenovo Thinkbook 16',
    'Lenovo',
    'PW0BRJE1',
    27392.0,
    NULL,
    'Normal',
    '2025-03-26',
    'โน๊ตบุค',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'I020-23-04-2568',
    'Lenovo X1 Carbon Gen 13',
    'Lenovo',
    'PF57FA1N',
    84423.0,
    NULL,
    'Normal',
    '2025-04-23',
    'โน๊ตบุค',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'J001-14-03-2557',
    'NEOCAL NU-2300',
    'NEOCAL',
    '0000003643',
    9900.0,
    NULL,
    'Normal',
    '2014-03-14',
    'สแกนลายนิ้วมือ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'J002-27-10-2560',
    'NEOCAL NF-W6',
    'NEOCAL',
    '0000001333',
    9900.0,
    NULL,
    'Normal',
    '2017-10-27',
    'สแกนลายนิ้วมือ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'J003-07-03-2566',
    'EPIC ES-F501H',
    'EPIC',
    'F501H2450945',
    11300.0,
    NULL,
    'Normal',
    '2023-03-07',
    'สแกนลายนิ้วมือ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'J004-22-02-2567',
    'HIP Cmi F77S',
    'HIP',
    '77S2306093',
    14980.0,
    NULL,
    'Normal',
    '2024-02-22',
    'สแกนลายนิ้วมือ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'J005-21-11-2567',
    'HIP Cmi F76S',
    'HIP',
    NULL,
    14873.0,
    NULL,
    'Normal',
    '2024-11-21',
    'สแกนลายนิ้วมือ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'J006-21-11-2567',
    'HIP Cmi F76S',
    'HIP',
    NULL,
    14873.0,
    NULL,
    'Normal',
    '2024-11-21',
    'สแกนลายนิ้วมือ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'K001-19-06-2557',
    'WELLTEC POSTMATE 6',
    'WELLTEC',
    '0802-1311-3025',
    414090.0,
    NULL,
    'Normal',
    '2014-06-19',
    'เครื่องพับ',
    5,
    'ดำ-เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'K002-10-05-2567',
    'WELLTEC SF2030s',
    'WELLTEC',
    'A123W03J2600317',
    148730.0,
    NULL,
    'Normal',
    '2024-05-10',
    'เครื่องพับ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'L001-28-10-2557',
    '- ขนาด 60 X 90 X 86 cm',
    '-',
    '-',
    8388.8,
    NULL,
    'Normal',
    '2014-10-28',
    'รถเข็น',
    5,
    'สแตนเลส',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'L002-28-10-2557',
    '- ขนาด 40 X 90 X 93 cm',
    '-',
    'แบบ 3 ชั้น',
    7918.0,
    NULL,
    'Normal',
    '2014-10-28',
    'รถเข็น',
    5,
    'สแตนเลส',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'L003-28-10-2557',
    '- ขนาด 40 X 90 X 93 cm',
    '-',
    'แบบ 3 ชั้น',
    7918.0,
    NULL,
    'Normal',
    '2014-10-28',
    'รถเข็น',
    5,
    'สแตนเลส',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M001-17-02-2558',
    'SAMSUNG SM-T805',
    'SAMSUNG',
    'RF2G2016END',
    19900.0,
    NULL,
    'Normal',
    '2015-02-17',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M002-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVF6TJHLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M003-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMQTWN52HLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M004-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMQTJ1RCHLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M005-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVF2VBHLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M006-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVF5FVHLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M007-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'GCTV5E6VHLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M008-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMQTWN46HLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M009-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVF4SAHLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M010-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVF4YHLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M011-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPUF39VHLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M012-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'GCTV5ALPHLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M013-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMQTWNHAHLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M014-27-10-2560',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMQTWRS9HLF9',
    12230.1,
    NULL,
    'Normal',
    '2017-10-27',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M015-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVGKCRHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M016-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVMW10HLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M017-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVMW3VHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M018-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVP8MVHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M019-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'GCVVPXWSHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M020-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVGHHWHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M021-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVGHVTHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M022-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVF4GWHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M023-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'GCWVP2ETHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M024-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'GCVVP43KHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M025-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVPBZGHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M026-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVMV8VHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M027-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVPAV4HLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M028-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'GCVVPZPWHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M029-03-01-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'DMPVP4BOHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-01-17',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M030-19-03-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'GCVVQJOTHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-03-15',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M031-19-03-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'GCVVQJCAHLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-03-15',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M032-19-03-2561',
    'APPLE WiFi 32GB (Version 2017)',
    'APPLE',
    'GCVVQNG2HLF9',
    11748.6,
    NULL,
    'Normal',
    '2018-03-15',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M033-18-02-2563',
    'APPLE MiNi 5 wifi',
    'APPLE',
    NULL,
    25440.0,
    NULL,
    'Normal',
    '2020-02-18',
    'แท็ปเล็ต',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M034-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SGVVJ3J0HQ5',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M035-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SHY50MJ6D7T',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M036-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SGGVMHC7JFQ',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M037-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SMV54GY07X6',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M038-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SGY0HPJ6LR0',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M039-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SM79PKG24V6',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M040-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SFQ6933RRF9',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M041-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SK4G7XNJ29M',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M042-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SJQ41PV73P7',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M043-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SJVFGFJYG4F',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M044-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SJ174LNH4JW',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M045-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SKXQGT4MFX2',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M046-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SJC494GYJ4M',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M047-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SJC74RCQ5VK',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M048-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SK2602PD9XH',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M049-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SDPHF17GJ4N',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M050-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SDCLX749MD9',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M051-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SCJHL2DV7M4',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M052-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SFYVG7C2VMQ',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M053-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SGDG7TRWW1T',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M054-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SG9K0WHQDQQ',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M055-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SGFW0WFRXLH',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M056-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SMPPQMW714J',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M057-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SH0J1YC2141',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M058-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SMNQWKXGX5X',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M059-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SL9JQTQ9F2X',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M060-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SG69G7PHGYV',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M061-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SLC94C0XJDG',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M062-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SJWT4J67G69',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M063-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SGKPHX3DWT5',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M064-14-02-2566',
    'APPLE iPad pro 4',
    'APPLE',
    'SGYDTQHWYXN',
    28000.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M065-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJKJT2ZYJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M066-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV08JJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M067-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV02FJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M068-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJKJT4LBJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M069-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJKJT4LVJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M070-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV7XQJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M071-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV0QXJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M072-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV0J5JKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M073-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJKJT41DJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M074-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV0F6JKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M075-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJJJTMUHJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M076-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV67MJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M077-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJFJVCM6JKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M078-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV7GRJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M079-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV8NYJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M080-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV880JKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M081-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJJJTNA0JKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M082-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJFJV79ZJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M083-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJJJTMMSJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M084-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJ3879JKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M085-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJKJT3MGJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M086-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJKJT4L6JKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M087-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV7S8JKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M088-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV6ARJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M089-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV67SJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M090-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV6B2JKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M091-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJKJT4KVJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M092-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV0QRJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M093-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJFJV8BCJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M094-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJKJT8CQJKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'M095-14-02-2566',
    'APPLE apple pencil',
    'APPLE',
    'SHJDJV108JKM9',
    4990.0,
    NULL,
    'Normal',
    '2023-03-14',
    'แท็ปเล็ต',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N002-28-04-2560',
    'ASUS RT-AC5300',
    'ASUS',
    'GCIFGZ000265',
    11500.0,
    NULL,
    'Normal',
    '2017-04-28',
    'เน็ตเวิร์ค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N003-04-07-2560',
    'LINKSYS EA9500',
    'LINKSYS',
    '17A10J0B600477',
    11990.0,
    NULL,
    'Normal',
    '2017-07-04',
    'เน็ตเวิร์ค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N004-18-10-2560',
    'CISCO GIGABIT SWITCHING HUB',
    'CISCO',
    'FCW2137A1MS',
    15350.0,
    NULL,
    'Normal',
    '2017-10-18',
    'เน็ตเวิร์ค',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N005-18-10-2560',
    'CISCO GIGABIT SWITCHING HUB',
    'CISCO',
    'FCW2137A1MS',
    15350.0,
    NULL,
    'Normal',
    '2017-10-18',
    'เน็ตเวิร์ค',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N006-16-11-2560',
    'ASUS RT-AC5300',
    'ASUS',
    'HIFGZ000331',
    11188.01,
    NULL,
    'Normal',
    '2017-11-16',
    'เน็ตเวิร์ค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N007-08-03-2562',
    'CISCO Catalyst 2960L 48 P',
    'CISCO',
    'FCW2248A4WB',
    28890.0,
    NULL,
    'Normal',
    '2019-03-08',
    'เน็ตเวิร์ค',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N008-08-03-2562',
    'Sophos XG230',
    'Sophos',
    'C24077XGRQWTE7',
    294250.0,
    NULL,
    'Normal',
    '2019-03-08',
    'เน็ตเวิร์ค',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N009-05-03-2562',
    'ASUS GT-AC5300',
    'ASUS',
    'K3IFHJ000497',
    14900.0,
    NULL,
    'Normal',
    '2019-08-28',
    'เน็ตเวิร์ค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N010-29-08-2562',
    'ASUS AC-RT88U',
    'ASUS',
    'K6IGGW000213',
    9900.0,
    NULL,
    'Normal',
    '2019-08-29',
    'เน็ตเวิร์ค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N011-30-08-2562',
    'ASUS AC-RT88U',
    'ASUS',
    'K6IGGW000214',
    9900.0,
    NULL,
    'Normal',
    '2019-08-30',
    'เน็ตเวิร์ค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N012-01-11-2562',
    'CISCO 1905',
    'CISCO',
    'FGL2337315T',
    24396.0,
    NULL,
    'Normal',
    '2019-11-01',
    'เน็ตเวิร์ค',
    5,
    'เขียว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N013-21-03-2567',
    'Fortinet Fortigate 200F',
    'Fortinet',
    '7571SH376660',
    497550.0,
    NULL,
    'Normal',
    '2024-03-21',
    'เน็ตเวิร์ค',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N014-21-07-2567',
    'Fortinet Fortigate 40F',
    'Fortinet',
    'FGT40FTK2309GB4L',
    48150.0,
    NULL,
    'Normal',
    '2024-07-31',
    'เน็ตเวิร์ค',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N015-21-07-2567',
    'CISCO CBS250-24T 4X',
    'CISCO',
    'FOC2629Y6LW',
    26750.0,
    NULL,
    'Normal',
    '2024-07-31',
    'เน็ตเวิร์ค',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N016-18-12-2567',
    'ASUS GT-BE98',
    'ASUS',
    'S6IG6L200931D9J',
    34990.0,
    NULL,
    'Normal',
    '2024-12-18',
    'เน็ตเวิร์ค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N017-18-12-2567',
    'ASUS GT-BE98',
    'ASUS',
    'S6IG6L200918RXA',
    34990.0,
    NULL,
    'Normal',
    '2024-12-18',
    'เน็ตเวิร์ค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'N018-24-10-2568',
    'ASUS TUF BE6500',
    'ASUS',
    'T4IG7F600460WJH',
    5690.0,
    NULL,
    'Normal',
    '2025-10-24',
    'เน็ตเวิร์ค',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'O-001-14-07-2558',
    'FELLOWES เครื่องย่อยกระดาษ',
    'FELLOWES',
    '4RC46231',
    29900.01,
    NULL,
    'Normal',
    '2015-06-03',
    'อื่นๆ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'O-002-28-06-2562',
    'KINGDOM ตู้เซฟนิรภัย',
    'KINGDOM',
    NULL,
    19790.0,
    NULL,
    'Normal',
    '2019-06-28',
    'อื่นๆ',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'O-003-18-09-2567',
    'ชุดเคาน์เตอร์ซิงค์ล้างจาน',
    NULL,
    NULL,
    30002.3,
    NULL,
    'Normal',
    '2024-09-18',
    'อื่นๆ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'O-004-18-09-2567',
    'ROCKA PLA ชุดตู้เก็บอุปกรณ์/1',
    'ROCKA PLA',
    NULL,
    31544.8,
    NULL,
    'Normal',
    '2024-09-18',
    'อื่นๆ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'O-005-23-06-2547',
    'KINGDOM ตู้เซฟนิรภัย',
    'KINGDOM',
    NULL,
    9601.11,
    NULL,
    'Normal',
    '2004-06-23',
    'อื่นๆ',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'O-006-12-10-2559',
    'CTRL เครื่องกดบัตรคิว',
    'CTRL',
    '1767',
    59533.0,
    NULL,
    'Normal',
    '2016-10-12',
    'อื่นๆ',
    5,
    'ฟ้าขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'O-007-00-00-0000',
    'CTRL งานระบบติดตั้งคิว',
    'CTRL',
    '0366',
    197736.0,
    NULL,
    'Normal',
    NULL,
    'อื่นๆ',
    5,
    'เขียวขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'O-008-19-03-2568',
    'MITSUBISHI เครื่องปั๊มน้ำ',
    'MITSUBISHI',
    NULL,
    8340.0,
    NULL,
    'Normal',
    '2025-03-19',
    'อื่นๆ',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'P001-03-03-2559',
    'SHURE SVX14/PGA31',
    'SHURE',
    '30B1039794',
    9900.0,
    NULL,
    'Normal',
    '2016-03-03',
    'เครื่องเสียง',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'P002-10-03-2565',
    'Saramonic Blink 500 ProB 6',
    'Saramonic',
    '2ARN3-BLINK500PRXUC',
    11800.0,
    NULL,
    'Normal',
    '2022-03-10',
    'เครื่องเสียง',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'P003-28-05-2567',
    'AIWA SS-X400DSP PRO',
    'AIWA',
    '2023118300015',
    19000.0,
    NULL,
    'Normal',
    '2024-05-28',
    'เครื่องเสียง',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'P004-27/12/2567',
    'ไม่ระบุ',
    NULL,
    NULL,
    91228.2,
    NULL,
    'Normal',
    '2024-12-27',
    'เครื่องเสียง',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'P005-27/12/2567',
    'ไม่ระบุ',
    NULL,
    NULL,
    576302.0,
    NULL,
    'Normal',
    '2024-12-27',
    'เครื่องเสียง',
    5,
    NULL,
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q001-04-03-2559',
    'BENQ MW603 1-Y',
    'BENQ',
    'PD27F01316000',
    21900.0,
    NULL,
    'Normal',
    '2016-03-14',
    'ฉายภาพ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q002-04-03-2559',
    'BENQ MW603 1-Y',
    'BENQ',
    'PD27F01321000',
    21900.0,
    NULL,
    'Normal',
    '2016-03-14',
    'ฉายภาพ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q005-08-12-2565',
    'Hisense Smart TV 55E6H',
    'Hisense',
    NULL,
    9249.0,
    NULL,
    'Normal',
    '2022-12-08',
    'ฉายภาพ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q006-08-04-2565',
    'Epson EB-735F',
    'Epson',
    NULL,
    87740.0,
    NULL,
    'Normal',
    '2022-04-08',
    'ฉายภาพ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q007-18-07-2566',
    'HIK VISION DS-7216HUHI-M2/S',
    'HIK VISION',
    '95758142WCVU',
    9900.0,
    NULL,
    'Normal',
    '2023-07-18',
    'ฉายภาพ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q008-18-07-2566',
    'HIK VISION DS-7216HUHI-M2/S',
    'HIK VISION',
    '95758136WCVU',
    9900.0,
    NULL,
    'Normal',
    '2023-07-18',
    'ฉายภาพ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q009-11-09-2567',
    'Apple TV TV Generation 3',
    'Apple TV',
    'GY209WTKX5',
    5989.86,
    NULL,
    'Normal',
    '2024-09-11',
    'ฉายภาพ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q010-07-11-2567',
    'TV sumsung 75 นิ้ว 75DU8100',
    'TV sumsung 75 นิ้ว',
    '0U293NNX900271X',
    25990.0,
    NULL,
    'Normal',
    '2024-11-07',
    'ฉายภาพ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q011-17-07-2566',
    'HIK VISION',
    'HIK VISION',
    NULL,
    30150.0,
    NULL,
    'Normal',
    '2023-07-17',
    'ฉายภาพ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q012-26-06-2568',
    'TV LG 50 นิ้ว 50DU7700',
    'TV LG 50 นิ้ว',
    NULL,
    17109.3,
    NULL,
    'Normal',
    '2025-06-26',
    'ฉายภาพ',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q013-08-07-2568',
    'HIK VISION DS-2DE2A404IW-DE3',
    'HIK VISION',
    NULL,
    6420.0,
    NULL,
    'Normal',
    '2025-07-08',
    'ฉายภาพ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'Q014-08-07-2568',
    'HIK VISION DS-2CE78DOT-LTS',
    'HIK VISION',
    NULL,
    21400.0,
    NULL,
    'Normal',
    '2025-07-08',
    'ฉายภาพ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'R002-08-04-2564',
    'BROTHER ADS-2700W',
    'BROTHER',
    'E71623F5G304009',
    20073.2,
    NULL,
    'Normal',
    '2021-04-08',
    'สแกน',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'R003-10-06-2565',
    'BROTHER ADS-2800W',
    'BROTHER',
    'E76070G8G233012',
    28355.0,
    NULL,
    'Normal',
    '2022-06-10',
    'สแกน',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'R004-10-06-2565',
    'BROTHER ADS-2800W',
    'BROTHER',
    'E76070G8G233015',
    28355.0,
    NULL,
    'Normal',
    '2022-06-10',
    'สแกน',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'R005-10-06-2565',
    'BROTHER ADS-2800W',
    'BROTHER',
    'E76070G8G233019',
    28355.0,
    NULL,
    'Normal',
    '2022-06-10',
    'สแกน',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'R006-10-06-2565',
    'BROTHER ADS-2800W',
    'BROTHER',
    'E76070G8G233013',
    28355.0,
    NULL,
    'Normal',
    '2022-06-10',
    'สแกน',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'R007-10-06-2565',
    'BROTHER ADS-2800W',
    'BROTHER',
    'E76070G8G233014',
    28355.0,
    NULL,
    'Normal',
    '2022-06-10',
    'สแกน',
    5,
    'ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'R008-19-04-2566',
    'BROTHER ADS-4700W',
    'BROTHER',
    'E81474H8X117005',
    29844.44,
    NULL,
    'Normal',
    '2023-04-19',
    'สแกน',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'R009-02-04-2568',
    'BROTHER ADS-4900W',
    'BROTHER',
    NULL,
    32121.4,
    NULL,
    'Normal',
    '2025-04-02',
    'สแกน',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'R010-02-04-2568',
    'BROTHER ADS-4900W',
    'BROTHER',
    NULL,
    32121.4,
    NULL,
    'Normal',
    '2025-04-02',
    'สแกน',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'R011-02-04-2568',
    'BROTHER ADS-4900W',
    'BROTHER',
    NULL,
    32121.4,
    NULL,
    'Normal',
    '2025-04-02',
    'สแกน',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'T001-16-11-2559',
    'PANASONIC KX-MB2120',
    'PANASONIC',
    'kx-mb2120cxw',
    5325.25,
    NULL,
    'Normal',
    '2016-11-16',
    'แฟกซ์',
    5,
    'ขาว-ดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'T002-28-11-2559',
    'PANASONIC KX-DT543',
    'PANASONIC',
    '0036-14-0182',
    7169.0,
    NULL,
    'Normal',
    '2016-11-28',
    'แฟกซ์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'T003-17-03-2563',
    'HP M227FDW',
    'HP',
    'VNH4Y04311',
    11389.0,
    NULL,
    'Normal',
    '2020-03-17',
    'แฟกซ์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'T004-17-03-2563',
    'HP M227FDW',
    'HP',
    NULL,
    11389.0,
    NULL,
    'Normal',
    '2020-03-17',
    'แฟกซ์',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'U001-26-04-2560',
    'CO-AIM BCM-300',
    'CO-AIM',
    NULL,
    68000.0,
    NULL,
    'Normal',
    '2017-04-26',
    'เครื่องนับ',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'U002-30-06-2565',
    'LIDIX ML-2VS พร้อมจอแสดงผลภายนอก',
    'LIDIX',
    'MVSA22061100D',
    54000.0,
    NULL,
    'Normal',
    '2022-06-30',
    'เครื่องนับ',
    5,
    'ขาวดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'U003-30-06-2565',
    'LIDIX ML-2VS พร้อมจอแสดงผลภายนอก',
    'LIDIX',
    'MVSA22061101D',
    54000.0,
    NULL,
    'Normal',
    '2022-06-30',
    'เครื่องนับ',
    5,
    'ขาวดำ',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'V001-19-06-2561',
    'HITACHI ตู้เย็น HI-R-V400PZ-SLS',
    'HITACHI',
    '4180601053',
    14000.0,
    NULL,
    'Normal',
    '2018-06-16',
    'ตู้เย็น/ถังต้มน้ำไฟฟ้า',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'V002-22-06-2561',
    'SEAGULL ถังต้มน้ำไฟฟ้ารุ่นดิจิตอล 14 ลิตร',
    'SEAGULL',
    '0092250',
    8900.0,
    NULL,
    'Normal',
    '2018-06-22',
    'ตู้เย็น/ถังต้มน้ำไฟฟ้า',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'V003-15-06-2565',
    'SHARP ตู้ทำน้ำร้อน-เย็น รุ่น SB-210S',
    'SHARP',
    '10009282',
    6290.0,
    NULL,
    'Normal',
    '2022-06-15',
    'ตู้เย็น/ถังต้มน้ำไฟฟ้า',
    5,
    'เทา/ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'V004-00-00-0000',
    'HITACHI ตู้เย็น รุ่น R-Z440VX',
    'HITACHI',
    NULL,
    24153.0,
    NULL,
    'Normal',
    NULL,
    'ตู้เย็น/ถังต้มน้ำไฟฟ้า',
    5,
    'เทา',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'V005-19-07-2566',
    'Electrolux ตู้ทำน้ำร้อน-เย็น รุ่น EQAXF01BXWT',
    'Electrolux',
    NULL,
    7990.0,
    NULL,
    'Normal',
    '2023-07-19',
    'ตู้เย็น/ถังต้มน้ำไฟฟ้า',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'V006-19-07-2566',
    'Electrolux ตู้ทำน้ำร้อน-เย็น รุ่น EQAXF01BXWT',
    'Electrolux',
    NULL,
    7990.0,
    NULL,
    'Normal',
    '2023-07-19',
    'ตู้เย็น/ถังต้มน้ำไฟฟ้า',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'V007-30-07-2568',
    'SEAGULL ถังต้มน้ำไฟฟ้ารุ่นดิจิตอล โปร 14 ลิตร',
    'SEAGULL',
    '002102',
    7290.0,
    NULL,
    'Normal',
    '2025-07-30',
    'ตู้เย็น/ถังต้มน้ำไฟฟ้า',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'V008-30-07-2568',
    'SEAGULL ถังต้มน้ำไฟฟ้ารุ่นดิจิตอล โปร 14 ลิตร',
    'SEAGULL',
    '002091',
    7290.0,
    NULL,
    'Normal',
    '2025-07-30',
    'ตู้เย็น/ถังต้มน้ำไฟฟ้า',
    5,
    'เงิน',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X001-02-04-2563',
    'AWAC K1000F-A03',
    'AWAC',
    'MPAO6A0037',
    18000.0,
    NULL,
    'Normal',
    '2020-04-02',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X002-02-04-2563',
    'AWAC K1000F-A03',
    'AWAC',
    'MPO100052',
    18000.0,
    NULL,
    'Normal',
    '2020-04-02',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X003-02-04-2563',
    'AWAC K1000F-A03',
    'AWAC',
    'MPO100038',
    18000.0,
    NULL,
    'Normal',
    '2020-04-02',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X004-02-04-2563',
    'AWAC K1000F-A03',
    'AWAC',
    'MPAO6A034',
    18000.0,
    NULL,
    'Normal',
    '2020-04-02',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X005-02-04-2563',
    'AWAC K1000F-A03',
    'AWAC',
    'MPAO6A0023',
    18000.0,
    NULL,
    'Normal',
    '2020-04-02',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X006-22-02-2564',
    'Xaiomi Mi Air Purfler Pro H',
    'Xaiomi',
    '2860100008560',
    7490.0,
    NULL,
    'Normal',
    '2021-02-22',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X007-08-07-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MPO100035',
    16050.0,
    NULL,
    'Normal',
    '2021-07-08',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X008-08-07-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MPO100033',
    16050.0,
    NULL,
    'Normal',
    '2021-07-08',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X009-08-07-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MPO100047',
    16050.0,
    NULL,
    'Normal',
    '2021-07-08',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X010-08-07-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MPO100054',
    16050.0,
    NULL,
    'Normal',
    '2021-07-08',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X011-08-07-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MPA06A0027',
    16050.0,
    NULL,
    'Normal',
    '2021-07-08',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X012-08-07-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MP0100041',
    16050.0,
    NULL,
    'Normal',
    '2021-07-08',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X013-08-07-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MP0100036',
    16050.0,
    NULL,
    'Normal',
    '2021-07-08',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X014-08-07-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MPAO6A0036',
    16050.0,
    NULL,
    'Normal',
    '2021-07-08',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X015-06-08-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MPO100172',
    16050.0,
    NULL,
    'Normal',
    '2021-08-06',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X016-06-08-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MPO100193',
    16050.0,
    NULL,
    'Normal',
    '2021-08-06',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

INSERT INTO assets (code, name, brand, serial, price, location, status, purchase_date, category, useful_life, color, image, is_sticker_printed)
VALUES (
    'X017-06-08-2564',
    'AWAC KJ1000F-A03',
    'AWAC',
    'MPO100191',
    16050.0,
    NULL,
    'Normal',
    '2021-08-06',
    'เครื่องฟอกอากาศ',
    5,
    'ขาว',
    NULL,
    false
)
ON CONFLICT (code) DO UPDATE SET
    name = EXCLUDED.name,
    brand = EXCLUDED.brand,
    serial = EXCLUDED.serial,
    price = EXCLUDED.price,
    location = EXCLUDED.location,
    status = EXCLUDED.status,
    purchase_date = EXCLUDED.purchase_date,
    category = EXCLUDED.category,
    useful_life = EXCLUDED.useful_life,
    color = EXCLUDED.color,
    image = EXCLUDED.image;

-- ================================================================================
-- Summary
-- ================================================================================
-- Categories: 22
-- Assets: 670
-- Generated: 2025-12-25 13:00:21
