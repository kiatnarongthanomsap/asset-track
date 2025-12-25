-- ================================================================================
-- Storage Policies for asset-images bucket
-- ================================================================================
-- 
-- รันไฟล์นี้หลังจากสร้าง bucket 'asset-images' แล้ว
-- สำหรับ Private bucket เท่านั้น (Public bucket ไม่ต้องตั้งค่า policies)
-- ================================================================================

-- Policy 1: Public Read Access
-- อนุญาตให้ทุกคนอ่านไฟล์ได้
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'asset-images');

-- Policy 2: Authenticated Upload
-- อนุญาตให้ผู้ใช้ที่ login แล้วอัพโหลดไฟล์ได้
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'asset-images' 
  AND auth.role() = 'authenticated'
);

-- Policy 3: Authenticated Update
-- อนุญาตให้ผู้ใช้ที่ login แล้วอัพเดตไฟล์ได้
DROP POLICY IF EXISTS "Users can update own files" ON storage.objects;
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'asset-images' 
  AND auth.role() = 'authenticated'
);

-- Policy 4: Authenticated Delete
-- อนุญาตให้ผู้ใช้ที่ login แล้วลบไฟล์ได้
DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'asset-images' 
  AND auth.role() = 'authenticated'
);

-- ================================================================================
-- หมายเหตุ:
-- - ถ้าใช้ Public bucket ไม่ต้องรันไฟล์นี้
-- - Policies เหล่านี้ใช้สำหรับ Private bucket
-- - สำหรับ production ควรปรับแต่ง policies ให้เหมาะสมกับความต้องการ
-- ================================================================================

-- ตรวจสอบ policies
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%asset-images%';

