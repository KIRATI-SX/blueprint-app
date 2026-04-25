import { BellLightIcon } from "@/assets/icons/icon-base";
import { useEffect, useId, useRef, useState } from "react";

type NavBarNotificationButtonProps = Readonly<{
  iconSize: number;
  boxClassName: string;
}>;

type MockNotification = Readonly<{
  id: string;
  author: string;
  message: string;
  timeLabel: string;
  avatarFallback: string;
  avatarClassName: string;
}>;

const MOCK_NOTIFICATIONS: ReadonlyArray<MockNotification> = [
  {
    id: "1",
    author: "Thompson P.",
    message: "Published new article.",
    timeLabel: "2 hours ago",
    avatarFallback: "TP",
    avatarClassName: "bg-[#D9E7A6] text-[#5B6C24]",
  },
  {
    id: "2",
    author: "Jacob Lash",
    message: "Comment on the article you have commented on.",
    timeLabel: "12 September 2024 at 18:30",
    avatarFallback: "JL",
    avatarClassName: "bg-[#1E1E1E] text-white",
  },
];

export function NavBarNotificationButton({
  iconSize,
  boxClassName,
}: NavBarNotificationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const notificationPanelId = useId();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (!wrapperRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <section ref={wrapperRef} className="relative">
      <button
        type="button"
        className={boxClassName}
        aria-label="Notifications"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={notificationPanelId}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <BellLightIcon size={iconSize} className="text-current" aria-hidden />
      </button>

      {isOpen ? (
        <article
          id={notificationPanelId}
          aria-label="Notification list"
          className="absolute left-[-140px] sm:right-0 top-[calc(100%+12px)] z-50 w-[362px] max-w-[calc(100vw-24px)] rounded-2xl border border-brown-200 bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
        >
          <ul className="space-y-4">
            {MOCK_NOTIFICATIONS.map((notification) => (
              <li
                key={notification.id}
                className="flex items-start gap-3 hover:bg-brown-100 p-2 rounded-lg"
              >
                <div
                  className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${notification.avatarClassName} `}
                  aria-hidden
                >
                  {notification.avatarFallback}
                </div>

                <div className="min-w-0">
                  <p className="body-2 font-normal leading-[1.35] text-[#6B6761]">
                    <span className="font-semibold text-[#26231E]">
                      {notification.author}{" "}
                    <span className="line-clamp-1">{notification.message}</span>
                    </span>
                  </p>
                  <p className="mt-1 body-3 font-medium text-[#E6A57E]">
                    {notification.timeLabel}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      ) : null}
    </section>
  );
}
