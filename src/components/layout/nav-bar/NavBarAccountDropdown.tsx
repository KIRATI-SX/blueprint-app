import {
  ExpandDownLightIcon,
  RefreshLightIcon,
  SignOutSqureLightIcon,
  UserDuotoneIcon,
} from "@/assets/icons/icon-base"
import type { AuthUser } from "@/constants/authUserPlaceholder"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import { Link } from "react-router-dom"

type NavBarAccountDropdownProps = Readonly<{
  user: AuthUser
  onLogout: () => void
}>

export function NavBarAccountDropdown({
  user,
  onLogout,
}: NavBarAccountDropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const triggerId = useId()
  const menuId = useId()

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }
    const onDown = (event: MouseEvent) => {
      const el = rootRef.current
      if (el == null) {
        return
      }
      if (event.target instanceof Node && !el.contains(event.target)) {
        setOpen(false)
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    globalThis.document.addEventListener("mousedown", onDown)
    globalThis.document.addEventListener("keydown", onKey)
    return () => {
      globalThis.document.removeEventListener("mousedown", onDown)
      globalThis.document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div className="relative" ref={rootRef}>
      <button
        id={triggerId}
        type="button"
        className="flex max-w-[min(100vw,18rem)] items-center gap-2 rounded-lg py-1 pe-1 ps-0 text-left outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        <img
          src={user.avatarUrl}
          alt={user.displayName}
          width={40}
          height={40}
          className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
        />
        <span className="body-2 max-w-36 truncate text-brown-600 sm:max-w-48">
          {user.displayName}
        </span>
        <ExpandDownLightIcon
          size={16}
          className="shrink-0 text-brown-400"
          aria-hidden
        />
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={triggerId}
          className="absolute inset-e-0 top-full z-50 mt-2 min-w-[16rem] rounded-xl border border-brown-200 bg-white py-2 shadow-lg"
        >
          <Link
            to="/profile"
            role="menuitem"
            className="flex w-full items-center gap-3 px-4 py-3 text-left body-2 text-brown-600 transition-colors hover:bg-brown-100"
            onClick={close}
          >
            <UserDuotoneIcon
              size={20}
              className="shrink-0 text-brown-500"
              aria-hidden
            />
            Profile
          </Link>
          <Link
            to="/reset-password"
            role="menuitem"
            className="flex w-full items-center gap-3 px-4 py-3 text-left body-2 text-brown-600 transition-colors hover:bg-brown-100"
            onClick={close}
          >
            <RefreshLightIcon
              size={20}
              className="shrink-0 text-brown-500"
              aria-hidden
            />
            Reset password
          </Link>
          <hr className="my-2 border-0 h-px bg-brown-200" />
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-3 px-4 py-3 text-left body-2 text-brown-600 transition-colors hover:bg-brown-100"
            onClick={() => {
              close()
              onLogout()
            }}
          >
            <SignOutSqureLightIcon
              size={20}
              className="shrink-0 text-brown-500"
              aria-hidden
            />
            Log out
          </button>
        </div>
      )}
    </div>
  )
}
