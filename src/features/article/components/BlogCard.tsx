import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blogPost";
import { Link, useNavigate } from "react-router-dom";

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

type BlogCardProps = Readonly<{
  post: BlogPost;
  className?: string;
}>;

export function BlogCard({ post, className }: BlogCardProps) {
  const navigate = useNavigate();
  const coverAlt = `Cover image for “${post.title}”`;
  const avatarAlt = `Portrait of ${post.author}`;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        className,
      )}
    >
      <div
        className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-brown-200 cursor-pointer"
        onClick={() => navigate(`/post/${post.id}`)}
      >
        <img
          src={post.image}
          alt={coverAlt}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          width={640}
          height={400}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <p
          className="body-3 w-fit rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-800"
          aria-label={`Category: ${post.category}`}
        >
          {post.category}
        </p>
        <Link to={`/post/${post.id}`}>
        <h4 className="headline-4 text-brown-600 cursor-pointer">{post.title}</h4>
        </Link>

        <p className="body-2 text-balance text-brown-400">{post.description}</p>

        <footer className="mt-auto flex items-center gap-3 border-t border-brown-200 pt-4">
          <img
            src={authorAvatarSrc(post)}
            alt={avatarAlt}
            className="size-8 shrink-0 rounded-full object-cover ring-1 ring-brown-200"
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
          />
          <p className="body-3 flex min-w-0 flex-wrap items-center gap-2 text-brown-500">
            <span className="font-medium text-brown-600">{post.author}</span>
            <span className="text-brown-300" aria-hidden>
              |
            </span>
            <time
              {...(post.publishedAt ? { dateTime: post.publishedAt } : {})}
              className="text-brown-400"
            >
              {post.date}
            </time>
          </p>
        </footer>
      </div>
    </article>
  );
}
