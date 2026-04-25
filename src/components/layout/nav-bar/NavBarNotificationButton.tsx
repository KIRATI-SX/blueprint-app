import { BellLightIcon } from "@/assets/icons/icon-base"

type NavBarNotificationButtonProps = Readonly<{
  iconSize: number
  boxClassName: string
}>

export function NavBarNotificationButton({
  iconSize,
  boxClassName,
}: NavBarNotificationButtonProps) {
  return (
    <button
      type="button"
      className={boxClassName}
      aria-label="Notifications"
    >
      <BellLightIcon
        size={iconSize}
        className="text-current"
        aria-hidden
      />
    </button>
  )
}
