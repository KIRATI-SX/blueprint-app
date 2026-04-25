import { Toaster as Sonner, type ToasterProps } from "sonner"

import { cn } from "@/lib/utils"

type AppToasterProps = ToasterProps

function Toaster({ className, ...props }: Readonly<AppToasterProps>) {
  return (
    <Sonner
      closeButton
      richColors={false}
      toastOptions={{
        classNames: {
          closeButton:
            "border-0 bg-transparent text-white/90 hover:bg-white/10 hover:text-white",
        },
      }}
      className={cn("toaster group", className)}
      {...props}
    />
  )
}

export { Toaster }
