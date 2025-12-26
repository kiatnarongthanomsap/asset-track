-- ================================================================================
-- AssetTrack Database Schema - Final Version
-- สำหรับ PostgreSQL / Supabase
-- สร้างเมื่อ: 2025-12-25
-- ================================================================================
-- 
-- ไฟล์นี้รวม schema ทั้งหมดที่จำเป็นสำหรับระบบ AssetTrack
-- รวมถึง tables, indexes, functions, triggers
-- ================================================================================

-- ================================================================================
-- 1. USERS TABLE
-- ================================================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    email VARCHAR(255),
    role VARCHAR(50) DEFAULT 'Viewer', -- Admin, Manager, Staff, Viewer
    status VARCHAR(20) DEFAULT 'Active', -- Active, Inactive
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Comments
COMMENT ON TABLE users IS 'ตารางผู้ใช้งานระบบ';
COMMENT ON COLUMN users.username IS 'ชื่อผู้ใช้ (unique)';
COMMENT ON COLUMN users.password IS 'รหัสผ่าน (ควรเข้ารหัสในอนาคต)';
COMMENT ON COLUMN users.name IS 'ชื่อ-นามสกุล';
COMMENT ON COLUMN users.email IS 'อีเมล';
COMMENT ON COLUMN users.role IS 'บทบาท: Admin, Manager, Staff, Viewer';
COMMENT ON COLUMN users.status IS 'สถานะ: Active, Inactive';

-- ================================================================================
-- 2. CATEGORIES TABLE
-- ================================================================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    prefix VARCHAR(10) NOT NULL UNIQUE,
    useful_life INTEGER DEFAULT 5, -- ระยะเวลาคิดค่าเสื่อม (ปี)
    icon_name VARCHAR(50), -- ชื่อ icon จาก lucide-react
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for categories
CREATE INDEX IF NOT EXISTS idx_categories_prefix ON categories(prefix);
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);

-- Comments
COMMENT ON TABLE categories IS 'ตารางหมวดหมู่ทรัพย์สิน';
COMMENT ON COLUMN categories.prefix IS 'อักษรนำหน้าหมวดหมู่ (A-Z, unique)';
COMMENT ON COLUMN categories.useful_life IS 'ระยะเวลาคิดค่าเสื่อมตามหลักราชการ (หน่วย: ปี)';
COMMENT ON COLUMN categories.icon_name IS 'ชื่อ icon component จาก lucide-react';

-- ================================================================================
-- 3. ASSETS TABLE
-- ================================================================================
-- Create ENUM type for asset status
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'asset_status') THEN
        CREATE TYPE asset_status AS ENUM ('Normal', 'Repair', 'Check', 'Disposed');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    serial VARCHAR(100),
    price NUMERIC(12, 2) DEFAULT 0.00,
    location VARCHAR(200),
    status asset_status DEFAULT 'Normal',
    purchase_date DATE,
    category VARCHAR(100),
    useful_life INTEGER DEFAULT 5,
    color VARCHAR(50),
    image TEXT,
    is_sticker_printed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    custodian VARCHAR(200), -- ผู้รับผิดชอบ / ผู้ใช้งาน
    vendor VARCHAR(200), -- ร้านค้า / ผู้จำหน่าย
    warranty_expiry DATE, -- วันสิ้นสุดการรับประกัน
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for assets
CREATE INDEX IF NOT EXISTS idx_assets_code ON assets(code);
CREATE INDEX IF NOT EXISTS idx_assets_category ON assets(category);
CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
CREATE INDEX IF NOT EXISTS idx_assets_location ON assets(location);
CREATE INDEX IF NOT EXISTS idx_assets_purchase_date ON assets(purchase_date);

-- Comments
COMMENT ON TABLE assets IS 'ตารางทรัพย์สิน';
COMMENT ON COLUMN assets.code IS 'รหัสทรัพย์สิน (รูปแบบ: PREFIX-RUNNING-DD-MM-YYYY)';
COMMENT ON COLUMN assets.location IS 'สถานที่ใช้งานปัจจุบัน';
COMMENT ON COLUMN assets.notes IS 'หมายเหตุเพิ่มเติม';
COMMENT ON COLUMN assets.custodian IS 'ผู้รับผิดชอบ / ผู้ใช้งาน';
COMMENT ON COLUMN assets.vendor IS 'ร้านค้า / ผู้จำหน่าย';
COMMENT ON COLUMN assets.warranty_expiry IS 'วันสิ้นสุดการรับประกัน';
COMMENT ON COLUMN assets.color IS 'สีของทรัพย์สิน';

-- ================================================================================
-- 4. AUDIT LOGS TABLE
-- ================================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    action_date DATE,
    action VARCHAR(100) NOT NULL,
    asset_code VARCHAR(50),
    operator VARCHAR(100),
    document_ref VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for audit_logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_action_date ON audit_logs(action_date);
CREATE INDEX IF NOT EXISTS idx_audit_logs_asset_code ON audit_logs(asset_code);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- Comments
COMMENT ON TABLE audit_logs IS 'ตารางบันทึกการทำงานของระบบ';

-- ================================================================================
-- 5. SETTINGS TABLE
-- ================================================================================
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string', -- string, number, boolean, json
    description TEXT,
    category VARCHAR(50) DEFAULT 'general', -- general, numbering, depreciation, system
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for settings
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON settings(category);

-- Comments
COMMENT ON TABLE settings IS 'ตารางเก็บการตั้งค่าระบบ';
COMMENT ON COLUMN settings.setting_key IS 'คีย์ของการตั้งค่า (unique)';
COMMENT ON COLUMN settings.setting_value IS 'ค่าของการตั้งค่า (เก็บเป็น text)';
COMMENT ON COLUMN settings.setting_type IS 'ประเภทของค่า: string, number, boolean, json';
COMMENT ON COLUMN settings.category IS 'หมวดหมู่: general, numbering, depreciation, system';

-- ================================================================================
-- 6. INVENTORY TABLES
-- ================================================================================

-- 6.1 Inventory Cycles Table (รอบการตรวจนับ)
CREATE TABLE IF NOT EXISTS inventory_cycles (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    cycle_name VARCHAR(200) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Planning', -- Planning, In Progress, Completed, Cancelled
    assigned_to INTEGER REFERENCES users(id),
    notes TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6.2 Inventory Counts Table (บันทึกการตรวจนับแต่ละรายการ)
CREATE TABLE IF NOT EXISTS inventory_counts (
    id SERIAL PRIMARY KEY,
    cycle_id INTEGER NOT NULL REFERENCES inventory_cycles(id) ON DELETE CASCADE,
    asset_id INTEGER NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
    asset_code VARCHAR(50) NOT NULL, -- เก็บไว้เพื่ออ้างอิงแม้ asset ถูกลบ
    
    -- ข้อมูลจากการตรวจนับจริง
    counted_status VARCHAR(50), -- Found, Not Found, Damaged, Moved
    counted_location VARCHAR(200), -- สถานที่ที่พบจริง
    counted_by INTEGER REFERENCES users(id),
    counted_date DATE,
    counted_notes TEXT,
    
    -- ข้อมูลเปรียบเทียบ
    location_match BOOLEAN, -- สถานที่ตรงกับระบบหรือไม่
    status_match BOOLEAN, -- สถานะตรงกับระบบหรือไม่
    condition_match BOOLEAN, -- สภาพตรงกับระบบหรือไม่
    
    -- การแก้ไข
    requires_adjustment BOOLEAN DEFAULT FALSE,
    adjustment_reason TEXT,
    adjustment_approved_by INTEGER REFERENCES users(id),
    adjustment_approved_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(cycle_id, asset_id) -- ไม่ให้ตรวจนับซ้ำในรอบเดียวกัน
);

-- 6.3 Inventory Assignments Table (มอบหมายงานตรวจนับ)
CREATE TABLE IF NOT EXISTS inventory_assignments (
    id SERIAL PRIMARY KEY,
    cycle_id INTEGER NOT NULL REFERENCES inventory_cycles(id) ON DELETE CASCADE,
    assigned_to INTEGER NOT NULL REFERENCES users(id),
    location_filter VARCHAR(200), -- ตรวจนับเฉพาะสถานที่นี้
    category_filter VARCHAR(100), -- ตรวจนับเฉพาะหมวดหมู่นี้
    status VARCHAR(50) DEFAULT 'Pending', -- Pending, In Progress, Completed
    total_assets INTEGER DEFAULT 0,
    counted_assets INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for inventory tables
CREATE INDEX IF NOT EXISTS idx_inventory_cycles_year ON inventory_cycles(year);
CREATE INDEX IF NOT EXISTS idx_inventory_cycles_status ON inventory_cycles(status);
CREATE INDEX IF NOT EXISTS idx_inventory_cycles_created_by ON inventory_cycles(created_by);
CREATE INDEX IF NOT EXISTS idx_inventory_counts_cycle_id ON inventory_counts(cycle_id);
CREATE INDEX IF NOT EXISTS idx_inventory_counts_asset_id ON inventory_counts(asset_id);
CREATE INDEX IF NOT EXISTS idx_inventory_counts_counted_by ON inventory_counts(counted_by);
CREATE INDEX IF NOT EXISTS idx_inventory_counts_counted_status ON inventory_counts(counted_status);
CREATE INDEX IF NOT EXISTS idx_inventory_assignments_cycle_id ON inventory_assignments(cycle_id);
CREATE INDEX IF NOT EXISTS idx_inventory_assignments_assigned_to ON inventory_assignments(assigned_to);
CREATE INDEX IF NOT EXISTS idx_inventory_assignments_status ON inventory_assignments(status);

-- Comments for inventory tables
COMMENT ON TABLE inventory_cycles IS 'รอบการตรวจนับครุภัณฑ์ประจำปี';
COMMENT ON TABLE inventory_counts IS 'บันทึกผลการตรวจนับแต่ละรายการ';
COMMENT ON TABLE inventory_assignments IS 'การมอบหมายงานตรวจนับให้ผู้ใช้';

-- ================================================================================
-- 7. FUNCTIONS
-- ================================================================================

-- 7.1 Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7.2 Function: Extract date from asset code
-- รูปแบบ: {PREFIX}{RUNNING}-{DD}-{MM}-{YYYY}
-- เช่น A004-09-04-2557 -> 2014-04-09
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
    -- ตรวจสอบว่ารหัสมีรูปแบบวันที่หรือไม่
    IF asset_code IS NULL OR asset_code = '' THEN
        RETURN NULL;
    END IF;
    
    -- แยกส่วนหลัง - ออกมา (เช่น A004-09-04-2557 -> 09-04-2557)
    date_part := SUBSTRING(asset_code FROM '^[^-]+-[^-]+-(.+)$');
    
    -- ถ้าไม่พบรูปแบบ ให้ลองหาว่าเป็นรูปแบบ DD-MM-YYYY หรือไม่
    IF date_part IS NULL OR date_part = '' THEN
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
        
        -- ตรวจสอบว่าเป็นวันที่ที่ถูกต้องหรือไม่
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

-- Comments for functions
COMMENT ON FUNCTION update_updated_at_column IS 'Function สำหรับอัพเดท updated_at อัตโนมัติ';
COMMENT ON FUNCTION extract_date_from_code IS 'Function สำหรับดึงวันที่ซื้อจากรหัสทรัพย์สิน (รูปแบบ: PREFIX-RUNNING-DD-MM-YYYY)';

-- ================================================================================
-- 8. TRIGGERS
-- ================================================================================

-- 8.1 Trigger for users.updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8.2 Trigger for categories.updated_at
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8.3 Trigger for assets.updated_at
DROP TRIGGER IF EXISTS update_assets_updated_at ON assets;
CREATE TRIGGER update_assets_updated_at
    BEFORE UPDATE ON assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8.4 Trigger for settings.updated_at
DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8.5 Trigger for inventory_cycles.updated_at
DROP TRIGGER IF EXISTS update_inventory_cycles_updated_at ON inventory_cycles;
CREATE TRIGGER update_inventory_cycles_updated_at
    BEFORE UPDATE ON inventory_cycles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8.6 Trigger for inventory_counts.updated_at
DROP TRIGGER IF EXISTS update_inventory_counts_updated_at ON inventory_counts;
CREATE TRIGGER update_inventory_counts_updated_at
    BEFORE UPDATE ON inventory_counts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================================================
-- 9. CONSTRAINTS
-- ================================================================================

-- Ensure prefix uniqueness in categories (constraint already exists from UNIQUE in CREATE TABLE)
-- If needed, can add explicit constraint:
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'categories_prefix_unique'
    ) THEN
        ALTER TABLE categories ADD CONSTRAINT categories_prefix_unique UNIQUE (prefix);
    END IF;
END $$;

-- Ensure code uniqueness in assets (constraint already exists from UNIQUE in CREATE TABLE)
-- If needed, can add explicit constraint:
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'assets_code_unique'
    ) THEN
        ALTER TABLE assets ADD CONSTRAINT assets_code_unique UNIQUE (code);
    END IF;
END $$;

-- ================================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES FOR SUPABASE
-- ================================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_counts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_assignments ENABLE ROW LEVEL SECURITY;

-- ================================================================================
-- 10.1 USERS TABLE POLICIES
-- ================================================================================

-- Policy: Allow public read access to users (for login/display)
DROP POLICY IF EXISTS "Users are viewable by everyone" ON users;
CREATE POLICY "Users are viewable by everyone"
ON users FOR SELECT
USING (true);

-- Policy: Allow authenticated users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (true); -- Simplified: allow all authenticated updates (adjust based on your auth system)

-- Policy: Allow insert for new users (adjust based on your auth system)
DROP POLICY IF EXISTS "Users can insert" ON users;
CREATE POLICY "Users can insert"
ON users FOR INSERT
WITH CHECK (true); -- Simplified: allow all inserts (adjust based on your auth system)

-- ================================================================================
-- 10.2 CATEGORIES TABLE POLICIES
-- ================================================================================

-- Policy: Allow public read access to categories
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
CREATE POLICY "Categories are viewable by everyone"
ON categories FOR SELECT
USING (true);

-- Policy: Allow authenticated users to insert categories
DROP POLICY IF EXISTS "Authenticated users can insert categories" ON categories;
CREATE POLICY "Authenticated users can insert categories"
ON categories FOR INSERT
WITH CHECK (true); -- Adjust based on your role-based access control

-- Policy: Allow authenticated users to update categories
DROP POLICY IF EXISTS "Authenticated users can update categories" ON categories;
CREATE POLICY "Authenticated users can update categories"
ON categories FOR UPDATE
USING (true); -- Adjust based on your role-based access control

-- Policy: Allow authenticated users to delete categories
DROP POLICY IF EXISTS "Authenticated users can delete categories" ON categories;
CREATE POLICY "Authenticated users can delete categories"
ON categories FOR DELETE
USING (true); -- Adjust based on your role-based access control

-- ================================================================================
-- 10.3 ASSETS TABLE POLICIES
-- ================================================================================

-- Policy: Allow public read access to assets
DROP POLICY IF EXISTS "Assets are viewable by everyone" ON assets;
CREATE POLICY "Assets are viewable by everyone"
ON assets FOR SELECT
USING (true);

-- Policy: Allow authenticated users to insert assets
DROP POLICY IF EXISTS "Authenticated users can insert assets" ON assets;
CREATE POLICY "Authenticated users can insert assets"
ON assets FOR INSERT
WITH CHECK (true); -- Adjust based on your role-based access control

-- Policy: Allow authenticated users to update assets
DROP POLICY IF EXISTS "Authenticated users can update assets" ON assets;
CREATE POLICY "Authenticated users can update assets"
ON assets FOR UPDATE
USING (true); -- Adjust based on your role-based access control

-- Policy: Allow authenticated users to delete assets
DROP POLICY IF EXISTS "Authenticated users can delete assets" ON assets;
CREATE POLICY "Authenticated users can delete assets"
ON assets FOR DELETE
USING (true); -- Adjust based on your role-based access control

-- ================================================================================
-- 10.4 AUDIT LOGS TABLE POLICIES
-- ================================================================================

-- Policy: Allow public read access to audit logs
DROP POLICY IF EXISTS "Audit logs are viewable by everyone" ON audit_logs;
CREATE POLICY "Audit logs are viewable by everyone"
ON audit_logs FOR SELECT
USING (true);

-- Policy: Allow authenticated users to insert audit logs
DROP POLICY IF EXISTS "Authenticated users can insert audit logs" ON audit_logs;
CREATE POLICY "Authenticated users can insert audit logs"
ON audit_logs FOR INSERT
WITH CHECK (true);

-- ================================================================================
-- 10.5 SETTINGS TABLE POLICIES
-- ================================================================================

-- Policy: Allow public read access to settings
DROP POLICY IF EXISTS "Settings are viewable by everyone" ON settings;
CREATE POLICY "Settings are viewable by everyone"
ON settings FOR SELECT
USING (true);

-- Policy: Allow authenticated users to insert settings
DROP POLICY IF EXISTS "Authenticated users can insert settings" ON settings;
CREATE POLICY "Authenticated users can insert settings"
ON settings FOR INSERT
WITH CHECK (true); -- Adjust based on your role-based access control

-- Policy: Allow authenticated users to update settings
DROP POLICY IF EXISTS "Authenticated users can update settings" ON settings;
CREATE POLICY "Authenticated users can update settings"
ON settings FOR UPDATE
USING (true); -- Adjust based on your role-based access control

-- ================================================================================
-- 10.6 INVENTORY TABLES POLICIES
-- ================================================================================

-- Inventory Cycles
DROP POLICY IF EXISTS "Inventory cycles are viewable by everyone" ON inventory_cycles;
CREATE POLICY "Inventory cycles are viewable by everyone"
ON inventory_cycles FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage inventory cycles" ON inventory_cycles;
CREATE POLICY "Authenticated users can manage inventory cycles"
ON inventory_cycles FOR ALL
USING (true)
WITH CHECK (true);

-- Inventory Counts
DROP POLICY IF EXISTS "Inventory counts are viewable by everyone" ON inventory_counts;
CREATE POLICY "Inventory counts are viewable by everyone"
ON inventory_counts FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage inventory counts" ON inventory_counts;
CREATE POLICY "Authenticated users can manage inventory counts"
ON inventory_counts FOR ALL
USING (true)
WITH CHECK (true);

-- Inventory Assignments
DROP POLICY IF EXISTS "Inventory assignments are viewable by everyone" ON inventory_assignments;
CREATE POLICY "Inventory assignments are viewable by everyone"
ON inventory_assignments FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage inventory assignments" ON inventory_assignments;
CREATE POLICY "Authenticated users can manage inventory assignments"
ON inventory_assignments FOR ALL
USING (true)
WITH CHECK (true);

-- ================================================================================
-- 11. SUPABASE STORAGE POLICIES
-- ================================================================================
-- 
-- หมายเหตุ: Storage bucket ต้องสร้างผ่าน Supabase Dashboard หรือ Management API
-- Bucket name: 'asset-images'
-- 
-- สำหรับ Public bucket: ใช้ policies ด้านล่าง
-- สำหรับ Private bucket: ปรับ policies ตามความต้องการ
-- ================================================================================

-- Policy 1: Public Read Access (สำหรับ Public bucket)
DROP POLICY IF EXISTS "Public can read asset images" ON storage.objects;
CREATE POLICY "Public can read asset images"
ON storage.objects FOR SELECT
USING (bucket_id = 'asset-images');

-- Policy 2: Public Upload (สำหรับ Public bucket)
DROP POLICY IF EXISTS "Public can upload asset images" ON storage.objects;
CREATE POLICY "Public can upload asset images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'asset-images');

-- Policy 3: Public Update
DROP POLICY IF EXISTS "Public can update asset images" ON storage.objects;
CREATE POLICY "Public can update asset images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'asset-images');

-- Policy 4: Public Delete
DROP POLICY IF EXISTS "Public can delete asset images" ON storage.objects;
CREATE POLICY "Public can delete asset images"
ON storage.objects FOR DELETE
USING (bucket_id = 'asset-images');

-- ================================================================================
-- หมายเหตุสำหรับ Storage Policies:
-- ================================================================================
-- 
-- ถ้าต้องการให้เป็น Private bucket (ต้อง login ก่อน):
-- - เปลี่ยน Policy 2-4 ให้ใช้ auth.role() = 'authenticated'
-- - ดูตัวอย่างใน storage_policies.sql
-- 
-- ตัวอย่างสำหรับ Private bucket:
-- CREATE POLICY "Authenticated users can upload"
-- ON storage.objects FOR INSERT
-- WITH CHECK (
--   bucket_id = 'asset-images' 
--   AND auth.role() = 'authenticated'
-- );
-- 
-- ================================================================================

-- ================================================================================
-- 12. GRANT PERMISSIONS (Optional - for service role)
-- ================================================================================
-- 
-- หมายเหตุ: Supabase จัดการ permissions อัตโนมัติผ่าน RLS
-- แต่ถ้าต้องการให้ service role เข้าถึงได้โดยตรง (bypass RLS):
-- 
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
-- 
-- ================================================================================

-- ================================================================================
-- END OF SCHEMA
-- ================================================================================

