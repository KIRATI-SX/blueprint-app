import { useState } from "react"

import { DEFAULT_ACTIVE_FILTER } from "./constants"
import type { ArticleFilter } from "./types"

export function useArticleFilter(
  initial: ArticleFilter = DEFAULT_ACTIVE_FILTER
) {
  return useState<ArticleFilter>(initial)
}
