import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import BlogPageLayout from "@/components/layout/BlogPageLayout"
import { useAuth } from "@/contexts/AuthContext"
import { SignUpForm, useSignUpForm } from "@/features/auth/sign-up"
import {
  buildReturnToFromSignupLocationState,
  useSignupEntryReferrerCapture,
  type AuthLinkLocationState,
} from "@/features/auth/registration-success"

export default function SignUpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login } = useAuth()
  const isCompletingRegistration = useRef(false)
  useSignupEntryReferrerCapture()

  const {
    values,
    errors,
    isSubmitting,
    handleFieldBlur,
    handleFieldChange,
    validateBeforeSubmit,
    startSubmitting,
    stopSubmitting,
  } = useSignUpForm()

  useEffect(() => {
    if (isAuthenticated && !isCompletingRegistration.current) {
      navigate("/", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = () => {
    const isValid = validateBeforeSubmit()
    if (!isValid) {
      return
    }

    const authState = location.state as AuthLinkLocationState | null
    const returnTo = buildReturnToFromSignupLocationState(authState)
    const fromLoginFlow = authState?.fromLogin === true

    isCompletingRegistration.current = true
    startSubmitting()
    try {
      navigate("/registration-success", {
        replace: true,
        state: { returnTo, fromLoginFlow },
      })
      login()
    } finally {
      stopSubmitting()
    }
  }

  return (
    <BlogPageLayout
      mainAriaLabel="Sign up"
      mainClassName="flex min-h-0 flex-1 flex-col bg-[#F5F5F5]"
    >
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
        <SignUpForm
          values={values}
          errors={errors}
          isSubmitting={isSubmitting}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          onSubmit={handleSubmit}
        />
      </section>
    </BlogPageLayout>
  )
}
