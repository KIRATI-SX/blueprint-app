import { MenuHamburgerLightIcon } from "@/assets/icons/icon-base"

type NavBarMobileHamburgerButtonProps = Readonly<{
  open: boolean
  onToggle: () => void
  menuPanelId: string
}>

export function NavBarMobileHamburgerButton({
  open,
  onToggle,
  menuPanelId,
}: NavBarMobileHamburgerButtonProps) {
  return (
    <div className="flex items-center md:hidden">
      <button
        type="button"
        className="flex items-center justify-center rounded-md text-brown-400 outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-controls={menuPanelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={onToggle}
      >
        <MenuHamburgerLightIcon size={20} className="text-brown-400" />
      </button>
    </div>
  )
}
