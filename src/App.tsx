import "@/styles/App.css"
import { lazy, Suspense } from "react"
import {
  loadAdminArticleManagementPage,
  loadAdminCategoryManagementPage,
  loadAdminLoginPage,
  loadAdminNotificationPage,
  loadAdminProfilePage,
  loadAdminResetPasswordPage,
  loadLandingPage,
  loadLoginPage,
  loadNotFoundPage,
  loadProfilePage,
  loadRegistrationSuccessPage,
  loadResetPasswordPage,
  loadSignUpPage,
  loadViewPostPage,
} from "@/app/route-preload"
import AdminPanelLayout from "@/components/layout/admin/AdminPanelLayout"
import { AuthProvider } from "@/contexts/AuthContext"
import RequireAdminAuth from "@/features/auth/guards/RequireAdminAuth"
import RequireUserAuth from "@/features/auth/guards/RequireUserAuth"
import { Toaster } from "@/components/ui/sonner"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
const LandingPage = lazy(loadLandingPage)
const LoginPage = lazy(loadLoginPage)
const AdminLoginPage = lazy(loadAdminLoginPage)
const AdminArticleManagementPage = lazy(loadAdminArticleManagementPage)
const AdminCategoryManagementPage = lazy(loadAdminCategoryManagementPage)
const AdminProfilePage = lazy(loadAdminProfilePage)
const AdminNotificationPage = lazy(loadAdminNotificationPage)
const AdminResetPasswordPage = lazy(loadAdminResetPasswordPage)
const ProfilePage = lazy(loadProfilePage)
const ResetPasswordPage = lazy(loadResetPasswordPage)
const SignUpPage = lazy(loadSignUpPage)
const RegistrationSuccessPage = lazy(loadRegistrationSuccessPage)
const ViewPostPage = lazy(loadViewPostPage)
const NotFoundPage = lazy(loadNotFoundPage)

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense
          fallback={(
            <section
              aria-live="polite"
              className="flex min-h-screen items-center justify-center text-brown-500"
            >

              Loading page...
            </section>
          )}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<RequireAdminAuth />}>
              <Route path="/admin" element={<AdminPanelLayout />}>
                <Route index element={<Navigate to="articles" replace />} />
                <Route
                  path="articles"
                  element={<AdminArticleManagementPage />}
                />
                <Route
                  path="categories"
                  element={<AdminCategoryManagementPage />}
                />
                <Route path="profile" element={<AdminProfilePage />} />
                <Route
                  path="notifications"
                  element={<AdminNotificationPage />}
                />
                <Route
                  path="reset-password"
                  element={<AdminResetPasswordPage />}
                />
              </Route>
            </Route>

            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/registration-success" element={<RegistrationSuccessPage />} />
            <Route path="/post/:postId" element={<ViewPostPage />} />
            <Route element={<RequireUserAuth />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
