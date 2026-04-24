import type { BlogPost } from "@/types/blogPost";
import { Spinner } from "@/components/ui/spinner"
import type { BlogPostsLoadState } from "../types";
import { BlogCard } from "./BlogCard";

type ArticlePostListBlockProps = Readonly<{
  loadState: BlogPostsLoadState;
  errorMessage: string | null;
  posts: readonly BlogPost[];
}>;

/**
 * แยก “ผลลัพธ์การโหลด/รายการการ์ด” ออกจาก section shell (presentation)
 */
export function ArticlePostListBlock({
  loadState,
  errorMessage,
  posts,
}: ArticlePostListBlockProps) {
  return (
    <>
      {loadState === "loading" && (
        <div className="flex flex-col items-center justify-center gap-2 h-50">
           <Spinner className="size-10" />
          <p className="body-2 text-brown-400" role="status" aria-live="polite">
            Loading articles…
          </p>
        </div>
      )}

      {loadState === "error" && errorMessage && (
         <div className="flex flex-col items-center justify-center gap-2 h-50">

        <p className="body-2 text-red-700" role="alert">
          {errorMessage}
        </p>
         </div>
      )}

      {loadState === "success" && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 h-50">
          <p className="body-2 text-brown-400">No articles match this filter.</p>
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
    </>
  );
}
