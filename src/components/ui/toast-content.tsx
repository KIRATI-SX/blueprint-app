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
  toastId?: string | number
  action?: ToastAction
  cancel?: ToastAction
  important?: boolean
}

const toastVariantClass: Record<AppToastType, string> = {
  error: "bg-[#EB5164] text-white",
  success: "bg-[#12B279] text-white",
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
  const dismissToast = () => {
    toast.dismiss(toastId)
  }

  return (
    <section
      role="status"
      aria-live={important ? "assertive" : "polite"}
      className={cn(
        "relative w-full min-w-[500px] rounded-xl px-6 py-5 pr-12 shadow-xl",
        toastVariantClass[type],
        className
      )}
    >
      <header className="mb-2 flex items-start gap-2">
        {icon ? <span className="mt-0.5 shrink-0">{icon}</span> : null}
        <h4 className="headline-4 leading-none font-semibold tracking-tight sm:headline-4">
          {title}
        </h4>
      </header>
      {description ? (
        <p className="max-w-[95%] body-2 leading-snug font-normal opacity-95 sm:text-[1.15rem]">
          {description}
        </p>
      ) : null}
      {action || cancel ? (
        <div className="mt-4 flex items-center gap-2">
          {action ? (
            <button
              type="button"
              onClick={() => {
                try {
                  action.onClick()
                } finally {
                  dismissToast()
                }
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
                try {
                  cancel.onClick()
                } finally {
                  dismissToast()
                }
              }}
              className="rounded-full border border-white/50 px-3 py-1.5 body-2 font-medium text-white transition hover:bg-white/10"
            >
              {cancel.label}
            </button>
          ) : null}
        </div>
      ) : null}

      {closeButton ? (
        <button
          type="button"
          onClick={dismissToast}
          className="absolute top-4 right-4 inline-flex items-center justify-center rounded-md p-1 text-white/90 transition hover:bg-white/10 hover:text-white"
          aria-label="Close notification"
        >
          <X className="size-5" />
        </button>
      ) : null}
    </section>
  )
}
