import { useEffect, useId, useRef, useState } from "react"

const SEARCH_FIELD_IDLE_KEY = "search-field-idle" as const
import { Link } from "react-router-dom"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types/blogPost"

import { ARTICLE_FILTERS, ARTICLE_CATEGORY_SELECT_ID } from "../constants"
import type { ArticleFilter, BlogPostsLoadState } from "../types"

type ArticleFilterToolbarProps = Readonly<{
  activeFilter: ArticleFilter
  onFilterChange: (filter: ArticleFilter) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  debouncedSearchQuery: string
  searchResults: readonly BlogPost[]
  searchLoadState: BlogPostsLoadState
}>

export function ArticleFilterToolbar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchQueryChange,
  debouncedSearchQuery,
  searchResults,
  searchLoadState,
}: ArticleFilterToolbarProps) {
  return (
    <div
      className="flex h-[172px] md:h-fit w-full flex-col gap-4 overflow-visible bg-brown-200 p-4 md:min-h-20 md:flex-row md:flex-wrap md:items-center md:justify-between md:rounded-2xl"
      role="toolbar"
      aria-label="Filter and search articles"
    >
      <CategoryFilterTabs
        activeFilter={activeFilter}
        onSelect={onFilterChange}
      />
      <ArticleSearchField
        key={
          debouncedSearchQuery.trim() === ""
            ? SEARCH_FIELD_IDLE_KEY
            : debouncedSearchQuery
        }
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        debouncedSearchQuery={debouncedSearchQuery}
        searchResults={searchResults}
        searchLoadState={searchLoadState}
      />
      <MobileCategorySelect
        activeFilter={activeFilter}
        onSelect={onFilterChange}
      />
    </div>
  )
}

function CategoryFilterTabs({
  activeFilter,
  onSelect,
}: Readonly<{
  activeFilter: ArticleFilter
  onSelect: (filter: ArticleFilter) => void
}>) {
  return (
    <div
      className="hidden flex-wrap items-center gap-1 md:flex"
      role="tablist"
      aria-label="Article category filters"
    >
      {ARTICLE_FILTERS.map((label) => {
        const isActive = activeFilter === label
        return (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(label)}
            className={cn(
              "h-12 rounded-md px-3 py-1.5 text-sm font-medium text-brown-500 transition-colors outline-none",
              "focus-visible:ring-2 focus-visible:ring-brown-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brown-200 hover:bg-brown-400/10 hover:text-brown-600",
              isActive
                ? "bg-brown-300 text-brown-600 hover:bg-brown-300"
                : "bg-transparent text-brown-500 hover:text-brown-600"
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

function ArticleSearchField({
  searchQuery,
  onSearchQueryChange,
  debouncedSearchQuery,
  searchResults,
  searchLoadState,
}: Readonly<{
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  debouncedSearchQuery: string
  searchResults: readonly BlogPost[]
  searchLoadState: BlogPostsLoadState
}>) {
  const listId = useId()
  const searchRootRef = useRef<HTMLElement | null>(null)
  const [isResultPanelOpen, setIsResultPanelOpen] = useState(true)
  const hasActiveKeyword = debouncedSearchQuery.trim() !== ""
  const showResultPanel
    = hasActiveKeyword
      && isResultPanelOpen
      && (searchLoadState === "success"
        || searchLoadState === "loading"
        || searchLoadState === "error")

  useEffect(() => {
    if (!hasActiveKeyword) {
      return
    }
    const onPointerDown = (e: PointerEvent) => {
      const root = searchRootRef.current
      if (root && !root.contains(e.target as Node)) {
        setIsResultPanelOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown, true)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true)
    }
  }, [hasActiveKeyword])

  return (
    <section
      ref={searchRootRef}
      className="relative w-full max-w-[360px] md:shrink-0"
      role="search"
      aria-label="Search articles by title, description, or content"
    >
      <div className="relative h-12 w-full">
        <Input
          id="article-search-input"
          type="search"
          name="article-search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onFocus={() => setIsResultPanelOpen(true)}
          className="article-search-clear h-12 w-full min-h-0 border-brown-200 bg-white py-0 pr-9 text-base leading-normal shadow-none placeholder:text-brown-400 dark:bg-white"
          aria-label="Search articles"
          autoComplete="off"
          role="combobox"
          aria-expanded={showResultPanel}
          aria-autocomplete="list"
          aria-controls={showResultPanel ? listId : undefined}
        />
        <span
          className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center"
          aria-hidden
        >
          <Search className="size-4 text-brown-400" strokeWidth={1.5} />
        </span>
      </div>
      {showResultPanel && (
        <nav
          id={listId}
          className="absolute z-50 mt-1 w-full min-w-0 overflow-hidden rounded-xl border border-brown-200 bg-white py-1 shadow-md dark:bg-white"
          aria-label="Search result titles"
        >
          {searchLoadState === "loading" && (
            <output
              className="flex items-center justify-center gap-2 px-3 py-4 text-sm text-brown-500"
              aria-live="polite"
            >
              <Spinner className="size-5" />
              <span>Loading…</span>
            </output>
          )}
          {searchLoadState === "error" && (
            <p className="px-3 py-3 text-sm text-red-700" role="alert">
              Unable to load results. Please try again.
            </p>
          )}
          {searchLoadState === "success" && searchResults.length === 0 && (
            <p className="px-3 py-3 text-sm text-brown-500">
              No articles match this search.
            </p>
          )}
          {searchLoadState === "success" && searchResults.length > 0 && (
            <ul className="max-h-72 overflow-y-auto">
              {searchResults.map((post) => (
                <li key={post.id}>
                  <Link
                    to={`/post/${post.id}`}
                    className="block px-3 py-2.5 text-left text-sm leading-snug text-brown-600 outline-none transition-colors hover:bg-brown-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brown-400"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      )}
    </section>
  )
}

function MobileCategorySelect({
  activeFilter,
  onSelect,
}: Readonly<{
  activeFilter: ArticleFilter
  onSelect: (filter: ArticleFilter) => void
}>) {
  return (
    <div className="flex h-[76px] max-h w-full max-w-[343px] flex-col gap-1 md:hidden">
      <label
        className="text-sm text-brown-400"
        htmlFor={ARTICLE_CATEGORY_SELECT_ID}
      >
        Category
      </label>
      <Select
        value={activeFilter}
        onValueChange={(value) => onSelect(value as ArticleFilter)}
      >
        <SelectTrigger
          id={ARTICLE_CATEGORY_SELECT_ID}
          className="data-[size=default]:h-[48px] h-[48px] w-[343px] max-w-full border-brown-200 bg-white py-0 pl-2.5 pr-2 text-base font-medium text-brown-600 shadow-none dark:bg-white [&_svg]:text-brown-400!"
        >
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {ARTICLE_FILTERS.map((label) => (
            <SelectItem key={label} value={label} className="h-[48px]">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
