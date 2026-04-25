import BlogPageLayout from "@/components/layout/BlogPageLayout";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <BlogPageLayout
      mainAriaLabel="Page not found"
      mainClassName="flex flex-1 flex-col "
    >
      <section className="flex flex-1 items-center justify-center px-4 py-10">
        <article className="flex w-full max-w-md flex-col items-center gap-6 text-center">
          <header className="flex flex-col items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-brown-600 text-[2rem] leading-none text-brown-600"
              aria-hidden="true"
            >
              !
            </div>
            <h1 className="headline-3 text-brown-600">Page Not Found</h1>
          </header>

          <Link
            to="/"
            className="inline-flex h-12 min-w-[146px] items-center justify-center rounded-full border border-transparent bg-brown-600 px-6 text-base font-medium text-white transition-colors hover:bg-brown-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown-500 focus-visible:ring-offset-2"
          >
            Go To Homepage
          </Link>
        </article>
      </section>
    </BlogPageLayout>
  );
}
