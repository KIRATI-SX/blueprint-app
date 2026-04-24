import type { BlogPost } from "@/types/blogPost"

import type { ArticleFilter } from "../types"

/**
 * กฎการกรองตามแท็บ — pure function ทดสอบ/เปลี่ยนได้ง่าย
 */
export function filterPostsByArticleFilter(
  posts: readonly BlogPost[],
  activeFilter: ArticleFilter,
): BlogPost[] {
  if (activeFilter === "Highlight") {
    return [...posts]
  }
  return posts.filter((p) => p.category === activeFilter)
}
