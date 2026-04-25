import {
  GithubIcon,
  GoogleIcon,
  LinkedinIcon,
} from "../../assets/icons/social";

const ICON_BROWN_500 = "var(--color-brown-500)";

const socialLinks = [
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "https://github.com/",
    label: "GitHub",
    icon: GithubIcon,
  },
  {
    href: "https://www.google.com/",
    label: "Google",
    icon: GoogleIcon,
  },
] as const;

export default function Footer() {
  return (
    <footer className="w-full max-md:bg-[#F2F0EB] md:bg-brown-200">
      <div className="mx-auto flex w-full max-w-full flex-col items-center justify-center gap-5 px-4 py-10 md:flex-row md:items-center md:justify-between md:gap-0 md:px-8 md:py-[60px] lg:px-[120px]">
        <div className="flex flex-row items-center justify-center gap-6 md:items-center md:gap-6">
          <p className="body-1 text-brown-500">Get in touch</p>

          <nav aria-label="Social media links">
            <ul className="flex items-center gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-fit w-fit items-center justify-center text-brown-600 transition-opacity hover:opacity-70 max-md:h-8 max-md:w-8 max-md:rounded-full "
                  >
                    <Icon size={24} color={ICON_BROWN_500} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav aria-label="Footer navigation" className="shrink-0">
          <a
            href="/"
            className="body-1 text-brown-600 underline decoration-[0%] underline-offset-[0%] md:text-left"
          >
            Home page
          </a>
        </nav>
      </div>
    </footer>
  );
}
