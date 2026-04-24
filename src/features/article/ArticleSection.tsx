import { useState } from "react"

import Button from "@/components/common/Button"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"

import { ArticleSectionView } from "./components/ArticleSectionView"
import { useArticleFilter } from "./hooks/useArticleFilter"
import { useArticlePosts } from "./hooks/useArticlePosts"

const SEARCH_DEBOUNCE_MS = 3000

export default function ArticleSection() {
  const [activeFilter, setActiveFilter] = useArticleFilter()
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebouncedValue(searchQuery, SEARCH_DEBOUNCE_MS)
  const {
    posts,
    loadState,
    errorMessage,
    loadMore,
    hasMore,
    isLoadingMore,
    loadMoreError,
  } = useArticlePosts(activeFilter, debouncedSearchQuery)

  return (
    <section
      aria-label="Article section"
      className="flex w-full flex-col items-center gap-20 mb-10"
    >
      <ArticleSectionView
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        debouncedSearchQuery={debouncedSearchQuery}
        posts={posts}
        loadState={loadState}
        errorMessage={errorMessage}
      />
      {loadState === "success" && hasMore && (
        <div className="mb-10 flex w-full max-w-3xl flex-col items-center gap-2 px-4">
          {loadMoreError && (
            <p className="body-2 text-center text-red-700" role="alert">
              {loadMoreError}
            </p>
          )}
          <Button
            variant="text"
            className="mb-0 h-10 w-fit"
            onClick={loadMore}
            disabled={isLoadingMore}
            aria-busy={isLoadingMore}
          >
            {isLoadingMore ? "Loading…" : "View more"}
          </Button>
        </div>
      )}
    </section>
  )
}
