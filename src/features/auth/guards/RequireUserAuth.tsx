import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuth } from "@/contexts/AuthContext"

export default function RequireUserAuth() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ returnTo: location.pathname }}
        replace
      />
    )
  }

  return <Outlet />
}
