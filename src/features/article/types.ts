import type { ARTICLE_FILTERS } from "./constants"

export type ArticleFilter = (typeof ARTICLE_FILTERS)[number]

/** สถานะโหลดรายการบทความ (ใช้ร่วมระหว่าง hook กับ UI) */
export type BlogPostsLoadState = "idle" | "loading" | "success" | "error"
