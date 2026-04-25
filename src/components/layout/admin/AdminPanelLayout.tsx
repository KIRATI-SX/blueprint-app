import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import {
  Bell,
  BookOpenText,
  FolderOpen,
  LogOut,
  RefreshCcw,
  UserRound,
} from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"

const adminNavItems = [
  {
    to: "/admin/articles",
    label: "Article management",
    icon: BookOpenText,
  },
  {
    to: "/admin/categories",
    label: "Category management",
    icon: FolderOpen,
  },
  {
    to: "/admin/profile",
    label: "Profile",
    icon: UserRound,
  },
  {
    to: "/admin/notifications",
    label: "Notification",
    icon: Bell,
  },
  {
    to: "/admin/reset-password",
    label: "Reset password",
    icon: RefreshCcw,
  },
] as const

export default function AdminPanelLayout() {
  const navigate = useNavigate()
  const { logout, logoutAdmin } = useAuth()

  function onLogout() {
    logoutAdmin()
    logout()
    navigate("/admin/login", { replace: true })
  }

  return (
    <section className="min-h-screen bg-[#F5F5F5] text-brown-600">
      <article className="fixed inset-y-0 left-0 z-10 w-[250px] border-r border-brown-300 bg-[#EFEDE9]">
        <header className="px-6 pb-6 pt-8">
          <h1 className="text-5xl font-semibold leading-none text-brown-600">
            hh<span className="text-green-600">.</span>
          </h1>
          <p className="mt-2 text-xl font-medium text-[#E3A476]">Admin panel</p>
        </header>

        <nav aria-label="Admin navigation" className="px-2">
          <ul className="space-y-1">
            {adminNavItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-base transition-colors",
                      isActive
                        ? "bg-brown-200 text-brown-600"
                        : "text-brown-500 hover:bg-brown-300 hover:text-brown-600",
                    ].join(" ")
                  }
                >
                  <Icon className="size-4" aria-hidden />
                  <span className="body-2">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="absolute inset-x-0 bottom-0 border-t border-brown-300 px-4 py-4">
          <Link
            to="/"
            className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2 text-brown-500 transition-colors hover:bg-brown-200/70 hover:text-brown-600"
          >
            <span aria-hidden>↗</span>
            <span>hh. website</span>
          </Link>

          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-brown-500 transition-colors hover:bg-brown-200/70 hover:text-brown-600"
          >
            <LogOut className="size-4" aria-hidden />
            <span>Log out</span>
          </button>
        </footer>
      </article>

      <main className="ml-[250px] min-h-screen p-8">
        <Outlet />
      </main>
    </section>
  )
}
