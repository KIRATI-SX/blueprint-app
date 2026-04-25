import Button from "@/components/common/Button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ResetPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  return (
    <section>
      <section className="space-y-4">
        <label className="block">
          <span className="body-2 mb-2 block text-brown-500">Current password</span>
          <Input
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            placeholder="Current password"
            className="h-11 rounded-lg border-brown-300 bg-white text-brown-600"
          />
        </label>

        <label className="block">
          <span className="body-2 mb-2 block text-brown-500">New password</span>
          <Input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="New password"
            className="h-11 rounded-lg border-brown-300 bg-white text-brown-600"
          />
        </label>

        <label className="block">
          <span className="body-2 mb-2 block text-brown-500">
            Confirm new password
          </span>
          <Input
            type="password"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            placeholder="Confirm new password"
            className="h-11 rounded-lg border-brown-300 bg-white text-brown-600"
          />
        </label>
      </section>

      <footer className="mt-6">
        <Button className="h-10 w-auto px-8 py-0">Reset password</Button>
      </footer>
    </section>
  )
}
