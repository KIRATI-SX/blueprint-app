import { type ComponentProps, useEffect, useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

import Button from "@/components/common/Button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"

const EMAIL_FIELD_CLASS =
  "h-12 rounded-lg border-brown-300 bg-white px-3.5 text-base text-brown-600 placeholder:text-brown-300 focus-visible:border-brown-500 focus-visible:ring-brown-400/30"

const PASSWORD_FIELD_CLASS =
  "h-12 rounded-lg border-brown-300 bg-white px-3.5 pe-12 text-base text-brown-600 placeholder:text-brown-300 focus-visible:border-brown-500 focus-visible:ring-brown-400/30"

export default function AdminLoginPage() {
  const emailId = useId()
  const passwordId = useId()
  const navigate = useNavigate()
  const { isAdminAuthenticated, loginAdmin } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate("/admin/articles", { replace: true })
    }
  }, [isAdminAuthenticated, navigate])

  type FormSubmitEvent = Parameters<
    NonNullable<ComponentProps<"form">["onSubmit"]>
  >[0]

  async function onSubmit(event: FormSubmitEvent) {
    event.preventDefault()
    setErrorMessage(null)

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Invalid credentials")
      return
    }

    setIsSubmitting(true)
    try {
      await Promise.resolve(loginAdmin())
      navigate("/admin/articles", { replace: true })
    } catch {
      setErrorMessage("Invalid credentials")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="w-screen h-screen flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 w-full h-full">
        <article className="w-full max-w-xl rounded-3xl bg-brown-200 px-8 py-10 shadow-xl md:px-12">
          <header className="mb-8 text-center">
            <p className="mb-1 text-sm font-semibold text-[#E3A476]">Admin panel</p>
            <h1 className="text-2xl font-semibold text-brown-600 md:text-[1.75rem] md:leading-9">
              Log in
            </h1>
          </header>

          <form className="flex flex-col gap-6" noValidate onSubmit={onSubmit}>
            <section className="flex flex-col gap-2">
              <label
                htmlFor={emailId}
                className="text-sm font-medium text-brown-400"
              >
                Email
              </label>
              <Input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={EMAIL_FIELD_CLASS}
                disabled={isSubmitting}
              />
            </section>

            <section className="flex flex-col gap-2">
              <label
                htmlFor={passwordId}
                className="text-sm font-medium text-brown-400"
              >
                Password
              </label>
              <article className="relative">
                <Input
                  id={passwordId}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={PASSWORD_FIELD_CLASS}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute inset-e-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-brown-500 transition-colors hover:bg-brown-200/60 hover:text-brown-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-60"
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" strokeWidth={1.75} aria-hidden />
                  ) : (
                    <Eye className="size-5" strokeWidth={1.75} aria-hidden />
                  )}
                </button>
              </article>
            </section>

            {errorMessage ? (
              <p role="alert" className="text-sm text-red-600">
                {errorMessage}
              </p>
            ) : null}

            <footer className="pt-1">
              <Button
                type="submit"
                variant="solid"
                className="h-12! w-full! max-w-full disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </footer>
          </form>
        </article>
      </section>
    </main>
  )
}
