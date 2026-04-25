import { PLACEHOLDER_AUTH_USER, type AuthUser } from "@/constants/authUserPlaceholder"
import {
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react"

import { AuthContext } from "./AuthContextInstance"
import { LoginRequiredDialog } from "./LoginRequiredDialog"
import {
  clearAdminAuthenticatedInStorage,
  clearAuthenticatedInStorage,
  getInitialUserFromSession,
  persistAdminAuthenticatedInStorage,
  persistAuthenticatedInStorage,
  readIsAdminAuthenticatedFromStorage,
  readIsAuthenticatedFromStorage,
} from "./authStorage"

type AuthProviderProps = Readonly<{
  children: ReactNode
}>

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    readIsAuthenticatedFromStorage,
  )
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    readIsAdminAuthenticatedFromStorage,
  )
  const [user, setUser] = useState<AuthUser | null>(getInitialUserFromSession)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const login = useCallback(() => {
    setIsAuthenticated(true)
    setUser(PLACEHOLDER_AUTH_USER)
    persistAuthenticatedInStorage()
    setLoginDialogOpen(false)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setIsAdminAuthenticated(false)
    setUser(null)
    clearAuthenticatedInStorage()
    clearAdminAuthenticatedInStorage()
  }, [])

  const loginAdmin = useCallback(() => {
    login()
    setIsAdminAuthenticated(true)
    persistAdminAuthenticatedInStorage()
  }, [login])

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false)
    clearAdminAuthenticatedInStorage()
  }, [])

  const requireAuth = useCallback((): boolean => {
    if (isAuthenticated) {
      return true
    }
    setLoginDialogOpen(true)
    return false
  }, [isAuthenticated])

  const requireAdminAuth = useCallback((): boolean => {
    if (isAdminAuthenticated) {
      return true
    }
    setLoginDialogOpen(true)
    return false
  }, [isAdminAuthenticated])

  const onCreateAccount = useCallback(() => {
    login()
  }, [login])

  const onLogIn = useCallback(() => {
    login()
  }, [login])

  const value = useMemo(
    () => ({
      isAuthenticated,
      isAdminAuthenticated,
      user,
      login,
      loginAdmin,
      logout,
      logoutAdmin,
      requireAuth,
      requireAdminAuth,
    }),
    [
      isAuthenticated,
      isAdminAuthenticated,
      user,
      login,
      loginAdmin,
      logout,
      logoutAdmin,
      requireAuth,
      requireAdminAuth,
    ],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoginRequiredDialog
        open={loginDialogOpen}
        onOpenChange={setLoginDialogOpen}
        onCreateAccount={onCreateAccount}
        onLogIn={onLogIn}
      />
    </AuthContext.Provider>
  )
}
