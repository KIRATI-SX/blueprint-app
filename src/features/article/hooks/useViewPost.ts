import { fetchBlogPostById } from "@/services/blogPosts/blogPostsService"
import type { BlogPost } from "@/types/blogPost"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"

const INVALID_POST_ID_ERROR = "Invalid post id."
const NOT_FOUND_ERROR = "Post not found."
const LOAD_ERROR = "Unable to load this post. Please try again."

type UseViewPostResult = {
  post: BlogPost | null
  isLoading: boolean
  errorMessage: string | null
}

function parsePostId(postId: string | undefined): number | null {
  const normalized = Number(postId)
  if (!postId || Number.isNaN(normalized) || normalized <= 0) {
    return null
  }
  return normalized
}

export function useViewPost(postId: string | undefined): UseViewPostResult {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const normalizedPostId = useMemo(() => parsePostId(postId), [postId])

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      if (normalizedPostId == null) {
        setPost(null)
        setErrorMessage(INVALID_POST_ID_ERROR)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage(null)

      try {
        const data = await fetchBlogPostById(normalizedPostId)
        if (cancelled) {
          return
        }
        setPost(data)
      } catch (error) {
        if (cancelled) {
          return
        }
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setErrorMessage(NOT_FOUND_ERROR)
        } else {
          setErrorMessage(LOAD_ERROR)
        }
        setPost(null)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [normalizedPostId])

  return { post, isLoading, errorMessage }
}
