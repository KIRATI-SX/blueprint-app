import { Check } from "lucide-react"

import Button from "@/components/common/Button"

type RegistrationSuccessCardProps = Readonly<{
  onContinue: () => void
}>

export function RegistrationSuccessCard({
  onContinue,
}: RegistrationSuccessCardProps) {
  return (
    <article className="w-full max-w-[798px] h-full max-h-[376px] rounded-2xl bg-brown-200 px-8 py-10 text-center shadow-xl md:px-10">
      <header className="flex flex-col items-center gap-4 h-full">
        <div
          className="flex size-16 items-center justify-center rounded-full bg-emerald-500 text-white"
          aria-hidden
        >
          <Check className="size-8" strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-semibold text-[#222222] md:text-[1.75rem] md:leading-9">
          Registration success
        </h1>
      </header>
      <section className="mt-8" aria-label="Next step">
        <Button
          type="button"
          variant="solid"
          onClick={onContinue}
          className="h-12! w-full! max-w-full"
        >
          Continue
        </Button>
      </section>
    </article>
  )
}
