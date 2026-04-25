import type { BlogPost } from "@/types/blogPost";

export function getAuthorAvatarSrc(
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
