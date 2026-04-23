import { GithubIcon, GoogleIcon, LinkedinIcon } from "../../assets/icons/social";

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
];

export default function Footer() {
  return (
    <footer className="w-full bg-brown-200">
      <section className="mx-auto flex h-[144px] w-full items-center justify-between px-[120px] py-[60px]">
        <section className="flex items-center gap-6">
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
                    className="inline-flex h-5 w-5 items-center justify-center text-brown-600 transition-opacity hover:opacity-70"
                  >
                    <Icon size={24} color={ICON_BROWN_500} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <nav aria-label="Footer navigation">
          <a
            href="/"
            className="body-1 text-brown-600 underline underline-offset-[0%] decoration-[0%]"
          >
            Home page
          </a>
        </nav>
      </section>
    </footer>
  );
}
