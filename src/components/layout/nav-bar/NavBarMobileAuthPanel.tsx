import { NavBarGuestAuthLinks } from "./NavBarGuestAuthLinks"

type NavBarMobileAuthPanelProps = Readonly<{
  id: string
  headingId: string
  onLinkNavigate: () => void
}>

export function NavBarMobileAuthPanel({
  id,
  headingId,
  onLinkNavigate,
}: NavBarMobileAuthPanelProps) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="absolute top-full right-0 left-0 z-50 md:hidden max-md:border-b-4 max-md:border-brown-200 max-md:bg-white max-md:shadow-md"
    >
      <h2 id={headingId} className="sr-only">
        Account
      </h2>
      <div className="flex flex-col gap-3 max-md:px-6 max-md:py-4">
        <NavBarGuestAuthLinks onNavigate={onLinkNavigate} />
      </div>
    </section>
  )
}
