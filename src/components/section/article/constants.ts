export const ARTICLE_FILTERS = [
  "Highlight",
  "Cat",
  "Inspiration",
  "General",
] as const

export const DEFAULT_ACTIVE_FILTER: (typeof ARTICLE_FILTERS)[number] =
  "Highlight"

/** `htmlFor` / `id` ของ Select บน mobile */
export const ARTICLE_CATEGORY_SELECT_ID = "article-category-select"
