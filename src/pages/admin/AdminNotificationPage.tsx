import { Link } from "react-router-dom"

import { PLACEHOLDER_AUTH_USER } from "@/constants/authUserPlaceholder"

const notifications = [
  {
    id: "1",
    actor: "Jacob Lash",
    message:
      "Commented on your article: The Fascinating World of Cats: Why We Love Our Furry Friends",
    detail:
      "“I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.”",
    timeAgo: "4 hours ago",
  },
  {
    id: "2",
    actor: "Jacob Lash",
    message: "liked your article: The Fascinating World of Cats: Why We Love Our Furry Friends",
    detail: "",
    timeAgo: "4 hours ago",
  },
]

export default function AdminNotificationPage() {
  return (
    <section>
      <header className="mb-6 border-b border-brown-300 pb-4">
        <h1 className="text-3xl font-semibold text-brown-600">Notification</h1>
      </header>

      <article className="max-w-full">
        {notifications.map((notification, index) => (
          <section
            key={notification.id}
            className={index === 0 ? "border-b border-brown-300 pb-6" : "border-b border-brown-300 py-6"}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <img
                  src={PLACEHOLDER_AUTH_USER.avatarUrl}
                  alt={`${notification.actor} avatar`}
                  width={32}
                  height={32}
                  className="mt-0.5 h-8 w-8 rounded-full object-cover"
                />

                <div className="max-w-[740px]">
                  <p className="text-base leading-6 text-brown-500">
                    <strong className="font-semibold text-brown-600">{notification.actor}</strong>{" "}
                    {notification.message}
                  </p>
                  {notification.detail ? (
                    <p className="mt-1 text-base leading-6 text-brown-600">{notification.detail}</p>
                  ) : null}
                  <p className="mt-1 text-sm font-medium text-[#E3A476]">{notification.timeAgo}</p>
                </div>
              </div>

              <Link
                to="/"
                className="mt-0.5 text-base font-medium text-brown-600 underline underline-offset-2 transition-colors hover:text-brown-500"
              >
                View
              </Link>
            </div>
          </section>
        ))}
      </article>
    </section>
  )
}
