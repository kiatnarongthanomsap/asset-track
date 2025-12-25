-- ================================================================================
-- Storage Policies for PUBLIC bucket 'asset-images'
-- ================================================================================
-- 
-- ไฟล์นี้สำหรับ Public bucket ที่ต้องการให้ทุกคนสามารถอัพโหลดได้
-- รันไฟล์นี้ใน Supabase SQL Editor
-- ================================================================================

-- Policy 1: Public Read Access
-- อนุญาตให้ทุกคนอ่านไฟล์ได้
DROP POLICY IF EXISTS "Public can read files" ON storage.objects;
CREATE POLICY "Public can read files"
ON storage.objects FOR SELECT
USING (bucket_id = 'asset-images');

-- Policy 2: Public Upload (สำหรับ Public bucket)
-- อนุญาตให้ทุกคนอัพโหลดไฟล์ได้ (ใช้ anon key)
DROP POLICY IF EXISTS "Public can upload files" ON storage.objects;
CREATE POLICY "Public can upload files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'asset-images');

-- Policy 3: Public Update
-- อนุญาตให้ทุกคนอัพเดตไฟล์ได้
DROP POLICY IF EXISTS "Public can update files" ON storage.objects;
CREATE POLICY "Public can update files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'asset-images');

-- Policy 4: Public Delete
-- อนุญาตให้ทุกคนลบไฟล์ได้
DROP POLICY IF EXISTS "Public can delete files" ON storage.objects;
CREATE POLICY "Public can delete files"
ON storage.objects FOR DELETE
USING (bucket_id = 'asset-images');

-- ================================================================================
-- หมายเหตุ:
-- - Policies เหล่านี้ใช้สำหรับ Public bucket
-- - อนุญาตให้ทุกคน (รวมถึง anon users) อัพโหลด/ลบได้
-- - สำหรับ production อาจต้องการปรับแต่งให้ปลอดภัยกว่า
-- ================================================================================

-- ตรวจสอบ policies ที่สร้างแล้ว
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%asset-images%';

