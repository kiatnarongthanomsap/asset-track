# 🔧 แก้ไขปัญหา Storage Permissions

## ⚠️ Error: "Permission denied"

หากคุณเห็น error นี้ หมายความว่า bucket มีอยู่แล้ว แต่ไม่มี policies ที่ถูกต้องสำหรับการอัพโหลด

## 🚀 วิธีแก้ไข (Quick Fix)

### สำหรับ Public Bucket (แนะนำ)

1. เปิด **Supabase Dashboard** → **SQL Editor**

2. รันไฟล์ `storage_policies_public.sql` หรือคัดลอกคำสั่งนี้:

```sql
-- Policy 1: Public Read Access
DROP POLICY IF EXISTS "Public can read files" ON storage.objects;
CREATE POLICY "Public can read files"
ON storage.objects FOR SELECT
USING (bucket_id = 'asset-images');

-- Policy 2: Public Upload
DROP POLICY IF EXISTS "Public can upload files" ON storage.objects;
CREATE POLICY "Public can upload files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'asset-images');

-- Policy 3: Public Update
DROP POLICY IF EXISTS "Public can update files" ON storage.objects;
CREATE POLICY "Public can update files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'asset-images');

-- Policy 4: Public Delete
DROP POLICY IF EXISTS "Public can delete files" ON storage.objects;
CREATE POLICY "Public can delete files"
ON storage.objects FOR DELETE
USING (bucket_id = 'asset-images');
```

3. คลิก **Run** หรือกด `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

4. กลับไปที่แอปและลองอัพโหลดรูปภาพอีกครั้ง

### สำหรับ Private Bucket

1. รันไฟล์ `storage_policies.sql` ใน SQL Editor
2. Policies จะอนุญาตเฉพาะ authenticated users

## 🔍 ตรวจสอบ Bucket Type

### วิธีตรวจสอบว่า Bucket เป็น Public หรือ Private:

1. ไปที่ **Storage** → **Buckets**
2. ดูที่ bucket `asset-images`
3. ดูว่ามี tag **PUBLIC** หรือไม่

## 📋 วิธีตั้งค่า Policies ผ่าน Dashboard

### 1. ไปที่ Storage Policies

1. เปิด **Supabase Dashboard**
2. ไปที่ **Storage** → **Policies**
3. เลือก bucket `asset-images`

### 2. สร้าง Policies

#### Policy 1: SELECT (Read)
- **Policy name:** `Public can read files`
- **Allowed operation:** `SELECT`
- **Policy definition:**
  ```sql
  bucket_id = 'asset-images'
  ```

#### Policy 2: INSERT (Upload)
- **Policy name:** `Public can upload files`
- **Allowed operation:** `INSERT`
- **Policy definition:**
  ```sql
  bucket_id = 'asset-images'
  ```

#### Policy 3: UPDATE
- **Policy name:** `Public can update files`
- **Allowed operation:** `UPDATE`
- **Policy definition:**
  ```sql
  bucket_id = 'asset-images'
  ```

#### Policy 4: DELETE
- **Policy name:** `Public can delete files`
- **Allowed operation:** `DELETE`
- **Policy definition:**
  ```sql
  bucket_id = 'asset-images'
  ```

## ✅ ตรวจสอบผลลัพธ์

หลังจากรัน policies แล้ว:

1. ตรวจสอบว่า policies ถูกสร้างแล้ว:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'objects' 
   AND policyname LIKE '%asset-images%';
   ```

2. ลองอัพโหลดรูปภาพในแอปอีกครั้ง

## 🐛 Troubleshooting

### ปัญหา: "Policy already exists"
**วิธีแก้:** ไม่เป็นไร policies ถูกสร้างแล้ว ไม่ต้องทำอะไร

### ปัญหา: "Permission denied" ยังอยู่
**วิธีแก้:**
1. ตรวจสอบว่า policies ถูกสร้างแล้ว
2. Refresh หน้าเว็บ
3. ตรวจสอบว่า bucket เป็น Public หรือ Private
4. ตรวจสอบว่าใช้ anon key หรือ service role key

### ปัญหา: "Cannot create policy"
**วิธีแก้:**
1. ตรวจสอบว่า bucket `asset-images` มีอยู่จริง
2. ตรวจสอบว่าใช้ SQL Editor ที่ถูกต้อง
3. ลองสร้าง policies ผ่าน Dashboard แทน

## 🔒 Security Note

**สำหรับ Production:**
- ควรใช้ Private bucket
- ตั้งค่า policies ที่จำกัดเฉพาะ authenticated users
- ใช้ service role key สำหรับ operations ที่ต้องการสิทธิ์สูง

**สำหรับ Development:**
- ใช้ Public bucket + Public policies (ตามไฟล์ `storage_policies_public.sql`)
- ง่ายต่อการพัฒนาและทดสอบ

---

**อัพเดทล่าสุด:** 24 ธันวาคม 2568

