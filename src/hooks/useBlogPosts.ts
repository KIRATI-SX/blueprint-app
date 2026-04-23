import { useEffect, useState } from "react"

import { fetchBlogPosts } from "@/services/blogPosts/blogPostsService"
import type { BlogPost } from "@/types/blogPost"
import type { BlogPostsLoadState } from "@/features/article/types"

const DEFAULT_ERROR = "Unable to load articles. Please try again." as const

/**
 * จัดการ lifecycle การโหลดรายการโพสต์ (side effects + สถานะ UI)
 */
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loadState, setLoadState] = useState<BlogPostsLoadState>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      setLoadState("loading")
      setErrorMessage(null)
      try {
        const data = await fetchBlogPosts()
        if (cancelled) {
          return
        }
        setPosts(data)
        setLoadState("success")
      } catch (err) {
        if (cancelled) {
          return
        }
        setLoadState("error")
        setErrorMessage(err instanceof Error ? err.message : DEFAULT_ERROR)
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [])

  return { posts, loadState, errorMessage } as const
}
