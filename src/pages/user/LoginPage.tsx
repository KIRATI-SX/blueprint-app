import { useEffect, useId, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import BlogPageLayout from "@/components/layout/BlogPageLayout"
import Button from "@/components/common/Button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import type { AuthLinkLocationState } from "@/features/auth/registration-success"
import { Eye, EyeOff } from "lucide-react"

const EMAIL_FIELD_CLASS =
  "h-12 rounded-lg border-brown-300 bg-white px-3.5 text-base text-brown-600 placeholder:text-brown-300 focus-visible:border-brown-500 focus-visible:ring-brown-400/30"

const PASSWORD_FIELD_CLASS =
  "h-12 rounded-lg border-brown-300 bg-white px-3.5 pe-12 text-base text-brown-600 placeholder:text-brown-300 focus-visible:border-brown-500 focus-visible:ring-brown-400/30"

export default function LoginPage() {
  const emailId = useId()
  const passwordId = useId()
  const location = useLocation()
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <BlogPageLayout
      mainAriaLabel="Log in"
      mainClassName="flex min-h-0 flex-1 flex-col bg-[#F5F5F5]"
    >
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
        <article className="w-full max-w-md rounded-3xl bg-brown-200 px-8 py-10 shadow-xl md:px-10">
          <header className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-brown-600 md:text-[1.75rem] md:leading-9">
              Log in
            </h1>
          </header>
          <form
            className="flex flex-col gap-6"
            noValidate
            onSubmit={(event) => {
              event.preventDefault()
              login()
              navigate("/")
            }}
          >
            <div className="flex flex-col gap-2">
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
                onChange={(e) => setEmail(e.target.value)}
                className={EMAIL_FIELD_CLASS}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor={passwordId}
                className="text-sm font-medium text-brown-400"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id={passwordId}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={PASSWORD_FIELD_CLASS}
                />
                <button
                  type="button"
                  className="absolute inset-e-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-brown-500 transition-colors hover:bg-brown-200/60 hover:text-brown-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-1"
                  aria-pressed={showPassword}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? (
                    <EyeOff
                      className="size-5"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  ) : (
                    <Eye
                      className="size-5"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="pt-1">
              <Button
                type="submit"
                variant="solid"
                className="h-12! w-full! max-w-full"
              >
                Log in
              </Button>
            </div>
          </form>
          <footer className="mt-8 text-center">
            <p className="body-3 text-brown-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                state={{
                  fromBeforeAuth: (location.state as AuthLinkLocationState | null)
                    ?.from,
                  fromLogin: true,
                }}
                className="font-medium text-brown-600 underline underline-offset-2 transition-colors hover:text-brown-500"
              >
                Sign up
              </Link>
            </p>
          </footer>
        </article>
      </section>
    </BlogPageLayout>
  )
}
