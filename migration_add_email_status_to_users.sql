-- ================================================================================
-- Migration: Add email and status columns to users table
-- ================================================================================
-- Description: เพิ่ม columns email และ status สำหรับจัดการผู้ใช้
-- Date: 2024
-- ================================================================================
-- IMPORTANT: Run this migration in your Supabase SQL Editor
-- ================================================================================

-- เพิ่ม email column (ถ้ายังไม่มี)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'users' 
        AND column_name = 'email'
    ) THEN
        ALTER TABLE users ADD COLUMN email VARCHAR(255);
        RAISE NOTICE 'Added email column to users table';
    ELSE
        RAISE NOTICE 'Email column already exists in users table';
    END IF;
END $$;

-- เพิ่ม status column (ถ้ายังไม่มี)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public'
        AND table_name = 'users' 
        AND column_name = 'status'
    ) THEN
        ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'Active';
        RAISE NOTICE 'Added status column to users table';
    ELSE
        RAISE NOTICE 'Status column already exists in users table';
    END IF;
END $$;

-- อัพเดท status ของผู้ใช้ที่มีอยู่แล้วให้เป็น 'Active' (ถ้ายังไม่มี)
UPDATE users 
SET status = 'Active' 
WHERE status IS NULL;

-- สร้าง index สำหรับ email (ถ้ายังไม่มี)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL;

-- สร้าง index สำหรับ status (ถ้ายังไม่มี)
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- ================================================================================
-- Verification
-- ================================================================================
-- ตรวจสอบว่า migration สำเร็จ
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'users'
ORDER BY ordinal_position;

