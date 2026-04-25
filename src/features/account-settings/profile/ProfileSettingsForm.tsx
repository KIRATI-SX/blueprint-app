import Button from "@/components/common/Button"
import { Input } from "@/components/ui/input"
import { PLACEHOLDER_AUTH_USER } from "@/constants/authUserPlaceholder"
import { useState } from "react"

export default function ProfileSettingsForm() {
  const [name, setName] = useState(PLACEHOLDER_AUTH_USER.displayName)
  const [username, setUsername] = useState("moodeng.cute")
  const email = "moodeng.cute@gmail.com"

  return (
    <section>
      <header className="mb-5">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <img
            src={PLACEHOLDER_AUTH_USER.avatarUrl}
            alt="Profile avatar preview"
            width={116}
            height={116}
            className="h-[116px] w-[116px] rounded-full object-cover"
          />
          <Button variant="outline" className="h-10 w-auto px-8 py-0">
            Upload profile picture
          </Button>
        </section>
      </header>

      <hr className="mb-6 h-px border-0 bg-brown-300" />

      <section className="space-y-4">
        <label className="block">
          <span className="body-2 mb-2 block text-brown-500">Name</span>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-lg border-brown-300 bg-white text-brown-600"
          />
        </label>

        <label className="block">
          <span className="body-2 mb-2 block text-brown-500">Username</span>
          <Input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="h-11 rounded-lg border-brown-300 bg-white text-brown-600"
          />
        </label>

        <label className="block">
          <span className="body-2 mb-2 block text-brown-300">Email</span>
          <Input
            value={email}
            disabled
            className="h-11 rounded-lg border-brown-300 bg-brown-100 text-brown-300"
          />
        </label>
      </section>

      <footer className="mt-6">
        <Button className="h-10 w-auto min-w-[86px] px-8 py-0">Save</Button>
      </footer>
    </section>
  )
}
