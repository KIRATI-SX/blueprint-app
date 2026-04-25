import { useCallback, useEffect, useState } from "react"
import { NAV_BAR_MD_MIN_MEDIA } from "../constants"

type UseNavBarMobileMenuResult = Readonly<{
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
}>

export function useNavBarMobileMenu(): UseNavBarMobileMenuResult {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const media = globalThis.matchMedia(NAV_BAR_MD_MIN_MEDIA)
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpen(false)
      }
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setOpen((o) => !o)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setOpen(false)
  }, [])

  return { mobileMenuOpen: open, toggleMobileMenu, closeMobileMenu }
}
