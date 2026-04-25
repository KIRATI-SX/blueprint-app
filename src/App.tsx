import "@/styles/App.css"
import { lazy, Suspense } from "react"
import {
  loadLandingPage,
  loadLoginPage,
  loadNotFoundPage,
  loadProfilePage,
  loadRegistrationSuccessPage,
  loadResetPasswordPage,
  loadSignUpPage,
  loadViewPostPage,
} from "@/app/route-preload"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/sonner"

import { BrowserRouter, Route, Routes } from 'react-router-dom'
const LandingPage = lazy(loadLandingPage)
const LoginPage = lazy(loadLoginPage)
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
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/registration-success" element={<RegistrationSuccessPage />} />
            <Route path="/post/:postId" element={<ViewPostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
