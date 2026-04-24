import axios from "axios"

import type { BlogPost } from "@/types/blogPost"

import { mapApiPostToBlogPost } from "./mapApiPostToBlogPost"
import type { PostsListResponse } from "./postsApiTypes"

const POSTS_LIST_URL = "https://blog-post-project-api.vercel.app/posts"

export type FetchBlogPostsParams = {
  page?: number
  limit?: number
  /** ถ้าไม่ส่ง จะดึงทุก category ตามเอกสาร API */
  category?: string
  keyword?: string
}

export type FetchBlogPostsResult = {
  posts: BlogPost[]
  nextPage: number | null
  currentPage: number
  totalPages: number
  totalPosts: number
  limit: number
}

/**
 * ชั้นเข้าถึงข้อมูล: HTTP + map → โดเมน (ไม่มี React)
 */
export async function fetchBlogPosts(
  request: FetchBlogPostsParams = {}
): Promise<FetchBlogPostsResult> {
  const { page = 1, limit = 6, category, keyword } = request
  const { data } = await axios.get<PostsListResponse>(POSTS_LIST_URL, {
    params: {
      page,
      limit,
      ...(category && { category }),
      ...(keyword && { keyword }),
    },
  })
  return {
    posts: data.posts.map(mapApiPostToBlogPost),
    nextPage: data.nextPage,
    currentPage: data.currentPage,
    totalPages: data.totalPages,
    totalPosts: data.totalPosts,
    limit: data.limit,
  }
}

/**
 * ดึงข้อมูลบทความแบบรายตัวจาก id
 */
export async function fetchBlogPostById(postId: number | string): Promise<BlogPost> {
  const { data } = await axios.get<PostsListResponse["posts"][number]>(
    `${POSTS_LIST_URL}/${postId}`
  )
  return mapApiPostToBlogPost(data)
}
