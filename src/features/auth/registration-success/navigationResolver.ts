import type {
  AppLocationSnapshot,
  AuthLinkLocationState,
} from "./registrationSuccess.types"
import { SESSION_KEY_SIGNUP_SAME_ORIGIN_REFERRER } from "./sessionKeys"

const AUTH_LOOP_PATHS = new Set([
  "/login",
  "/signup",
  "/registration-success",
])

/**
 * รวม path ที่ใช้กับ `navigate()` สำหรับ route ที่เปิดรับ
 */
export function createPathFromSnapshot(snapshot: AppLocationSnapshot): string {
  return `${snapshot.pathname}${snapshot.search}${snapshot.hash}`
}

/**
 * สร้าง path สำหรับ continue จาก `location.state` ของหน้า /signup
 * ลำดับ: หน้าก่อน login (กรณีมาจาก login) > หน้าที่ส่งมาจาก NavBar link
 */
export function buildReturnToFromSignupLocationState(
  state: AuthLinkLocationState | null,
): string | null {
  if (!state) {
    return null
  }
  if (state.fromBeforeAuth) {
    return createPathFromSnapshot(state.fromBeforeAuth)
  }
  if (state.from) {
    return createPathFromSnapshot(state.from)
  }
  return null
}

/**
 * อ่าน `document.referrer` เฉพาะ same-origin แล้วแปลงเป็นพาธ (รวม search/hash)
 * กันปัญหา open redirect
 */
export function getSameOriginReferrerPath(): string | null {
  if (typeof document === "undefined" || !document.referrer) {
    return null
  }

  try {
    const referrer = new URL(document.referrer)
    if (referrer.origin !== window.location.origin) {
      return null
    }
    return `${referrer.pathname}${referrer.search}${referrer.hash}`
  } catch {
    return null
  }
}

/**
 * ตรวจว่า path นำทางไปยัง route หลักของแอปได้
 */
export function isAllowedContinuePath(path: string): boolean {
  const pathname = path.split("#")[0]?.split("?")[0] ?? path

  if (pathname === "/") {
    return true
  }
  if (pathname.startsWith("/post/")) {
    return true
  }
  if (pathname === "/profile" || pathname === "/reset-password") {
    return true
  }
  return false
}

/**
 * กันวน loop / กลับไปหน้า auth ที่ยังบังคับ continue อีกรอบ
 * - ถ้า path ยังชี้ auth flow ให้กลับ landing
 * - ถ้า path ไม่อนุญาต ให้ fallback
 */
export function resolveSafeContinuePath(
  candidate: string,
  fallback: string,
): string {
  const pathname = candidate.split("#")[0]?.split("?")[0] ?? candidate

  if (AUTH_LOOP_PATHS.has(pathname)) {
    return "/"
  }

  if (!isAllowedContinuePath(candidate)) {
    return fallback
  }
  return candidate
}

export function clearSignupReferrerSession(): void {
  if (typeof sessionStorage === "undefined") {
    return
  }
  sessionStorage.removeItem(SESSION_KEY_SIGNUP_SAME_ORIGIN_REFERRER)
}

/**
 * ล้าง session key หลังใช้
 */
export function readAndConsumeSignupReferrerPath(): string | null {
  if (typeof sessionStorage === "undefined") {
    return null
  }
  const value = sessionStorage.getItem(SESSION_KEY_SIGNUP_SAME_ORIGIN_REFERRER)
  if (value) {
    sessionStorage.removeItem(SESSION_KEY_SIGNUP_SAME_ORIGIN_REFERRER)
  }
  return value
}

/**
 * เรียกตอนเข้า /signup เพื่อเก็บ same-origin referrer สำหรับ continue
 */
export function persistSameOriginReferrerOnSignupEntry(): void {
  const path = getSameOriginReferrerPath()
  if (path) {
    sessionStorage.setItem(SESSION_KEY_SIGNUP_SAME_ORIGIN_REFERRER, path)
  }
}
