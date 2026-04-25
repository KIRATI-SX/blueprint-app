type RouteModule = { default: React.ComponentType }
type RouteLoader = () => Promise<RouteModule>

export const loadLandingPage: RouteLoader = () => import("@/pages/LandingPage")
export const loadLoginPage: RouteLoader = () => import("@/pages/user/LoginPage")
export const loadAdminLoginPage: RouteLoader = () => import("@/pages/admin/AdminLoginPage")
export const loadAdminArticleManagementPage: RouteLoader = () =>
  import("@/pages/admin/AdminArticleManagementPage")
export const loadAdminCategoryManagementPage: RouteLoader = () =>
  import("@/pages/admin/AdminCategoryManagementPage")
export const loadAdminProfilePage: RouteLoader = () =>
  import("@/pages/admin/AdminProfilePage")
export const loadAdminNotificationPage: RouteLoader = () =>
  import("@/pages/admin/AdminNotificationPage")
export const loadAdminResetPasswordPage: RouteLoader = () =>
  import("@/pages/admin/AdminResetPasswordPage")
export const loadSignUpPage: RouteLoader = () => import("@/pages/SignUpPage")
export const loadRegistrationSuccessPage: RouteLoader = () =>
  import("@/pages/user/RegistrationSuccessPage")
export const loadViewPostPage: RouteLoader = () => import("@/pages/ViewPostPage")
export const loadProfilePage: RouteLoader = () => import("@/pages/user/ProfilePage")
export const loadResetPasswordPage: RouteLoader = () =>
  import("@/pages/user/ResetPasswordPage")
export const loadNotFoundPage: RouteLoader = () => import("@/pages/NotFoundPage")

const routeLoaderByPath: Readonly<Record<string, RouteLoader>> = {
  "/": loadLandingPage,
  "/login": loadLoginPage,
  "/admin/login": loadAdminLoginPage,
  "/admin/articles": loadAdminArticleManagementPage,
  "/admin/categories": loadAdminCategoryManagementPage,
  "/admin/profile": loadAdminProfilePage,
  "/admin/notifications": loadAdminNotificationPage,
  "/admin/reset-password": loadAdminResetPasswordPage,
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
