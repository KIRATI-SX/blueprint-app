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
  clearAuthenticatedInStorage,
  getInitialUserFromSession,
  persistAuthenticatedInStorage,
  readIsAuthenticatedFromStorage,
} from "./authStorage"

type AuthProviderProps = Readonly<{
  children: ReactNode
}>

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    readIsAuthenticatedFromStorage,
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
    setUser(null)
    clearAuthenticatedInStorage()
  }, [])

  const requireAuth = useCallback((): boolean => {
    if (isAuthenticated) {
      return true
    }
    setLoginDialogOpen(true)
    return false
  }, [isAuthenticated])

  const onCreateAccount = useCallback(() => {
    login()
  }, [login])

  const onLogIn = useCallback(() => {
    login()
  }, [login])

  const value = useMemo(
    () => ({ isAuthenticated, user, login, logout, requireAuth }),
    [isAuthenticated, user, login, logout, requireAuth],
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
