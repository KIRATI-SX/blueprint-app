import { type ReactNode } from "react"
import { toast, type ExternalToast } from "sonner"

import { ToastContent } from "@/components/ui/toast-content"

export type AppToastType = "error" | "success"
export type AppToastPosition = NonNullable<ExternalToast["position"]>

export interface ShowToastOptions {
  type?: AppToastType
  title: string
  description?: string
  position?: AppToastPosition
  duration?: number
  id?: string | number
  dismissible?: boolean
  closeButton?: boolean
  icon?: ReactNode
  className?: string
  important?: boolean
  action?: {
    label: string
    onClick: () => void
  }
  cancel?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
}

type ShowToastFn = {
  (options: ShowToastOptions): string | number
  error: (options: Omit<ShowToastOptions, "type">) => string | number
  success: (options: Omit<ShowToastOptions, "type">) => string | number
}

function createToastId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `toast-${Date.now()}-${Math.random()}`
}

export const showToast: ShowToastFn = ({
  type = "success",
  title,
  description,
  position = "top-center",
  duration = 4000,
  id,
  dismissible = true,
  closeButton = true,
  icon,
  className,
  important = false,
  action,
  cancel,
  onDismiss,
}: ShowToastOptions) => {
  const dismissId = id ?? createToastId()

  return toast.custom(
    () => (
      <ToastContent
        type={type}
        title={title}
        description={description}
        closeButton={closeButton}
        icon={icon}
        className={className}
        toastId={dismissId}
        action={action}
        cancel={cancel}
        important={important}
      />
    ),
    {
      id: dismissId,
      position,
      duration: important ? Math.max(duration, 6000) : duration,
      dismissible,
      onDismiss,
      unstyled: true,
    }
  )
}

showToast.error = (options: Omit<ShowToastOptions, "type">) =>
  showToast({ ...options, type: "error" })

showToast.success = (options: Omit<ShowToastOptions, "type">) =>
  showToast({ ...options, type: "success" })
