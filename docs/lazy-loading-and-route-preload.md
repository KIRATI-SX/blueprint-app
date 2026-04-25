# Route Lazy Loading + Preload (React + Vite)

เอกสารนี้อธิบายสิ่งที่ทำในโปรเจกต์เพื่อให้โหลดหน้าแรกเร็วขึ้น และยังคงความเร็วตอนเปลี่ยนหน้า

## สิ่งที่ทำไปแล้ว

1. แปลงหน้า route ใน `App.tsx` เป็น `React.lazy(...)`
2. ครอบ `Routes` ด้วย `Suspense` เพื่อแสดง fallback ระหว่างโหลด chunk
3. สร้าง route loader กลางที่ `src/app/route-preload.ts`
4. เพิ่ม `preloadRoute(path)` พร้อม cache เพื่อ preload route สำคัญล่วงหน้า
5. ผูก preload กับลิงก์สำคัญผ่าน `onMouseEnter`, `onFocus`, `onTouchStart`

## หลักการทำงาน

### 1) Lazy loading ลด initial bundle

ก่อนทำ lazy loading:
- หน้า route หลายหน้าโดน bundle มาพร้อมกันตั้งแต่โหลดครั้งแรก
- ผู้ใช้ยังไม่ไปหน้าเหล่านั้น แต่ต้องแบกรับขนาดไฟล์ไว้ก่อน

หลังทำ lazy loading:
- แต่ละหน้า route แยกเป็น chunk ของตัวเอง
- ดาวน์โหลดเฉพาะตอนผู้ใช้ navigate ไปหน้านั้นจริง

### 2) Suspense จัดการช่วงรอโหลด

เมื่อผู้ใช้กดไปหน้าที่ chunk ยังไม่ถูกโหลด:
- React จะ render fallback จาก `Suspense`
- พอ chunk มาแล้วจึงสลับเป็นหน้าเป้าหมาย

### 3) Preload ช่วยให้เปลี่ยนหน้าเร็วขึ้น

แม้ lazy loading จะดีต่อหน้าแรก แต่การเปลี่ยนหน้าครั้งแรกอาจมีดีเลย์เล็กน้อย  
จึงเพิ่ม preload เพื่อดาวน์โหลด chunk ล่วงหน้าในจังหวะที่ "ผู้ใช้มีแนวโน้มจะกดลิงก์"

- `onMouseEnter`: เมาส์ hover ลิงก์ (desktop)
- `onFocus`: โฟกัสลิงก์ด้วยคีย์บอร์ด (accessibility)
- `onTouchStart`: เริ่มแตะบนมือถือ

## ตัวอย่างโค้ดพร้อมคำอธิบาย

### A) `App.tsx` ใช้ lazy + Suspense

```tsx
import { lazy, Suspense } from "react"
import {
  loadLandingPage,
  loadLoginPage,
  loadSignUpPage,
} from "@/app/route-preload"

const LandingPage = lazy(loadLandingPage)
const LoginPage = lazy(loadLoginPage)
const SignUpPage = lazy(loadSignUpPage)

export default function App() {
  return (
    <Suspense fallback={<section aria-live="polite">Loading page...</section>}>
      {/* Routes... */}
    </Suspense>
  )
}
```

คำอธิบาย:
- `lazy(loadXxxPage)` บอก React ให้โหลด component แบบ dynamic import
- fallback ใน `Suspense` คือ UI ชั่วคราวระหว่างรอโหลด chunk
- ใช้ `<section>` เพื่อคง semantic HTML

### B) `route-preload.ts` รวม loader + cache

```ts
export const loadLoginPage = () => import("@/pages/LoginPage")

const routeLoaderByPath = {
  "/login": loadLoginPage,
}

const preloadCache = new Map()

export function preloadRoute(path: string) {
  const loader = routeLoaderByPath[path]
  if (!loader) return

  const hit = preloadCache.get(path)
  if (hit) return hit

  const next = loader()
  preloadCache.set(path, next)
  return next
}
```

คำอธิบาย:
- map path -> loader ทำให้ preload ตาม URL ได้ง่าย
- cache กันการยิงโหลดซ้ำ route เดิม
- ใช้ loader เดียวกับ `lazy` ทำให้โค้ดส่วน route กับ preload สอดคล้องกัน

### C) Preload บน Link

```tsx
<Link
  to="/login"
  onMouseEnter={() => preloadRoute("/login")}
  onFocus={() => preloadRoute("/login")}
  onTouchStart={() => preloadRoute("/login")}
>
  Log in
</Link>
```

คำอธิบาย:
- preload ตอนผู้ใช้ "กำลังจะคลิก" จึงไม่ต้องโหลดทุก route ทิ้งไว้ล่วงหน้า
- ครอบคลุม desktop + keyboard + touch

## ไฟล์ที่เกี่ยวข้องในงานนี้

- `src/App.tsx`
- `src/app/route-preload.ts`
- `src/components/layout/nav-bar/NavBar.tsx`
- `src/components/layout/nav-bar/NavBarGuestAuthLinks.tsx`
- `src/features/account-settings/components/AccountSettingsSidebar.tsx`

## ผลลัพธ์ที่ตรวจสอบแล้ว

- `npm run lint` ผ่าน
- `npm run build` ผ่าน
- route ถูกแยกเป็นหลาย chunk (เช่น `LoginPage-*.js`, `ProfilePage-*.js`)

## ทำแล้วดีกว่าไม่ทำอย่างไร

1. หน้าแรกโหลดไวขึ้น  
   เพราะไม่ต้องดาวน์โหลดโค้ดทุกหน้าตั้งแต่แรก

2. Time-to-interactive ดีขึ้น  
   bundle แรกเล็กลง จึง parse/execute เร็วขึ้น

3. ประสบการณ์เปลี่ยนหน้าดีขึ้น  
   preload บน hover/focus/touch ช่วยลดการรอในคลิกแรก

4. ประหยัด bandwidth สำหรับผู้ใช้  
   โหลดเฉพาะสิ่งที่ใช้จริง แทนการโหลดทั้งหมด

5. scale ได้ดีกว่าเมื่อแอปโตขึ้น  
   ยิ่งจำนวนหน้าเยอะ ยิ่งเห็นประโยชน์ของ route splitting + preload ชัดเจน
