type RouteModule = { default: React.ComponentType }
type RouteLoader = () => Promise<RouteModule>

export const loadLandingPage: RouteLoader = () => import("@/pages/LandingPage")
export const loadLoginPage: RouteLoader = () => import("@/pages/LoginPage")
export const loadSignUpPage: RouteLoader = () => import("@/pages/SignUpPage")
export const loadRegistrationSuccessPage: RouteLoader = () =>
  import("@/pages/RegistrationSuccessPage")
export const loadViewPostPage: RouteLoader = () => import("@/pages/ViewPostPage")
export const loadProfilePage: RouteLoader = () => import("@/pages/ProfilePage")
export const loadResetPasswordPage: RouteLoader = () =>
  import("@/pages/ResetPasswordPage")
export const loadNotFoundPage: RouteLoader = () => import("@/pages/NotFoundPage")

const routeLoaderByPath: Readonly<Record<string, RouteLoader>> = {
  "/": loadLandingPage,
  "/login": loadLoginPage,
  "/signup": loadSignUpPage,
  "/registration-success": loadRegistrationSuccessPage,
  "/profile": loadProfilePage,
  "/reset-password": loadResetPasswordPage,
}

const preloadCache = new Map<string, Promise<RouteModule>>()

export function preloadRoute(path: string) {
  const loader = routeLoaderByPath[path]
  if (!loader) return

  const existingPromise = preloadCache.get(path)
  if (existingPromise !== undefined) return existingPromise

  const nextPromise = loader()
  preloadCache.set(path, nextPromise)
  return nextPromise
}
