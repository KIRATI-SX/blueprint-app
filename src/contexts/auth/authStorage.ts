import { PLACEHOLDER_AUTH_USER, type AuthUser } from "@/constants/authUserPlaceholder"

export const AUTH_STORAGE_KEY = "blog.isAuthenticated" as const
export const ADMIN_AUTH_STORAGE_KEY = "blog.isAdminAuthenticated" as const

export function readIsAuthenticatedFromStorage(): boolean {
  if (typeof globalThis === "undefined" || !globalThis.localStorage) {
    return false
  }
  return globalThis.localStorage.getItem(AUTH_STORAGE_KEY) === "1"
}

export function persistAuthenticatedInStorage(): void {
  if (typeof globalThis !== "undefined" && globalThis.localStorage) {
    globalThis.localStorage.setItem(AUTH_STORAGE_KEY, "1")
  }
}

export function clearAuthenticatedInStorage(): void {
  if (typeof globalThis !== "undefined" && globalThis.localStorage) {
    globalThis.localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

export function readIsAdminAuthenticatedFromStorage(): boolean {
  if (typeof globalThis === "undefined" || !globalThis.localStorage) {
    return false
  }
  return globalThis.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === "1"
}

export function persistAdminAuthenticatedInStorage(): void {
  if (typeof globalThis !== "undefined" && globalThis.localStorage) {
    globalThis.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "1")
  }
}

export function clearAdminAuthenticatedInStorage(): void {
  if (typeof globalThis !== "undefined" && globalThis.localStorage) {
    globalThis.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY)
  }
}

/** Resolves the initial user for React state from persisted session. */
export function getInitialUserFromSession(): AuthUser | null {
  return readIsAuthenticatedFromStorage() ? PLACEHOLDER_AUTH_USER : null
}
