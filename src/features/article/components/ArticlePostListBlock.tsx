import { useEffect, useState } from "react"

import { ArticlePostListSkeleton } from "./ArticlePostListSkeleton"
import { BlogCard } from "./BlogCard"
import type { BlogPost } from "@/types/blogPost"
import type { ArticleFilter, BlogPostsLoadState } from "../types"

const STALE_FALLBACK_BANNER_MS = 5000

type ArticlePostListBlockProps = Readonly<{
  loadState: BlogPostsLoadState
  errorMessage: string | null
  posts: readonly BlogPost[]
  activeFilter: ArticleFilter
  debouncedSearchQuery: string
  lastSuccessfulNonEmptyPosts: readonly BlogPost[]
}>

/**
 * แยก “ผลลัพธ์การโหลด/รายการการ์ด” ออกจาก section shell (presentation)
 */
export function ArticlePostListBlock({
  loadState,
  errorMessage,
  posts,
  activeFilter,
  debouncedSearchQuery,
  lastSuccessfulNonEmptyPosts,
}: ArticlePostListBlockProps) {
  const hasStaleFallback
    = loadState === "success"
      && posts.length === 0
      && lastSuccessfulNonEmptyPosts.length > 0
  const keyword = debouncedSearchQuery.trim()

  const fallbackBannerText = (() => {
    if (keyword) {
      return `No results matching “${keyword}” — showing the previous list below.`
    }
    return `No articles in the ${activeFilter} category — showing the previous list below.`
  })()

  const [showStaleBannerOverlay, setShowStaleBannerOverlay] = useState(true)

  useEffect(() => {
    if (!hasStaleFallback) {
      return
    }
    // แสดง overlay ใหม่ทุกครั้งที่ยัง stale fallback หรือข้อความเปลี่ยน
    // eslint-disable-next-line react-hooks/set-state-in-effect -- ซิงค์ state กับ effect cycle ของ hasStaleFallback
    setShowStaleBannerOverlay(true)
    const id = globalThis.setTimeout(() => {
      setShowStaleBannerOverlay(false)
    }, STALE_FALLBACK_BANNER_MS)
    return () => {
      globalThis.clearTimeout(id)
    }
  }, [hasStaleFallback, fallbackBannerText])

  const showListSkeleton
    = loadState === "idle" || loadState === "loading"

  return (
    <>
      {showListSkeleton && <ArticlePostListSkeleton />}

      {loadState === "error" && errorMessage && (
        <div className="flex h-50 flex-col items-center justify-center gap-2">
          <p className="body-2 text-red-700" role="alert">
            {errorMessage}
          </p>
        </div>
      )}

      {loadState === "success" && posts.length > 0 && (
        <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-2">
          {posts.map((post) => (
            <li key={post.id} className="min-w-0">
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      )}

      {hasStaleFallback && (
        <div className="relative flex w-full flex-col gap-4">
          {showStaleBannerOverlay && (
            <aside
              className="fixed top-20 left-1/2 z-50 w-[min(100%-1.5rem,36rem)] -translate-x-1/2 rounded-xl border border-brown-200 bg-white px-4 py-3 text-center text-sm text-brown-600 shadow-lg md:top-24"
              role="status"
              aria-live="polite"
            >
              {fallbackBannerText}
            </aside>
          )}
          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-2">
            {lastSuccessfulNonEmptyPosts.map((post) => (
              <li key={post.id} className="min-w-0">
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {loadState === "success"
        && posts.length === 0
        && !hasStaleFallback && (
        <div className="flex h-50 flex-col items-center justify-center gap-2">
          <p className="body-2 text-brown-400">No articles match this filter.</p>
        </div>
      )}
    </>
  )
}
