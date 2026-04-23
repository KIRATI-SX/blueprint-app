import { BlogCard } from "./BlogCard"
import { ArticleFilterToolbar } from "./ArticleFilterToolbar"
import type { BlogPost } from "./blogPost"
import type { ArticleFilter } from "./types"

type ArticleSectionViewProps = Readonly<{
  activeFilter: ArticleFilter
  onFilterChange: (filter: ArticleFilter) => void
  posts: readonly BlogPost[]
}>

export function ArticleSectionView({
  activeFilter,
  onFilterChange,
  posts,
}: ArticleSectionViewProps) {
  return (
    <section
      aria-label="Article section"
      className="flex w-full flex-col gap-12 md:px-8 lg:px-16 xl:px-[120px]"
    >
      <div className="flex flex-col items-start justify-center gap-6 md:gap-8">
        <h3 className="headline-3 pl-4 text-brown-600 md:p-0">Latest articles</h3>
        <ArticleFilterToolbar
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />
      </div>

      <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-2">
        {posts.map((post) => (
          <li key={post.id} className="min-w-0">
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  )
}
