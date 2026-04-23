import axios from "axios"

import type { BlogPost } from "@/types/blogPost"

import { mapApiPostToBlogPost } from "./mapApiPostToBlogPost"
import type { PostsListResponse } from "./postsApiTypes"

const POSTS_LIST_URL = "https://blog-post-project-api.vercel.app/posts"

/**
 * ชั้นเข้าถึงข้อมูล: HTTP + map → โดเมน (ไม่มี React)
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data } = await axios.get<PostsListResponse>(POSTS_LIST_URL)
  return data.posts.map(mapApiPostToBlogPost)
}
