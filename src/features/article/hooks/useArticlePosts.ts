import { useCallback, useLayoutEffect, useRef, useState } from "react"

import { fetchBlogPosts } from "@/services/blogPosts/blogPostsService"
import type { BlogPost } from "@/types/blogPost"
import type { ArticleFilter, BlogPostsLoadState } from "../types"

const DEFAULT_ERROR = "Unable to load articles. Please try again." as const
const POSTS_PER_PAGE = 6

function categoryParamFromFilter(
  activeFilter: ArticleFilter,
): string | undefined {
  if (activeFilter === "Highlight") {
    return undefined
  }
  return activeFilter
}

/**
 * โหลดรายการบทความ + โหลดเพิ่ม (pagination แบบ append) ต่อ filter + keyword ปัจจุบัน
 */
export function useArticlePosts(
  activeFilter: ArticleFilter,
  debouncedSearchQuery: string = "",
) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loadState, setLoadState] = useState<BlogPostsLoadState>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null)
  const [nextPage, setNextPage] = useState<number | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const filterRef = useRef(activeFilter)
  const searchRef = useRef(debouncedSearchQuery)

  const baseParams = useCallback(
    (page: number) => {
      const kw = debouncedSearchQuery.trim()
      return {
        page,
        limit: POSTS_PER_PAGE,
        category: categoryParamFromFilter(activeFilter),
        ...(kw ? { keyword: kw } : {}),
      }
    },
    [activeFilter, debouncedSearchQuery],
  )

  /* โหลดข้อมูลจาก API: อัปเดต ref + รีเซ็ต state ก่อน fetch ต่อ filter/keyword */
  useLayoutEffect(() => {
    filterRef.current = activeFilter
    searchRef.current = debouncedSearchQuery
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset then async fetch; intentional
    setLoadState("loading")
    setErrorMessage(null)
    setLoadMoreError(null)
    setNextPage(null)
    setPosts([])

    let cancelled = false

    const run = async () => {
      try {
        const data = await fetchBlogPosts(baseParams(1))
        if (cancelled) {
          return
        }
        setPosts(data.posts)
        setNextPage(data.nextPage)
        setLoadState("success")
      } catch (err) {
        if (cancelled) {
          return
        }
        setLoadState("error")
        setErrorMessage(
          err instanceof Error ? err.message : DEFAULT_ERROR,
        )
        setPosts([])
        setNextPage(null)
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [activeFilter, baseParams, debouncedSearchQuery])

  const loadMore = useCallback(async () => {
    const filterAtRequest = activeFilter
    const keywordAtRequest = debouncedSearchQuery.trim()
    if (nextPage == null || isLoadingMore) {
      return
    }
    setIsLoadingMore(true)
    setLoadMoreError(null)
    try {
      const data = await fetchBlogPosts(baseParams(nextPage))
      if (filterRef.current !== filterAtRequest) {
        return
      }
      if (searchRef.current.trim() !== keywordAtRequest) {
        return
      }
      setPosts((prev) => [...prev, ...data.posts])
      setNextPage(data.nextPage)
    } catch (err) {
      if (
        filterRef.current === filterAtRequest
        && searchRef.current.trim() === keywordAtRequest
      ) {
        setLoadMoreError(
          err instanceof Error ? err.message : DEFAULT_ERROR,
        )
      }
    } finally {
      setIsLoadingMore(false)
    }
  }, [activeFilter, debouncedSearchQuery, nextPage, isLoadingMore, baseParams])

  const hasMore = nextPage != null

  return {
    posts,
    loadState,
    errorMessage,
    loadMore,
    hasMore,
    isLoadingMore,
    loadMoreError,
  } as const
}
