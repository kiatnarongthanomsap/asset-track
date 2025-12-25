-- ================================================================================
-- Supabase Storage Setup for Asset Images
-- ================================================================================
-- 
-- คำแนะนำ:
-- 1. เปิด Supabase Dashboard → Storage
-- 2. สร้าง bucket ชื่อ "asset-images"
-- 3. ตั้งค่า Public access (ถ้าต้องการให้เข้าถึงได้โดยไม่ต้อง login)
-- 4. หรือรันคำสั่ง SQL นี้ใน SQL Editor
-- ================================================================================

-- สร้าง Storage Bucket (ถ้ายังไม่มี)
-- หมายเหตุ: Supabase ไม่รองรับการสร้าง bucket ผ่าน SQL
-- ต้องสร้างผ่าน Dashboard หรือใช้ Management API

-- ตั้งค่า Storage Policy สำหรับ Public Access
-- (ถ้าต้องการให้ทุกคนเข้าถึงได้)

-- Policy: Allow public read access
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'asset-images');

-- Policy: Allow authenticated users to upload
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'asset-images' 
  AND auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users to update their own files
DROP POLICY IF EXISTS "Users can update own files" ON storage.objects;
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'asset-images' 
  AND auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users to delete their own files
DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'asset-images' 
  AND auth.role() = 'authenticated'
);

-- ================================================================================
-- หมายเหตุ:
-- - ถ้าต้องการให้ทุกคนอัพโหลดได้ (ไม่ต้อง login) ให้ใช้ anon key
-- - สำหรับ production ควรตั้งค่า RLS policies ที่เหมาะสม
-- ================================================================================

