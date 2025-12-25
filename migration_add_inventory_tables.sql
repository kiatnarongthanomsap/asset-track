-- ================================================================================
-- Migration: Add Inventory Tables for Annual Asset Counting
-- Description: เพิ่มตารางสำหรับการตรวจนับครุภัณฑ์ประจำปี
-- ================================================================================

-- ================================================================================
-- 1. Inventory Cycles Table (รอบการตรวจนับ)
-- ================================================================================
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

-- ================================================================================
-- 2. Inventory Counts Table (บันทึกการตรวจนับแต่ละรายการ)
-- ================================================================================
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

-- ================================================================================
-- 3. Inventory Assignments Table (มอบหมายงานตรวจนับ)
-- ================================================================================
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

-- ================================================================================
-- Indexes for better performance
-- ================================================================================
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

-- ================================================================================
-- Trigger to update updated_at for inventory_cycles
-- ================================================================================
CREATE TRIGGER update_inventory_cycles_updated_at 
    BEFORE UPDATE ON inventory_cycles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_counts_updated_at 
    BEFORE UPDATE ON inventory_counts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ================================================================================
-- Comments for documentation
-- ================================================================================
COMMENT ON TABLE inventory_cycles IS 'รอบการตรวจนับครุภัณฑ์ประจำปี';
COMMENT ON TABLE inventory_counts IS 'บันทึกผลการตรวจนับแต่ละรายการ';
COMMENT ON TABLE inventory_assignments IS 'การมอบหมายงานตรวจนับให้ผู้ใช้';

COMMENT ON COLUMN inventory_cycles.status IS 'สถานะ: Planning, In Progress, Completed, Cancelled';
COMMENT ON COLUMN inventory_counts.counted_status IS 'สถานะการตรวจนับ: Found, Not Found, Damaged, Moved';
COMMENT ON COLUMN inventory_counts.location_match IS 'สถานที่ที่พบตรงกับระบบหรือไม่';
COMMENT ON COLUMN inventory_counts.requires_adjustment IS 'ต้องการการแก้ไขข้อมูลหรือไม่';
COMMENT ON COLUMN inventory_assignments.status IS 'สถานะการมอบหมาย: Pending, In Progress, Completed';

