import type { BlogPost } from "@/types/blogPost"

import type { ArticleFilter, BlogPostsLoadState } from "../types"
import { ArticleFilterToolbar } from "./ArticleFilterToolbar"
import { ArticlePostListBlock } from "./ArticlePostListBlock"

type ArticleSectionViewProps = Readonly<{
  activeFilter: ArticleFilter
  onFilterChange: (filter: ArticleFilter) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  debouncedSearchQuery: string
  posts: readonly BlogPost[]
  lastSuccessfulNonEmptyPosts: readonly BlogPost[]
  loadState: BlogPostsLoadState
  errorMessage: string | null
}>

/**
 * จัด layout + filter; ข้อมูลรายการมาจาก parent (server-side filter + pagination)
 * ใช้ div wrapper — landmark <section> อยู่ที่ `ArticleSection`
 */
export function ArticleSectionView({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchQueryChange,
  debouncedSearchQuery,
  posts,
  lastSuccessfulNonEmptyPosts,
  loadState,
  errorMessage,
}: ArticleSectionViewProps) {
  return (
    <div
      className="flex w-full flex-col gap-12 md:px-8 lg:px-16 xl:px-[120px]"
    >
      <div className="flex flex-col items-start justify-center gap-6 md:gap-8">
        <h3 className="headline-3 pl-4 text-brown-600 md:p-0">Latest articles</h3>
        <ArticleFilterToolbar
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
          debouncedSearchQuery={debouncedSearchQuery}
          searchResults={posts}
          searchLoadState={loadState}
        />
      </div>

      <ArticlePostListBlock
        loadState={loadState}
        errorMessage={errorMessage}
        posts={posts}
        activeFilter={activeFilter}
        debouncedSearchQuery={debouncedSearchQuery}
        lastSuccessfulNonEmptyPosts={lastSuccessfulNonEmptyPosts}
      />
    </div>
  )
}
