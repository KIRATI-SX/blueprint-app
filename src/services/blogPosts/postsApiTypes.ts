/**
 * สัญญา payload จาก GET /posts — แยกจากโดเมน `BlogPost` เพื่อไม่ผูกกับรูปแบบ response นี้ตลอดไป
 */
export type ApiPostRaw = {
  id: number
  image: string
  category: string
  title: string
  description: string
  author: string
  /** ISO string จาก API */
  date: string
  likes: number
  content: string
}

export type PostsListResponse = {
  totalPosts: number
  totalPages: number
  currentPage: number
  limit: number
  posts: ApiPostRaw[]
  nextPage: number | null
}
