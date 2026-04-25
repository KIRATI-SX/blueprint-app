import { useState } from "react"

import Button from "@/components/common/Button"
import { Input } from "@/components/ui/input"

export default function AdminResetPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <section>
      <header className="mb-6 flex items-center justify-between border-b border-brown-300 pb-4">
        <h1 className="text-3xl font-semibold text-brown-600">Reset password</h1>
        <Button type="button" className="h-10 w-auto min-w-[132px] px-8 py-0">
          Reset password
        </Button>
      </header>

      <article className="max-w-[760px]">
        <section className="max-w-[420px] space-y-10">
          <label className="block">
            <span className="body-2 mb-2 block text-brown-500">Current password</span>
            <Input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="h-11 rounded-lg border-brown-300 bg-white text-brown-600 placeholder:text-brown-400"
            />
          </label>

          <label className="block">
            <span className="body-2 mb-2 block text-brown-500">New password</span>
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="h-11 rounded-lg border-brown-300 bg-white text-brown-600 placeholder:text-brown-400"
            />
          </label>

          <label className="block">
            <span className="body-2 mb-2 block text-brown-500">Confirm new password</span>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="h-11 rounded-lg border-brown-300 bg-white text-brown-600 placeholder:text-brown-400"
            />
          </label>
        </section>
      </article>
    </section>
  )
}
