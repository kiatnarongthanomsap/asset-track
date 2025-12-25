# 🚀 คู่มือการตั้งค่า Supabase สำหรับ AssetTrack

## 📋 ไฟล์ที่สร้างขึ้น

1. **`schema_supabase.sql`** - Schema สำหรับสร้างตาราง (PostgreSQL)
2. **`insert_statements_supabase.sql`** - คำสั่ง INSERT ข้อมูลหมวดหมู่และครุภัณฑ์
3. **`supabase_setup.sql`** - ไฟล์รวมสำหรับตั้งค่า Schema (แนะนำให้ใช้ไฟล์นี้)

## 🎯 วิธีการใช้งาน

### วิธีที่ 1: ใช้ Supabase Dashboard (แนะนำ)

1. **เปิด Supabase Dashboard**
   - เข้าไปที่ [https://app.supabase.com](https://app.supabase.com)
   - เลือกโปรเจกต์ของคุณ

2. **สร้าง Schema**
   - ไปที่ **SQL Editor** ในเมนูด้านซ้าย
   - คลิก **New Query**
   - คัดลอกเนื้อหาจากไฟล์ `supabase_setup.sql`
   - คลิก **Run** หรือกด `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

3. **เพิ่มข้อมูล**
   - สร้าง Query ใหม่
   - คัดลอกเนื้อหาจากไฟล์ `insert_statements_supabase.sql`
   - คลิก **Run**

### วิธีที่ 2: ใช้ Supabase CLI

```bash
# ติดตั้ง Supabase CLI (ถ้ายังไม่มี)
npm install -g supabase

# Login
supabase login

# Link โปรเจกต์
supabase link --project-ref your-project-ref

# รันไฟล์ SQL
supabase db execute -f supabase_setup.sql
supabase db execute -f insert_statements_supabase.sql
```

### วิธีที่ 3: ใช้ psql

```bash
# รับ Connection String จาก Supabase Dashboard
# Settings > Database > Connection string > URI

psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" < supabase_setup.sql
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" < insert_statements_supabase.sql
```

## 📊 สรุปการเปลี่ยนแปลงจาก MySQL

### 1. Data Types
- `AUTO_INCREMENT` → `SERIAL`
- `INT` → `INTEGER` (หรือใช้ `INT` ก็ได้)
- `DECIMAL` → `NUMERIC` (หรือใช้ `DECIMAL` ก็ได้)
- `TIMESTAMP` → `TIMESTAMP WITH TIME ZONE`

### 2. ENUM
- MySQL: `ENUM('Normal', 'Repair', 'Check', 'Disposed')`
- PostgreSQL: สร้าง `CREATE TYPE asset_status AS ENUM(...)`

### 3. Auto Update Timestamp
- MySQL: `ON UPDATE CURRENT_TIMESTAMP`
- PostgreSQL: ใช้ **Trigger** และ **Function**

### 4. Conflict Handling
- เพิ่ม `ON CONFLICT (column) DO NOTHING` สำหรับ INSERT statements
- ป้องกันการ insert ข้อมูลซ้ำ

### 5. Indexes
- Syntax เหมือนกัน แต่เพิ่ม `IF NOT EXISTS` เพื่อความปลอดภัย

## 🔍 ตรวจสอบผลลัพธ์

หลังจากรัน SQL แล้ว ตรวจสอบได้ที่:

1. **Table Editor** - ดูข้อมูลในตาราง
2. **SQL Editor** - รันคำสั่ง:

```sql
-- ตรวจสอบจำนวนหมวดหมู่
SELECT COUNT(*) FROM categories;

-- ตรวจสอบจำนวนครุภัณฑ์
SELECT COUNT(*) FROM assets;

-- ดูหมวดหมู่ทั้งหมด
SELECT * FROM categories ORDER BY name;

-- ดูครุภัณฑ์ 10 รายการแรก
SELECT code, name, category, status FROM assets LIMIT 10;
```

## 📝 ข้อมูลที่ถูกเพิ่ม

- **หมวดหมู่ (Categories):** 24 หมวด
- **ครุภัณฑ์ (Assets):** 673 รายการ
- **ผู้ใช้ (Users):** 1 รายการ (admin/123456)

## 🔐 Row Level Security (RLS)

ไฟล์ `schema_supabase.sql` มีคำสั่ง RLS ที่ถูก comment ไว้ หากต้องการเปิดใช้งาน:

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
```

**หมายเหตุ:** ต้องสร้าง Policies ก่อนใช้งาน RLS

## 🛠️ Troubleshooting

### ปัญหา: "type asset_status does not exist"
**วิธีแก้:** รัน `CREATE TYPE asset_status AS ENUM(...)` ก่อนสร้างตาราง assets

### ปัญหา: "relation already exists"
**วิธีแก้:** ใช้ `CREATE TABLE IF NOT EXISTS` หรือลบตารางเก่าก่อน:
```sql
DROP TABLE IF EXISTS assets CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TYPE IF EXISTS asset_status CASCADE;
```

### ปัญหา: "duplicate key value violates unique constraint"
**วิธีแก้:** ไฟล์ `insert_statements_supabase.sql` มี `ON CONFLICT DO NOTHING` อยู่แล้ว ไม่ควรเกิดปัญหานี้

## 📚 เอกสารเพิ่มเติม

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase SQL Editor Guide](https://supabase.com/docs/guides/database/tables)

---

**อัพเดทล่าสุด:** 24 ธันวาคม 2568

