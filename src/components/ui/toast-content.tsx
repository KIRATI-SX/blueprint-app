import { X } from "lucide-react"
import { type ReactNode } from "react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

type AppToastType = "error" | "success"

type ToastAction = {
  label: string
  onClick: () => void
}

interface ToastContentProps {
  type: AppToastType
  title: string
  description?: string
  closeButton: boolean
  icon?: ReactNode
  className?: string
  toastId: string | number
  action?: ToastAction
  cancel?: ToastAction
  important?: boolean
}

const toastVariantClass: Record<AppToastType, string> = {
  error: "bg-[#E8536A] text-white",
  success: "bg-[#19B37D] text-white",
}

export function ToastContent({
  type,
  title,
  description,
  closeButton,
  icon,
  className,
  toastId,
  action,
  cancel,
  important,
}: Readonly<ToastContentProps>) {
  return (
    <section
      role="status"
      aria-live={important ? "assertive" : "polite"}
      className={cn(
        "relative w-full min-w-[320px] rounded-xl px-6 py-5 pr-12 shadow-lg",
        toastVariantClass[type],
        className
      )}
    >
      <header className="mb-2 flex items-start gap-2">
        {icon ? <span className="mt-0.5 shrink-0">{icon}</span> : null}
        <h4 className="text-[2.5rem] leading-none font-semibold tracking-tight sm:text-[2.1rem]">
          {title}
        </h4>
      </header>
      {description ? (
        <p className="max-w-[95%] text-[1.3rem] leading-snug font-normal opacity-95 sm:text-[1.15rem]">
          {description}
        </p>
      ) : null}
      {action || cancel ? (
        <div className="mt-4 flex items-center gap-2">
          {action ? (
            <button
              type="button"
              onClick={() => {
                action.onClick()
                toast.dismiss(toastId)
              }}
              className="rounded-md bg-white/20 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/30"
            >
              {action.label}
            </button>
          ) : null}
          {cancel ? (
            <button
              type="button"
              onClick={() => {
                cancel.onClick()
                toast.dismiss(toastId)
              }}
              className="rounded-md border border-white/50 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              {cancel.label}
            </button>
          ) : null}
        </div>
      ) : null}

      {closeButton ? (
        <button
          type="button"
          onClick={() => toast.dismiss(toastId)}
          className="absolute top-4 right-4 inline-flex items-center justify-center rounded-md p-1 text-white/90 transition hover:bg-white/10 hover:text-white"
          aria-label="Close notification"
        >
          <X className="size-5" />
        </button>
      ) : null}
    </section>
  )
}
