import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuth } from "@/contexts/AuthContext"

export default function RequireAdminAuth() {
  const location = useLocation()
  const { isAdminAuthenticated } = useAuth()

  if (!isAdminAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        state={{ returnTo: location.pathname }}
        replace
      />
    )
  }

  return <Outlet />
}
