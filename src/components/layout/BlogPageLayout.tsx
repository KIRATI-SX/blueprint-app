import type { ReactNode } from "react";
import Footer from "./Footer";
import { NavBar } from "./nav-bar";

interface BlogPageLayoutProps {
  children: ReactNode;
  mainClassName?: string;
  mainAriaLabel?: string;
}

export default function BlogPageLayout({
  children,
  mainClassName,
  mainAriaLabel,
}: Readonly<BlogPageLayoutProps>) {
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
