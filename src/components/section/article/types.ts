import type { ARTICLE_FILTERS } from "./constants"

export type ArticleFilter = (typeof ARTICLE_FILTERS)[number]
