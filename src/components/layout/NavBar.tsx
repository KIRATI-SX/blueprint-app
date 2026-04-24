import { useEffect, useId, useState } from "react"
import logo from "../../assets/icons/logo.svg"
import { useAuth } from "@/contexts/AuthContext"
import { MenuHamburgerLightIcon } from "@/assets/icons/icon-base"
import Button from "../common/Button"

const MOBILE_AUTH_PANEL_ID = "nav-mobile-auth-panel"

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth()
  const isLoggedIn = isAuthenticated
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headingId = useId()

  useEffect(() => {
    const media = globalThis.matchMedia("(min-width: 768px)")
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileMenuOpen(false)
      }
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  return (
    <header className="relative z-50 box-border w-full max-md:bg-white max-md:px-0 md:h-20 md:border-b md:border-brown-300 md:bg-brown-100 md:px-[120px] md:py-4">
      <nav
        className="flex w-full min-h-0 max-w-full items-center justify-between max-md:min-h-12 max-md:border-b max-md:border-brown-300 max-md:px-6 max-md:py-3"
        aria-label="Main navigation"
      >
        <a href="/" aria-label="Homepage" className="flex items-center">
          <img
            src={logo}
            alt="hh. logo, two h letters and a green dot"
            className="h-5 w-5 object-contain md:h-12 md:w-12"
          />
        </a>

        <section className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <Button
              type="button"
              variant="outline"
              className="w-auto px-8"
              onClick={logout}
            >
              Log out
            </Button>
          ) : (
            <>
              <Button variant="outline" className="w-auto px-8">
                Log in
              </Button>
              <Button variant="solid" className="w-auto px-8">
                Sign up
              </Button>
            </>
          )}
        </section>

        {isLoggedIn ? (
          <div className="flex items-center md:hidden">
            <Button
              type="button"
              variant="outline"
              className="h-9! w-auto! min-w-0 px-4 text-sm"
              onClick={logout}
            >
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="flex items-center justify-center rounded-md text-brown-400 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2"
              aria-expanded={mobileMenuOpen}
              aria-controls={MOBILE_AUTH_PANEL_ID}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <MenuHamburgerLightIcon size={20} className="text-brown-400" />
            </button>
          </div>
        )}
      </nav>

      {!isLoggedIn && mobileMenuOpen && (
        <section
          id={MOBILE_AUTH_PANEL_ID}
          aria-labelledby={headingId}
          className="absolute top-full right-0 left-0 z-50 md:hidden max-md:border-b-4 max-md:border-brown-200 max-md:bg-white max-md:shadow-md"
        >
          <h2 id={headingId} className="sr-only">
            Account
          </h2>
          <div className="flex flex-col gap-3 max-md:px-6 max-md:py-4">
            <Button
              type="button"
              variant="outline"
              className="h-12! w-full! max-w-full border-[#26231E] bg-white px-6"
            >
              Log in
            </Button>
            <Button
              type="button"
              variant="solid"
              className="h-12! w-full! max-w-full px-6"
            >
              Sign up
            </Button>
          </div>
        </section>
      )}
    </header>
  )
}
