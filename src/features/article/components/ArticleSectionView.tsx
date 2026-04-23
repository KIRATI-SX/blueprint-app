import { useMemo } from "react"

import { useBlogPosts } from "@/hooks/useBlogPosts"
import { filterPostsByArticleFilter } from "../model/filterPostsByArticleFilter"
import type { ArticleFilter } from "../types"
import { ArticleFilterToolbar } from "./ArticleFilterToolbar"
import { ArticlePostListBlock } from "./ArticlePostListBlock"

type ArticleSectionViewProps = Readonly<{
  activeFilter: ArticleFilter
  onFilterChange: (filter: ArticleFilter) => void
}>

/**
 * จัด layout + ประกอบ hook / filter; ไม่รวม HTTP หรือ map กับ API
 */
export function ArticleSectionView({
  activeFilter,
  onFilterChange,
}: ArticleSectionViewProps) {
  const { posts, loadState, errorMessage } = useBlogPosts()
  const filteredPosts = useMemo(
    () => filterPostsByArticleFilter(posts, activeFilter),
    [posts, activeFilter],
  )

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

      <ArticlePostListBlock
        loadState={loadState}
        errorMessage={errorMessage}
        posts={filteredPosts}
      />
    </section>
  )
}
