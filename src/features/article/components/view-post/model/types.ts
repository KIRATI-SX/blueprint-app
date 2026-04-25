import type { BlogPost } from "@/types/blogPost";

export type ViewPostDetailProps = Readonly<{
  post: BlogPost;
}>;

export type MockComment = Readonly<{
  id: string;
  author: string;
  avatarSrc: string;
  avatarAlt: string;
  dateTime: string;
  dateLabel: string;
  content: string;
}>;

export type ShareLinks = Readonly<{
  facebook: string;
  linkedIn: string;
  twitter: string;
}>;
