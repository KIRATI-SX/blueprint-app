import BlogPageLayout from "@/components/layout/BlogPageLayout"

export default function ProfilePage() {
  return (
    <BlogPageLayout
      mainAriaLabel="User profile"
      mainClassName="flex flex-1 flex-col"
    >
      <section className="flex flex-1 flex-col px-4 py-10 sm:px-6 md:px-12 lg:px-[120px]">
        <header className="mb-4">
          <h1 className="headline-2 text-brown-600">Profile</h1>
        </header>
        <article>
          <p className="body-1 text-brown-400">
            This is a placeholder profile page. Add account details here later.
          </p>
        </article>
      </section>
    </BlogPageLayout>
  )
}
