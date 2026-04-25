import { useId, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

import Button from "@/components/common/Button"
import { Input } from "@/components/ui/input"
import type { AuthLinkLocationState } from "@/features/auth/registration-success"
import type { SignUpFormErrors, SignUpFormValues } from "./signUp.types"

type SignUpFormProps = Readonly<{
  values: SignUpFormValues
  errors: SignUpFormErrors
  isSubmitting: boolean
  onFieldChange: (field: keyof SignUpFormValues, value: string) => void
  onFieldBlur: (field: keyof SignUpFormValues) => void
  onSubmit: () => void
}>

const FIELD_CLASS =
  "h-12 rounded-lg border-brown-300 bg-white px-3.5 text-base text-brown-600 placeholder:text-brown-300 focus-visible:border-brown-500 focus-visible:ring-brown-400/30"

const PASSWORD_FIELD_CLASS = `${FIELD_CLASS} pe-12`

const ERROR_TEXT_CLASS = "text-xs text-red-600"

export function SignUpForm({
  values,
  errors,
  isSubmitting,
  onFieldChange,
  onFieldBlur,
  onSubmit,
}: SignUpFormProps) {
  const fullNameId = useId()
  const usernameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const [showPassword, setShowPassword] = useState(false)
  const { pathname, search, hash, state: routeState } = useLocation()
  const authState = routeState as AuthLinkLocationState | null
  const loginLinkState = {
    from: authState?.fromBeforeAuth ?? authState?.from ?? { pathname, search, hash },
  }

  return (
    <article className="w-full max-w-[798px] rounded-3xl bg-brown-200 px-8 py-10 shadow-xl md:px-30">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-brown-600 md:text-[1.75rem] md:leading-9">
          Sign up
        </h1>
      </header>

      <form
        className="flex flex-col gap-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <section className="flex flex-col gap-2">
          <label htmlFor={fullNameId} className="text-sm font-medium text-brown-400">
            Name
          </label>
          <Input
            id={fullNameId}
            name="fullName"
            autoComplete="name"
            placeholder="Full name"
            value={values.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${fullNameId}-error` : undefined}
            className={FIELD_CLASS}
            onChange={(event) => onFieldChange("fullName", event.target.value)}
            onBlur={() => onFieldBlur("fullName")}
          />
          {errors.fullName ? (
            <p id={`${fullNameId}-error`} className={ERROR_TEXT_CLASS}>
              {errors.fullName}
            </p>
          ) : null}
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor={usernameId} className="text-sm font-medium text-brown-400">
            Username
          </label>
          <Input
            id={usernameId}
            name="username"
            autoComplete="username"
            placeholder="Username"
            value={values.username}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? `${usernameId}-error` : undefined}
            className={FIELD_CLASS}
            onChange={(event) => onFieldChange("username", event.target.value)}
            onBlur={() => onFieldBlur("username")}
          />
          {errors.username ? (
            <p id={`${usernameId}-error`} className={ERROR_TEXT_CLASS}>
              {errors.username}
            </p>
          ) : null}
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor={emailId} className="text-sm font-medium text-brown-400">
            Email
          </label>
          <Input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className={FIELD_CLASS}
            onChange={(event) => onFieldChange("email", event.target.value)}
            onBlur={() => onFieldBlur("email")}
          />
          {errors.email ? (
            <p id={`${emailId}-error`} className={ERROR_TEXT_CLASS}>
              {errors.email}
            </p>
          ) : null}
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor={passwordId} className="text-sm font-medium text-brown-400">
            Password
          </label>
          <div className="relative">
            <Input
              id={passwordId}
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Password"
              value={values.password}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? `${passwordId}-error` : undefined}
              className={PASSWORD_FIELD_CLASS}
              onChange={(event) => onFieldChange("password", event.target.value)}
              onBlur={() => onFieldBlur("password")}
            />
            <button
              type="button"
              className="absolute inset-e-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-brown-500 transition-colors hover:bg-brown-200/60 hover:text-brown-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-1"
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? (
                <EyeOff className="size-5" strokeWidth={1.75} aria-hidden />
              ) : (
                <Eye className="size-5" strokeWidth={1.75} aria-hidden />
              )}
            </button>
          </div>
          {errors.password ? (
            <p id={`${passwordId}-error`} className={ERROR_TEXT_CLASS}>
              {errors.password}
            </p>
          ) : null}
        </section>

        <section className="pt-1 flex justify-center">
          <Button
            type="submit"
            variant="solid"
            disabled={isSubmitting}
            className="h-12! w-full! max-w-fit"
          >
            <p className="body-1">
            {isSubmitting ? "Creating account..." : "Sign up"}
            </p>
          </Button>
        </section>
      </form>

      <footer className="mt-8 text-center">
        <p className="body-3 text-brown-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-brown-600 underline underline-offset-2 transition-colors hover:text-brown-500"
          >
            Log in
          </Link>
        </p>
      </footer>
    </article>
  )
}
