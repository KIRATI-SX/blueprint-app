# Account Settings Shared Layout (SoC Refactor)

ไฟล์นี้อธิบายแนวทางออกแบบหน้า `Profile` และ `Reset password` ให้ใช้โครงสร้างกลางร่วมกัน โดยยึดหลัก Separation of Concerns (SoC)

## เป้าหมาย

- ลดการเขียนซ้ำของ layout ที่เหมือนกัน
- แยกหน้าที่แต่ละส่วนให้ชัดเจน (layout, navigation, form)
- ทำให้การเพิ่มหน้าใหม่ในกลุ่ม account settings ทำได้ง่ายขึ้น

## โครงสร้างที่แยกตามหน้าที่ (SoC)

- `src/features/account-settings/components/AccountSettingsLayout.tsx`  
  รับผิดชอบโครงหน้าใหญ่: วาง `BlogPageLayout`, จัดตำแหน่ง sidebar + content และแสดง title ของหน้าปัจจุบัน

- `src/features/account-settings/components/AccountSettingsSidebar.tsx`  
  รับผิดชอบเมนูซ้าย: avatar, display name, ลิงก์ Profile/Reset password พร้อม active state

- `src/features/account-settings/profile/ProfileSettingsForm.tsx`  
  รับผิดชอบเฉพาะฟอร์ม Profile (name, username, email, upload, save)

- `src/features/account-settings/reset-password/ResetPasswordForm.tsx`  
  รับผิดชอบเฉพาะฟอร์ม Reset Password (current/new/confirm + submit)

- `src/pages/ProfilePage.tsx` และ `src/pages/ResetPasswordPage.tsx`  
  ทำหน้าที่เป็น page-level composition เท่านั้น (ประกอบ layout + form)

## ตัวอย่างการใช้งาน layout กลาง

```tsx
import {
  AccountSettingsLayout,
  ProfileSettingsForm,
} from "@/features/account-settings"

export default function ProfilePage() {
  return (
    <AccountSettingsLayout activeTab="profile" pageTitle="Profile">
      <ProfileSettingsForm />
    </AccountSettingsLayout>
  )
}
```

## Design Principles ที่ใช้

1. **Composition over duplication**  
   หน้าที่ที่โครงสร้างเหมือนกัน ใช้ shared layout ตัวเดียว แล้วเปลี่ยนแค่ `activeTab`, `pageTitle`, และ `children`

2. **Single responsibility ต่อคอมโพเนนต์**  
   แต่ละไฟล์มีหน้าที่เดียวชัดเจน ลด coupling และทำให้ test/maintain ง่าย

3. **Semantic HTML**  
   ใช้แท็กเชิงความหมาย เช่น `section`, `article`, `header`, `footer`, `nav`, `aside` เพื่อโครงสร้างที่อ่านง่ายและรองรับ accessibility ดีขึ้น

4. **Accessible media**  
   ใส่ `alt` ให้ `<img>` ทุกจุดเพื่อรองรับ screen readers และกรณีโหลดรูปไม่สำเร็จ

## แนวทางต่อยอด

- เพิ่ม model/hook สำหรับเชื่อม API (`useProfileForm`, `useResetPasswordForm`)
- เพิ่ม validation schema แยก concern ออกจาก UI (เช่น Zod/Yup)
- เพิ่ม test ราย component และ integration test ที่ระดับ page
