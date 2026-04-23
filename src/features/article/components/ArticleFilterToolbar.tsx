import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { ARTICLE_FILTERS, ARTICLE_CATEGORY_SELECT_ID } from "../constants"
import type { ArticleFilter } from "../types"

type ArticleFilterToolbarProps = Readonly<{
  activeFilter: ArticleFilter
  onFilterChange: (filter: ArticleFilter) => void
}>

export function ArticleFilterToolbar({
  activeFilter,
  onFilterChange,
}: ArticleFilterToolbarProps) {
  return (
    <div
      className="flex h-[172px] w-full flex-col gap-4 bg-brown-200 p-4 md:h-20 md:max-h-[80px] md:flex-row md:flex-wrap md:items-center md:justify-between md:rounded-2xl"
      role="toolbar"
      aria-label="Filter and search articles"
    >
      <CategoryFilterTabs
        activeFilter={activeFilter}
        onSelect={onFilterChange}
      />
      <ArticleSearchField />
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

function ArticleSearchField() {
  return (
    <div className="relative h-12 w-full max-w-[360px] md:shrink-0">
      <Input
        type="search"
        name="article-search"
        placeholder="Search"
        className="h-12 w-full min-h-0 border-brown-200 bg-white py-0 pr-9 text-base leading-normal shadow-none placeholder:text-brown-400 dark:bg-white"
        aria-label="Search articles"
      />
      <span
        className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center"
        aria-hidden
      >
        <Search className="size-4 text-brown-400" strokeWidth={1.5} />
      </span>
    </div>
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
    <div className="flex h-[76px] w-full max-w-[343px] flex-col gap-1 md:hidden">
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
