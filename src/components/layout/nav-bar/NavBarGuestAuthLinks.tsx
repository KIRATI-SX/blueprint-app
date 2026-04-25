import { Link, useLocation } from "react-router-dom"
import { preloadRoute } from "@/app/route-preload"
import { NAV_LOGIN_LINK_CLASS, NAV_SIGNUP_LINK_CLASS } from "./constants"

type NavBarGuestAuthLinksProps = Readonly<{
  onNavigate?: () => void
}>

export function NavBarGuestAuthLinks({ onNavigate }: NavBarGuestAuthLinksProps) {
  const { pathname, search, hash } = useLocation()
  const from = { pathname, search, hash }

  return (
    <>
      <Link
        to="/login"
        state={{ from }}
        className={NAV_LOGIN_LINK_CLASS}
        onClick={onNavigate}
        onMouseEnter={() => preloadRoute("/login")}
        onFocus={() => preloadRoute("/login")}
        onTouchStart={() => preloadRoute("/login")}
      >
        Log in
      </Link>
      <Link
        to="/signup"
        state={{ from }}
        className={NAV_SIGNUP_LINK_CLASS}
        onClick={onNavigate}
        onMouseEnter={() => preloadRoute("/signup")}
        onFocus={() => preloadRoute("/signup")}
        onTouchStart={() => preloadRoute("/signup")}
      >
        Sign up
      </Link>
    </>
  )
}
