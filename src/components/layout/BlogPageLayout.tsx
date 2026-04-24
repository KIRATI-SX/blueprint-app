import type { ReactNode } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

type BlogPageLayoutProps = Readonly<{
  children: ReactNode;
  mainClassName?: string;
  mainAriaLabel?: string;
}>;

export default function BlogPageLayout({
  children,
  mainClassName,
  mainAriaLabel,
}: BlogPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavBar />
      <main
        className={mainClassName ?? "flex flex-1 flex-col"}
        {...(mainAriaLabel ? { "aria-label": mainAriaLabel } : {})}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
