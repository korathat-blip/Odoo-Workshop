# Odoo ERP Workshop — Web Application

เว็บแอปสำหรับอบรม **Odoo ERP Cloud Base** พร้อมระบบล็อกอินด้วย Google,
ฐานข้อมูลเก็บความคืบหน้ารายบุคคล และระบบหลังบ้านสำหรับผู้ดูแล

- **Frontend / Hosting:** Next.js (App Router) → Vercel
- **Database / Auth:** Supabase (PostgreSQL + Supabase Auth + Google OAuth + RLS)

## ฟีเจอร์

- เข้าสู่ระบบด้วย Google Account
- กรอก **ชื่อ-นามสกุล** และเลือก **รุ่น** (Odoo รุ่นที่ 1 / รุ่นที่ 2)
- ทำ Workshop 14 บทหลัก + 4 บทโบนัส โดยความคืบหน้าถูกบันทึกลงฐานข้อมูล
- เมื่อทำครบ **14 บทหลัก** จะแสดงข้อความ
  _“คุณได้ผ่านการอบรมพื้นฐาน Odoo ERP Cloud Base แล้ว”_
- ระบบหลังบ้าน (`/admin`) ให้ผู้ดูแลเห็นความคืบหน้าของผู้อบรมทุกคน

---

## 1) ตั้งค่า Supabase

1. สร้างโปรเจกต์ที่ [supabase.com](https://supabase.com) → **New project**
2. ไปที่ **SQL Editor → New query** วางเนื้อหาไฟล์ [`supabase/schema.sql`](supabase/schema.sql) แล้วกด **Run**
   (สร้างตาราง `profiles`, `progress`, RLS, trigger และตั้งอีเมล `korathat789@gmail.com` เป็น admin อัตโนมัติ)
3. ตั้งค่า **Google OAuth**:
   - **Authentication → Providers → Google** → เปิดใช้งาน
   - สร้าง OAuth Client ID ที่ [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
     - **Authorized redirect URI** = `https://<PROJECT-REF>.supabase.co/auth/v1/callback`
       (ดู URL ได้จากหน้า Provider ใน Supabase)
   - นำ **Client ID / Client Secret** มาใส่ในหน้า Provider แล้ว Save
4. **Authentication → URL Configuration**:
   - **Site URL** = `http://localhost:3000` (ตอนพัฒนา) — เปลี่ยนเป็น URL Vercel เมื่อ deploy
   - **Redirect URLs** เพิ่ม: `http://localhost:3000/auth/callback` และ
     `https://<your-app>.vercel.app/auth/callback`
5. คัดลอกค่าจาก **Project Settings → API**: `Project URL` และ `anon public key`

> เพิ่ม admin คนอื่นได้ด้วย SQL:
> `update public.profiles set role='admin' where email='someone@gmail.com';`

## 2) รันบนเครื่อง (Local)

```bash
npm install
cp .env.local.example .env.local   # แล้วกรอกค่า Supabase
npm run dev
```

`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT-REF>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-public-key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

เปิด http://localhost:3000

## 3) Deploy บน Vercel

1. push โค้ดขึ้น GitHub แล้ว **Import** repo ใน [vercel.com](https://vercel.com)
2. ใส่ **Environment Variables** (เหมือน `.env.local` แต่ `NEXT_PUBLIC_SITE_URL` เป็น URL ของ Vercel)
3. Deploy
4. กลับไปที่ Supabase → **URL Configuration** เพิ่ม Site URL / Redirect URL ของ Vercel
   และที่ Google Cloud Console ตรวจสอบ redirect URI ให้ครบ

---

## โครงสร้างโปรเจกต์

```
src/
├─ app/
│  ├─ login/             หน้าเข้าสู่ระบบด้วย Google
│  ├─ auth/callback/     แลก OAuth code เป็น session
│  ├─ onboarding/        กรอกชื่อ-นามสกุล + เลือกรุ่น
│  ├─ workshop/          เนื้อหา Workshop + บันทึกความคืบหน้า
│  ├─ admin/             ระบบหลังบ้าน (เฉพาะ admin)
│  └─ page.tsx           จุดเข้า — redirect ตามสถานะผู้ใช้
├─ components/SignOutButton.tsx
└─ lib/
   ├─ steps.ts           ข้อมูลบทเรียนทั้งหมด + เกณฑ์ผ่าน
   └─ supabase/          client / server / middleware helpers
supabase/schema.sql      สคีมาฐานข้อมูล + RLS (รันใน Supabase)
middleware.ts            ตรวจ session + ป้องกันเส้นทาง
```

## เกณฑ์ผ่านการอบรม

ทำเครื่องหมาย “เสร็จสิ้น” ครบ **14 บทหลัก** (id 0–13, ไม่รวม Bonus)
ดูได้ที่ `MAIN_STEP_IDS` / `hasGraduated()` ใน [`src/lib/steps.ts`](src/lib/steps.ts)
