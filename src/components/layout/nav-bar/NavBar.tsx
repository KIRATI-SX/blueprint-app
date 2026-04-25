import { useId } from "react"
import { Link } from "react-router-dom"
import logo from "../../../assets/icons/logo.svg"
import { useAuth } from "@/contexts/AuthContext"
import { MOBILE_AUTH_PANEL_ID } from "./constants"
import { NavBarGuestAuthLinks } from "./NavBarGuestAuthLinks"
import { NavBarMobileAuthPanel } from "./NavBarMobileAuthPanel"
import { NavBarMobileHamburgerButton } from "./NavBarMobileHamburgerButton"
import { NavBarUserActions } from "./NavBarUserActions"
import { useNavBarMobileMenu } from "./hooks/useNavBarMobileMenu"

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth()
  const isLoggedIn = isAuthenticated
  const isGuest = !isLoggedIn
  const mobileHeadingId = useId()
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useNavBarMobileMenu()

  return (
    <header className="relative z-50 box-border w-full max-md:bg-white max-md:px-0 md:h-20 md:border-b md:border-brown-300 md:bg-brown-100 md:px-[120px] md:py-4">
      <nav
        className="flex w-full min-h-0 max-w-full items-center justify-between max-md:min-h-12 max-md:border-b max-md:border-brown-300 max-md:px-6 max-md:py-3"
        aria-label="Main navigation"
      >
        <Link to="/" aria-label="Homepage" className="flex items-center">
          <img
            src={logo}
            alt="hh. logo, two h letters and a green dot"
            className="h-5 w-5 object-contain md:h-12 md:w-12"
          />
        </Link>

        <section className="hidden items-center gap-3 md:flex">
          {isLoggedIn && user ? (
            <NavBarUserActions
              user={user}
              onLogout={logout}
              variant="desktop"
            />
          ) : null}
          {isGuest ? <NavBarGuestAuthLinks /> : null}
        </section>

        {isLoggedIn && user ? (
          <NavBarUserActions
            user={user}
            onLogout={logout}
            variant="mobile"
          />
        ) : null}
        {isGuest ? (
          <NavBarMobileHamburgerButton
            open={mobileMenuOpen}
            onToggle={toggleMobileMenu}
            menuPanelId={MOBILE_AUTH_PANEL_ID}
          />
        ) : null}
      </nav>

      {isGuest && mobileMenuOpen ? (
        <NavBarMobileAuthPanel
          id={MOBILE_AUTH_PANEL_ID}
          headingId={mobileHeadingId}
          onLinkNavigate={closeMobileMenu}
        />
      ) : null}
    </header>
  )
}
