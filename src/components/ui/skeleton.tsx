import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-brown-200/90 dark:bg-brown-200/60",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
