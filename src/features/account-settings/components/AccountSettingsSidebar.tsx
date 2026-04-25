import {
  RefreshLightIcon,
  UserDuotoneIcon,
} from "@/assets/icons/icon-base"
import { PLACEHOLDER_AUTH_USER } from "@/constants/authUserPlaceholder"
import type { AccountSettingsTab } from "@/features/account-settings/model/types"
import { Link } from "react-router-dom"
import { preloadRoute } from "@/app/route-preload"

type AccountSettingsSidebarProps = Readonly<{
  activeTab: AccountSettingsTab
}>

const navItems: ReadonlyArray<{
  key: AccountSettingsTab
  label: string
  to: string
  Icon: typeof UserDuotoneIcon
}> = [
  { key: "profile", label: "Profile", to: "/profile", Icon: UserDuotoneIcon },
  {
    key: "reset-password",
    label: "Reset password",
    to: "/reset-password",
    Icon: RefreshLightIcon,
  },
]

export default function AccountSettingsSidebar({
  activeTab,
}: AccountSettingsSidebarProps) {
  return (
    <aside className="w-full max-w-[18rem] shrink-0">
      <section className="mb-8 flex items-center gap-3">
        <img
          src={PLACEHOLDER_AUTH_USER.avatarUrl}
          alt={`${PLACEHOLDER_AUTH_USER.displayName} avatar`}
          width={52}
          height={52}
          className="h-[52px] w-[52px] rounded-full object-cover"
        />
        <p className="body-1 truncate text-brown-500">
          {PLACEHOLDER_AUTH_USER.displayName}
        </p>
      </section>
      <nav aria-label="Account settings navigation">
        <ul className="flex flex-col gap-2 p-0">
          {navItems.map(({ key, label, to, Icon }) => {
            const isActive = activeTab === key
            return (
              <li key={key} className="list-none">
                <Link
                  to={to}
                  aria-current={isActive ? "page" : undefined}
                  className="body-2 flex items-center gap-2 rounded-lg px-2 py-2 text-brown-500 transition-colors hover:bg-brown-200/60"
                  onMouseEnter={() => preloadRoute(to)}
                  onFocus={() => preloadRoute(to)}
                  onTouchStart={() => preloadRoute(to)}
                >
                  <Icon
                    size={16}
                    className={
                      isActive ? "text-brown-600" : "text-brown-300"
                    }
                    aria-hidden
                  />
                  <span className={isActive ? "text-brown-600" : ""}>{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
