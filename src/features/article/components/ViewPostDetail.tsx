import { useAuth } from "@/contexts/AuthContext";
import type { BlogPost } from "@/types/blogPost";
import { Bird, Copy, SmilePlus } from "lucide-react";
import {
  useCallback,
  useId,
  useMemo,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import ReactMarkdown from "react-markdown";

type ViewPostDetailProps = Readonly<{
  post: BlogPost;
}>;

function authorAvatarSrc(
  post: Pick<BlogPost, "author" | "authorImage">,
): string {
  if (post.authorImage) {
    return post.authorImage;
  }
  const params = new URLSearchParams({
    name: post.author,
    size: "64",
    background: "efeeeb",
    color: "43403b",
  });
  return `https://ui-avatars.com/api/?${params.toString()}`;
}

export function ViewPostDetail({ post }: ViewPostDetailProps) {
  const { isAuthenticated, requireAuth } = useAuth();
  const avatarAlt = `Portrait of ${post.author}`;
  const commentFieldId = useId();
  const [bonusReactions, setBonusReactions] = useState(0);
  const reactionDisplayCount = post.likes + bonusReactions;

  const pageUrl = useMemo(() => {
    if (typeof globalThis === "undefined" || !globalThis.location) {
      return "";
    }
    return globalThis.location.href;
  }, []);

  const handleCopyLink = useCallback(() => {
    const url = globalThis.location?.href ?? "";
    void navigator.clipboard.writeText(url);
  }, []);

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(post.title);
  const facebookShareHref = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedInShareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterShareHref = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

  const handleReactionClick = useCallback(() => {
    if (!requireAuth()) {
      return;
    }
    setBonusReactions((n) => n + 1);
  }, [requireAuth]);

  const handleCommentFieldPointerDown = useCallback(
    (event: PointerEvent<HTMLTextAreaElement>) => {
      if (!isAuthenticated) {
        event.preventDefault();
        requireAuth();
      }
    },
    [isAuthenticated, requireAuth],
  );

  const handleCommentFieldFocus = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      if (!isAuthenticated) {
        event.currentTarget.blur();
        requireAuth();
      }
    },
    [isAuthenticated, requireAuth],
  );

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
          <section
            aria-label="Engagement and comments"
            className="flex flex-col gap-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brown-200 px-4 py-3">
              <button
                type="button"
                onClick={handleReactionClick}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-brown-600 bg-white px-4 text-sm font-medium text-brown-800"
                aria-label={`Reactions: ${reactionDisplayCount}`}
              >
                <SmilePlus
                  className="size-4 shrink-0 text-brown-800"
                  aria-hidden
                />
                <span>{reactionDisplayCount}</span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-brown-600 bg-white px-4 text-sm font-medium text-brown-800"
                >
                  <Copy className="size-4 shrink-0" aria-hidden />
                  Copy
                </button>
                <a
                  href={facebookShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-brown-600 bg-white text-sm font-bold text-brown-800 hover:bg-brown-50"
                  aria-label="Share on Facebook"
                >
                  <span aria-hidden>f</span>
                </a>
                <a
                  href={linkedInShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-brown-600 bg-white text-sm font-bold text-brown-800 hover:bg-brown-50"
                  aria-label="Share on LinkedIn"
                >
                  <span aria-hidden>in</span>
                </a>
                <a
                  href={twitterShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-brown-600 bg-white text-brown-800 hover:bg-brown-50"
                  aria-label="Share on X (Twitter)"
                >
                  <Bird className="size-4" aria-hidden />
                </a>
              </div>
            </div>

            <section
              aria-labelledby={`${commentFieldId}-heading`}
              className="flex flex-col gap-3"
            >
              <h2
                id={`${commentFieldId}-heading`}
                className="text-lg font-semibold text-brown-800"
              >
                Comment
              </h2>
              <form
                className="flex flex-col"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <label htmlFor={commentFieldId} className="sr-only">
                  Your comment
                </label>
                <textarea
                  id={commentFieldId}
                  name="comment"
                  rows={5}
                  placeholder="What are your thoughts?"
                  onPointerDownCapture={handleCommentFieldPointerDown}
                  onFocus={handleCommentFieldFocus}
                  className="w-full min-h-32 resize-y rounded-xl border border-brown-300 bg-white px-4 py-3 text-base text-brown-800 placeholder:text-brown-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-500"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex h-10 min-w-[100px] items-center justify-center rounded-full bg-[#26231E] px-8 text-sm font-medium text-white transition-colors hover:bg-[#43403B]"
                  >
                    Send
                  </button>
                </div>
              </form>
            </section>
          </section>
        </div>

        <aside
          className="w-full max-w-[305px] shrink-0 self-start lg:sticky lg:top-10"
          aria-label="Author"
        >
          <section className="h-fit rounded-2xl border border-brown-200 bg-brown-200 p-4">
            <div className="flex gap-3">
              <img
                src={authorAvatarSrc(post)}
                alt={avatarAlt}
                className="size-12 shrink-0 rounded-full object-cover ring-1 ring-brown-200"
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
              <div className="min-w-0">
                <p className="body-3 text-brown-400">Author</p>
                <p className="font-semibold text-brown-700">{post.author}</p>
              </div>
            </div>
            <hr className="my-4 border-brown-300" />
            <div className="space-y-3 text-brown-500">
              <p className="body-2 leading-relaxed">
                I am a pet enthusiast and freelance writer who specializes in
                animal behavior and care. With a deep love for cats, I enjoy
                sharing insights on feline companionship and wellness.
              </p>
              <p className="body-2 leading-relaxed">
                When I&apos;m not writing, I spend time volunteering at my
                local animal shelter, helping cats find loving homes.
              </p>
            </div>
          </section>
        </aside>
      </section>
    </article>
  );
}
