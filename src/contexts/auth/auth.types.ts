import type { AuthUser } from "@/constants/authUserPlaceholder"

/** Contract exposed by `AuthProvider` / `useAuth`. */
export type AuthContextValue = {
  isAuthenticated: boolean
  /** Present when signed in; placeholder in dev until real auth exists. */
  user: AuthUser | null
  /** Persists a signed-in state for the session (dev / placeholder auth). */
  login: () => void
  logout: () => void
  /**
   * If already authenticated, returns true.
   * Otherwise opens the login prompt and returns false.
   */
  requireAuth: () => boolean
}
