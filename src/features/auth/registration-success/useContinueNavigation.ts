import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import type { SignUpToRegistrationSuccessState } from "./registrationSuccess.types"
import {
  clearSignupReferrerSession,
  persistSameOriginReferrerOnSignupEntry,
  readAndConsumeSignupReferrerPath,
  resolveSafeContinuePath,
} from "./navigationResolver"

const LANDING_PATH = "/"

type UseContinueNavigationArgs = Readonly<{
  state: SignUpToRegistrationSuccessState | null
}>

/**
 * รวม priority สำหรับ continue หลัง register สำเร็จ
 * 1) explicit returnTo จาก `location.state` (มาจาก NavBar / flow login)
 * 2) same-origin referrer ที่ snapshot ตอนเข้า /signup
 * 3) browser history: ถ้ามาจาก login flow ลอง goBack 2 ขั้น (ข้าม login)
 * 4) ไม่ก็ goBack 1 ขั้น
 * 5) fallback ไป landing
 */
export function useContinueNavigation({ state }: UseContinueNavigationArgs) {
  const navigate = useNavigate()

  return useCallback(() => {
    const returnTo = state?.returnTo ?? null
    const fromLoginFlow = state?.fromLoginFlow ?? false

    if (returnTo) {
      clearSignupReferrerSession()
      const safe = resolveSafeContinuePath(returnTo, LANDING_PATH)
      navigate(safe, { replace: true })
      return
    }

    const stored = readAndConsumeSignupReferrerPath()
    if (stored) {
      const safe = resolveSafeContinuePath(stored, LANDING_PATH)
      navigate(safe, { replace: true })
      return
    }

    if (fromLoginFlow && window.history.length > 2) {
      navigate(-2)
      return
    }

    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate(LANDING_PATH, { replace: true })
  }, [navigate, state])
}

/**
 * ใช้บน /signup: เก็บ same-origin `document.referrer` รอบแรกที่ mount
 */
export function useSignupEntryReferrerCapture(): void {
  useEffect(() => {
    persistSameOriginReferrerOnSignupEntry()
  }, [])
}
