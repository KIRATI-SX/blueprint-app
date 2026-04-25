import type { AuthUser } from "@/constants/authUserPlaceholder"
import { NavBarAccountDropdown } from "./NavBarAccountDropdown"
import { NavBarNotificationButton } from "./NavBarNotificationButton"
import {
  NOTIFICATION_BUTTON_CLASS_DESKTOP,
  NOTIFICATION_BUTTON_CLASS_MOBILE,
} from "./constants"

type NavBarUserActionsProps = Readonly<{
  user: AuthUser
  onLogout: () => void
  variant: "desktop" | "mobile"
}>

const WRAPPER_CLASS: Record<NavBarUserActionsProps["variant"], string> = {
  desktop: "flex items-center gap-2",
  mobile:
    "flex min-w-0 max-w-sm shrink items-center justify-end gap-1.5 md:hidden",
}

const NOTIFICATION_PROPS: Record<
  NavBarUserActionsProps["variant"],
  { iconSize: number; boxClassName: string }
> = {
  desktop: {
    iconSize: 20,
    boxClassName: NOTIFICATION_BUTTON_CLASS_DESKTOP,
  },
  mobile: {
    iconSize: 18,
    boxClassName: NOTIFICATION_BUTTON_CLASS_MOBILE,
  },
}

export function NavBarUserActions({
  user,
  onLogout,
  variant,
}: NavBarUserActionsProps) {
  const { iconSize, boxClassName } = NOTIFICATION_PROPS[variant]

  return (
    <div className={WRAPPER_CLASS[variant]}>
      <NavBarNotificationButton iconSize={iconSize} boxClassName={boxClassName} />
      <NavBarAccountDropdown user={user} onLogout={onLogout} />
    </div>
  )
}
