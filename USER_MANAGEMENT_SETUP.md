# คู่มือการตั้งค่าระบบผู้ใช้งานและสิทธิ์การเข้าถึง

## ภาพรวม

ระบบผู้ใช้งานและสิทธิ์การเข้าถึงได้รับการปรับปรุงให้สมบูรณ์และเชื่อมต่อกับ Supabase แล้ว

## การติดตั้ง

### 1. รัน Migration Script

รัน SQL script ต่อไปนี้ใน Supabase SQL Editor:

```sql
-- ไฟล์: migration_update_users_table.sql
```

Script นี้จะ:
- เพิ่ม columns: `email`, `status`, `updated_at` ในตาราง `users`
- สร้าง trigger สำหรับอัพเดท `updated_at` อัตโนมัติ
- สร้าง indexes สำหรับการค้นหาที่เร็วขึ้น
- เพิ่มผู้ใช้เริ่มต้น (admin, manager, staff, viewer)

### 2. ตรวจสอบ Schema

หลังจากรัน migration แล้ว ตรวจสอบว่า schema ถูกต้อง:

```sql
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;
```

ควรมี columns:
- `id` (SERIAL PRIMARY KEY)
- `username` (VARCHAR(50) UNIQUE)
- `password` (VARCHAR(255))
- `name` (VARCHAR(100))
- `email` (VARCHAR(255))
- `role` (VARCHAR(50) DEFAULT 'Viewer')
- `status` (VARCHAR(20) DEFAULT 'Active')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## ระดับสิทธิ์ (Roles)

### Admin
- **สิทธิ์**: `manage_assets`, `manage_users`, `view_reports`, `settings`, `delete_assets`, `import_assets`
- **คำอธิบาย**: เข้าถึงได้ทุกส่วนของระบบ

### Manager
- **สิทธิ์**: `manage_assets`, `view_reports`, `import_assets`
- **คำอธิบาย**: จัดการทรัพย์สิน ดูรายงาน และนำเข้าข้อมูล

### Staff
- **สิทธิ์**: `manage_assets`, `view_reports`
- **คำอธิบาย**: จัดการทรัพย์สินและดูรายงาน

### Viewer
- **สิทธิ์**: `view_reports`
- **คำอธิบาย**: ดูข้อมูลได้อย่างเดียว

## ผู้ใช้เริ่มต้น

หลังจากรัน migration จะมีผู้ใช้เริ่มต้นดังนี้:

| Username | Password | Role | Status |
|----------|----------|------|--------|
| admin | 123456 | Admin | Active |
| manager | 123456 | Manager | Active |
| staff | 123456 | Staff | Active |
| viewer | 123456 | Viewer | Active |

**⚠️ ควรเปลี่ยนรหัสผ่านทันทีหลังจากติดตั้ง**

## การใช้งาน

### 1. เข้าสู่ระบบ

ใช้ username และ password ที่สร้างไว้ในขั้นตอน migration

### 2. จัดการผู้ใช้

1. ไปที่ **ตั้งค่าระบบ** > **ผู้ใช้งานและสิทธิ์**
2. คลิก **เพิ่มผู้ใช้ใหม่** เพื่อสร้างผู้ใช้ใหม่
3. ใช้ปุ่ม **แก้ไข** เพื่อแก้ไขข้อมูลผู้ใช้
4. ใช้ปุ่ม **ลบ** เพื่อลบผู้ใช้ (ไม่สามารถลบบัญชีตัวเองได้)

### 3. การตรวจสอบสิทธิ์

ระบบจะตรวจสอบสิทธิ์อัตโนมัติใน:
- การเพิ่ม/แก้ไข/ลบทรัพย์สิน
- การนำเข้าข้อมูลจาก Excel
- การเข้าถึงการตั้งค่าระบบ
- การจัดการผู้ใช้

## ฟังก์ชันที่ใช้

### supabaseService.js

- `fetchUsers()` - ดึงรายการผู้ใช้ทั้งหมด
- `saveUser(user)` - บันทึก/อัพเดทผู้ใช้
- `deleteUser(userId)` - ลบผู้ใช้
- `hasPermission(user, permission)` - ตรวจสอบสิทธิ์
- `canManageUsers(user)` - ตรวจสอบสิทธิ์จัดการผู้ใช้
- `canManageAssets(user)` - ตรวจสอบสิทธิ์จัดการทรัพย์สิน
- `canDeleteAssets(user)` - ตรวจสอบสิทธิ์ลบทรัพย์สิน
- `canImportAssets(user)` - ตรวจสอบสิทธิ์นำเข้าข้อมูล
- `canAccessSettings(user)` - ตรวจสอบสิทธิ์เข้าถึงการตั้งค่า

## Security Notes

⚠️ **หมายเหตุสำคัญ**:
- รหัสผ่านปัจจุบันเก็บเป็น plain text (ควรเข้ารหัสในอนาคต)
- ควรใช้ Supabase Auth หรือระบบ authentication ที่ปลอดภัยกว่า
- ควรตั้งค่า Row Level Security (RLS) ใน Supabase

## Troubleshooting

### ปัญหา: ไม่สามารถเข้าสู่ระบบได้

1. ตรวจสอบว่า migration script รันสำเร็จแล้ว
2. ตรวจสอบว่ามีผู้ใช้ในฐานข้อมูล
3. ตรวจสอบ username และ password

### ปัญหา: ไม่สามารถจัดการผู้ใช้ได้

1. ตรวจสอบว่า user ที่ล็อกอินมี role = 'Admin'
2. ตรวจสอบว่า `canManageUsers()` return true

### ปัญหา: ไม่สามารถเพิ่มทรัพย์สินได้

1. ตรวจสอบว่า user มี role = 'Admin', 'Manager', หรือ 'Staff'
2. ตรวจสอบว่า `canManageAssets()` return true

## Next Steps

1. ✅ รัน migration script
2. ✅ เปลี่ยนรหัสผ่านผู้ใช้เริ่มต้น
3. ✅ สร้างผู้ใช้ตามความต้องการ
4. ⚠️ พิจารณาเพิ่ม password hashing
5. ⚠️ พิจารณาเพิ่ม Row Level Security (RLS)

