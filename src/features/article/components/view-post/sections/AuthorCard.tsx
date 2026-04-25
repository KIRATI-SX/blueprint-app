import type { BlogPost } from "@/types/blogPost";
import { getAuthorAvatarSrc } from "../lib/author";

type AuthorCardProps = Readonly<{
  post: BlogPost;
}>;

export function AuthorCard({ post }: AuthorCardProps) {
  return (
    <aside
      className="w-full max-w-[305px] shrink-0 self-start lg:sticky lg:top-10"
      aria-label="Author"
    >
      <section className="h-fit rounded-2xl border border-brown-200 bg-brown-200 p-4">
        <div className="flex gap-3">
          <img
            src={getAuthorAvatarSrc(post)}
            alt={`Portrait of ${post.author}`}
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
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing insights
            on feline companionship and wellness.
          </p>
          <p className="body-2 leading-relaxed">
            When I&apos;m not writing, I spend time volunteering at my local animal
            shelter, helping cats find loving homes.
          </p>
        </div>
      </section>
    </aside>
  );
}
