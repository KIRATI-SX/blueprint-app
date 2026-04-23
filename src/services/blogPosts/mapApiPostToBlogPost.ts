import type { BlogPost } from "@/types/blogPost"

import type { ApiPostRaw } from "./postsApiTypes"

const DISPLAY_LOCALE = "en-GB" as const

/**
 * แปลง DTO จาก API → โมเดลที่ UI ใช้ (format วันที่, publishedAt สำหรับ semantic time)
 */
export function mapApiPostToBlogPost(raw: ApiPostRaw): BlogPost {
  const published = new Date(raw.date)
  const valid = !Number.isNaN(published.getTime())

  return {
    id: raw.id,
    image: raw.image,
    category: raw.category,
    title: raw.title,
    description: raw.description,
    author: raw.author,
    date: valid
      ? published.toLocaleDateString(DISPLAY_LOCALE, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : raw.date,
    publishedAt: valid ? raw.date : undefined,
    likes: raw.likes,
    content: raw.content,
  }
}
