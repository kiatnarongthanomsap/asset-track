# Next.js Migration Guide

## การเปลี่ยนแปลงที่ทำ

### 1. โครงสร้างโปรเจกต์
- เปลี่ยนจาก Vite + React เป็น Next.js 14 (App Router)
- สร้างโครงสร้าง `src/app/` สำหรับ Next.js pages
- ย้าย components ไปยัง `src/components/` (เดิมอยู่แล้ว)

### 2. ไฟล์ Config
- **next.config.js**: ตั้งค่า rewrites สำหรับ API proxy
- **jsconfig.json**: ตั้งค่า path aliases (`@/*`)
- **tailwind.config.js**: อัปเดต content paths สำหรับ Next.js
- **postcss.config.js**: เปลี่ยนเป็น CommonJS format
- **package.json**: อัปเดต scripts และ dependencies

### 3. Routing
- เปลี่ยนจาก state-based routing เป็น Next.js file-based routing:
  - `/` → Dashboard (หน้าแรก)
  - `/login` → หน้า Login
  - `/assets` → ทะเบียนทรัพย์สิน
  - `/inventory` → ตรวจนับครุภัณฑ์
  - `/reports` → รายงานธุรกรรม
  - `/settings` → ตั้งค่าระบบ

### 4. Components
- เพิ่ม `'use client'` directive ให้กับ components ที่ใช้ hooks
- แก้ไข import paths ให้ใช้ `@/` alias แทน relative paths
- สร้าง `Layout.jsx` component สำหรับ sidebar และ navigation

### 5. Environment Variables
- สร้าง `.env.local` สำหรับ Supabase credentials
- อัปเดต `src/config/supabase.js` ให้ใช้ environment variables

## การใช้งาน

### ติดตั้ง Dependencies
```bash
npm install
```

### รัน Development Server
```bash
npm run dev
```

### Build สำหรับ Production
```bash
npm run build
npm start
```

## สิ่งที่ต้องตรวจสอบ

1. **Authentication**: ใช้ localStorage สำหรับเก็บ user session (ควรพิจารณาใช้ cookies หรือ session storage ในอนาคต)
2. **API Routes**: ถ้ามี API endpoints เพิ่มเติม ให้สร้างใน `src/app/api/`
3. **Static Assets**: ไฟล์ static ให้วางใน `public/` directory
4. **Environment Variables**: ตรวจสอบว่า `.env.local` มีค่าถูกต้อง

## หมายเหตุ

- Components ทั้งหมดเป็น Client Components (ใช้ `'use client'`)
- ใช้ Next.js App Router (ไม่ใช่ Pages Router)
- Routing ใช้ file-based routing ตามโครงสร้างโฟลเดอร์

