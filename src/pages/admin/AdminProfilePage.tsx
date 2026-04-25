import { useState } from "react"

import Button from "@/components/common/Button"
import { Input } from "@/components/ui/input"
import { PLACEHOLDER_AUTH_USER } from "@/constants/authUserPlaceholder"

const DEFAULT_BIO = `I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.

When i'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.`

export default function AdminProfilePage() {
  const [name, setName] = useState("Thompson P.")
  const [username, setUsername] = useState("thompson")
  const [email, setEmail] = useState("thompson.p@gmail.com")
  const [bio, setBio] = useState(DEFAULT_BIO)

  return (
    <section>
      <header className="mb-6 flex items-center justify-between border-b border-brown-300 pb-4">
        <h1 className="text-3xl font-semibold text-brown-600">Profile</h1>
        <Button type="button" className="h-10 w-auto min-w-[102px] px-8 py-0">
          Save
        </Button>
      </header>

      <article className="max-w-full">
        <section className="mb-6 flex flex-wrap items-center gap-5">
          <img
            src={PLACEHOLDER_AUTH_USER.avatarUrl}
            alt="Admin profile avatar"
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover"
          />
          <Button type="button" variant="outline" className="h-10 w-auto px-8 py-0">
            Upload profile picture
          </Button>
        </section>

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
            <span className="body-2 mb-2 block text-brown-500">Email</span>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 rounded-lg border-brown-300 bg-white text-brown-600"
            />
          </label>

          <label className="block">
            <span className="body-2 mb-2 block text-brown-500">Bio (max 120 letters)</span>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              rows={5}
              className="min-h-[116px] w-full rounded-lg border border-brown-300 bg-white px-3 py-2 text-base text-brown-600 outline-none transition-colors placeholder:text-brown-400 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </label>
        </section>
      </article>
    </section>
  )
}
