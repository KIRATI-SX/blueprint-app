import { useLocation } from "react-router-dom"

import BlogPageLayout from "@/components/layout/BlogPageLayout"
import {
  RegistrationSuccessCard,
  useContinueNavigation,
  type SignUpToRegistrationSuccessState,
} from "@/features/auth/registration-success"

function parseSuccessState(
  value: unknown,
): SignUpToRegistrationSuccessState | null {
  if (value == null || typeof value !== "object") {
    return null
  }
  const v = value as Partial<SignUpToRegistrationSuccessState>
  if ("returnTo" in v || "fromLoginFlow" in v) {
    return {
      returnTo: typeof v.returnTo === "string" ? v.returnTo : null,
      fromLoginFlow: v.fromLoginFlow === true,
    }
  }
  return null
}

export default function RegistrationSuccessPage() {
  const { state } = useLocation()
  const parsed = parseSuccessState(state)
  const onContinue = useContinueNavigation({ state: parsed })

  return (
    <BlogPageLayout
      mainAriaLabel="Registration success"
      mainClassName="flex min-h-0 flex-1 flex-col bg-[#F9F9F9]"
    >
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
        <RegistrationSuccessCard onContinue={onContinue} />
      </section>
    </BlogPageLayout>
  )
}
