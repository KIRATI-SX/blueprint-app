import { useAuth } from "@/contexts/AuthContext";
import { useCallback, useId, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useCommentFieldGuard } from "./hooks/useCommentFieldGuard";
import { usePageShare } from "./hooks/usePageShare";
import type { ViewPostDetailProps } from "./model/types";
import { AuthorCard } from "./sections/AuthorCard";
import { CommentComposerSection } from "./sections/CommentComposerSection";
import { PostCommentsSection } from "./sections/PostCommentsSection";
import { PostEngagementSection } from "./sections/PostEngagementSection";

export function ViewPostDetail({ post }: ViewPostDetailProps) {
  const { isAuthenticated, requireAuth } = useAuth();
  const commentFieldId = useId();
  const [bonusReactions, setBonusReactions] = useState(0);
  const reactionDisplayCount = post.likes + bonusReactions;
  const { shareLinks, handleCopyLink } = usePageShare(post.title);
  const commentFieldGuard = useCommentFieldGuard(isAuthenticated, requireAuth);

  const handleReactionClick = useCallback(() => {
    if (!requireAuth()) {
      return;
    }
    setBonusReactions((n) => n + 1);
  }, [requireAuth]);

  return (
    <article className="mx-auto flex w-full max-w-5xl flex-col gap-12 text-brown-600">
      <header>
        <figure className="overflow-hidden rounded-2xl bg-brown-100">
          <img
            src={post.image}
            alt={`${post.title} cover`}
            className="h-full w-full max-h-[587px] max-w-[1200px] object-cover"
            loading="lazy"
          />
        </figure>
      </header>

      <section className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
        <div className="flex w-full max-w-[815px] flex-col gap-12">
          <div aria-label="Header" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="body-3 w-fit rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-800">
                {post.category}
              </span>
              <p className="body-3 text-brown-400">{post.date}</p>
            </div>
            <h1 className="headline-2 text-brown-700">{post.title}</h1>
          </div>

          <div aria-label="Content" className="flex flex-col gap-4">
            <p className="body-1 leading-8 text-brown-500">
              {post.description}
            </p>
            <div className="markdown">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
          <PostEngagementSection
            reactionCount={reactionDisplayCount}
            onReactionClick={handleReactionClick}
            onCopyLink={handleCopyLink}
            shareLinks={shareLinks}
          />
          <CommentComposerSection
            fieldId={commentFieldId}
            onPointerDownCapture={commentFieldGuard.handlePointerDown}
            onFocus={commentFieldGuard.handleFocus}
          />
        </div>
        <AuthorCard post={post} />
      </section>
      <PostCommentsSection />
    </article>
  );
}
