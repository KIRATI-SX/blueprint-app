import BlogPageLayout from "@/components/layout/BlogPageLayout";
import { ViewPostDetail } from "@/features/article/components/ViewPostDetail";
import {
  ViewPostError,
  ViewPostLoading,
} from "@/features/article/components/ViewPostFeedback";
import { useViewPost } from "@/features/article/hooks/useViewPost";
import { useParams } from "react-router-dom";

export default function ViewPostPage() {
  const { postId } = useParams()
  const { post, isLoading, errorMessage } = useViewPost(postId)

  return (
    <BlogPageLayout mainAriaLabel="View post page" mainClassName="flex flex-1 flex-col">
      <section className="w-full px-4 py-10 sm:px-6 md:px-12 lg:px-[120px]">
        {isLoading && <ViewPostLoading />}
        {!isLoading && errorMessage && <ViewPostError message={errorMessage} />}
        {!isLoading && !errorMessage && post && (
          <ViewPostDetail key={post.id} post={post} />
        )}
      </section>
    </BlogPageLayout>
  )
}
