import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

const AUTH_STORAGE_KEY = "blog.isAuthenticated" as const

type AuthContextValue = {
  isAuthenticated: boolean
  /** Persists a signed-in state for the session (dev / placeholder auth). */
  login: () => void
  logout: () => void
  /**
   * If already authenticated, returns true.
   * Otherwise opens the login prompt and returns false.
   */
  requireAuth: () => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readInitialAuth(): boolean {
  if (typeof globalThis === "undefined" || !globalThis.localStorage) {
    return false
  }
  return globalThis.localStorage.getItem(AUTH_STORAGE_KEY) === "1"
}

function LoginRequiredDialog({
  open,
  onOpenChange,
  onCreateAccount,
  onLogIn,
}: Readonly<{
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateAccount: () => void
  onLogIn: () => void
}>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="relative max-h-[352px] max-w-[621px] gap-0 rounded-3xl p-8 pt-10">
        <DialogCloseButton className="inset-e-4 top-4" />
        <DialogHeader className="px-0 pt-0">
          <DialogTitle
            className="px-1 font-sans text-[1.25rem] leading-7 font-semibold text-brown-800 md:text-[2.5rem] md:leading-12"
          >
            Create an account to continue
          </DialogTitle>
          <DialogDescription className="sr-only">
            Sign in or create an account to use reactions, comments, and other
            features on this page.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex w-full flex-col items-center gap-4">
          <button
            type="button"
            onClick={onCreateAccount}
            className="inline-flex h-12 w-full min-w-0 max-w-sm items-center justify-center rounded-full bg-brown-600 px-8 text-base font-medium text-white transition-colors hover:bg-brown-500"
          >
            Create account
          </button>
          <p className="body-3 text-center text-brown-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLogIn}
              className="font-medium text-brown-600 underline underline-offset-2 hover:text-brown-500"
            >
              Log in
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type AuthProviderProps = Readonly<{
  children: ReactNode
}>

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(readInitialAuth)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  const login = useCallback(() => {
    setIsAuthenticated(true)
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      globalThis.localStorage.setItem(AUTH_STORAGE_KEY, "1")
    }
    setLoginDialogOpen(false)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    if (typeof globalThis !== "undefined" && globalThis.localStorage) {
      globalThis.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
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
    () => ({ isAuthenticated, login, logout, requireAuth }),
    [isAuthenticated, login, logout, requireAuth],
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

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (context == null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
