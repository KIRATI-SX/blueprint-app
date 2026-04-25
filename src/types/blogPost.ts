/**
 * Domain shape for blog posts — suitable for API responses and presentational components.
 */
export type BlogPost = {
  id: number
  image: string
  category: string
  title: string
  description: string
  author: string
  /** Display string from the API (e.g. locale-formatted). */
  date: string
  /** ISO 8601 date for semantic `<time dateTime>`; optional if the API only sends a preformatted label. */
  publishedAt?: string
  likes: number
  /** Markdown or rich text for article detail routes. */
  content: string
  /** Optional portrait URL; when absent, the card uses a generated avatar from the author name. */
  authorImage?: string
}
