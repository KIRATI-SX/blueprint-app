# Toast Component (shadcn/ui + sonner)

เอกสารนี้อธิบาย toast component ที่สร้างใหม่ โดยปรับดีไซน์ให้ใกล้เคียงภาพอ้างอิง และรองรับการใช้งานจริงผ่าน props

## ไฟล์ที่เพิ่ม

- `src/components/ui/sonner.tsx` - ตัว `Toaster` สำหรับวางใน root ของแอป
- `src/components/ui/toast.tsx` - helper `showToast` และ custom toast UI

## โครงสร้างหลัก

### 1) วาง Toaster ที่ root

ใน `App.tsx` มีการเพิ่ม:

```tsx
import { Toaster } from "@/components/ui/sonner"

// ...
<BrowserRouter>
  <Routes>{/* ... */}</Routes>
  <Toaster />
</BrowserRouter>
```

เพื่อให้ระบบ toast render ได้ทุกหน้า

### 2) เรียกใช้งานด้วย `showToast`

รองรับ 2 แบบหลัก:

- `showToast({ ... })` กำหนด `type` เอง
- `showToast.error({ ... })` และ `showToast.success({ ... })`

## Props ที่รองรับ

```ts
type AppToastType = "error" | "success"

type ShowToastOptions = {
  type?: AppToastType
  title: string
  description?: string
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
  duration?: number
  id?: string | number
  dismissible?: boolean
  closeButton?: boolean
  icon?: React.ReactNode
  className?: string
  important?: boolean
  action?: { label: string; onClick: () => void }
  cancel?: { label: string; onClick: () => void }
  onDismiss?: () => void
}
```

## ตัวอย่างการใช้งาน

### Success toast (สีเขียว)

```tsx
import { showToast } from "@/components/ui/toast"

showToast.success({
  title: "Attention needed",
  description: "Profile has been updated successfully.",
  position: "top-center",
})
```

### Error toast (สีแดง)

```tsx
import { showToast } from "@/components/ui/toast"

showToast.error({
  title: "Attention needed",
  description: "Unable to reset password. Please try again.",
  position: "top-center",
  duration: 5000,
})
```

### ใช้งาน action/cancel

```tsx
import { showToast } from "@/components/ui/toast"

showToast({
  type: "success",
  title: "Saved draft",
  description: "Your draft was saved automatically.",
  action: {
    label: "View",
    onClick: () => {
      // navigate("/drafts")
    },
  },
  cancel: {
    label: "Dismiss",
    onClick: () => {
      // optional side effect
    },
  },
})
```

## หมายเหตุด้านดีไซน์

- `error` ใช้พื้นหลังโทนแดง (`#E8536A`)
- `success` ใช้พื้นหลังโทนเขียว (`#19B37D`)
- แสดงปุ่มปิดมุมขวาบนได้ด้วย `closeButton`
- ใช้ semantic HTML (`section`, `header`, `p`, `button`) ภายใน toast content

## แนะนำการใช้งานจริง

- ใช้ `id` เมื่อต้องการป้องกัน toast ซ้ำ
- ปรับ `position` ตามบริบทหน้าจอ (เช่น mobile ใช้ `top-center`)
- ใช้ `important: true` กับข้อความสำคัญที่ไม่ควรถูกแทนเร็วเกินไป
- ใส่ `onDismiss` เมื่อต้อง track analytics
