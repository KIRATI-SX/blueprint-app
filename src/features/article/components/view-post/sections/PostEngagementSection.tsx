import { Bird, Copy, SmilePlus } from "lucide-react";
import type { ShareLinks } from "../model/types";

type PostEngagementSectionProps = Readonly<{
  reactionCount: number;
  onReactionClick: () => void;
  onCopyLink: () => void;
  shareLinks: ShareLinks;
}>;

export function PostEngagementSection({
  reactionCount,
  onReactionClick,
  onCopyLink,
  shareLinks,
}: PostEngagementSectionProps) {
  return (
    <section aria-label="Engagement and sharing" className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brown-200 px-4 py-3">
        <button
          type="button"
          onClick={onReactionClick}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-brown-600 bg-white px-4 text-sm font-medium text-brown-800"
          aria-label={`Reactions: ${reactionCount}`}
        >
          <SmilePlus className="size-4 shrink-0 text-brown-800" aria-hidden />
          <span>{reactionCount}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onCopyLink}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-brown-600 bg-white px-4 text-sm font-medium text-brown-800"
          >
            <Copy className="size-4 shrink-0" aria-hidden />
            Copy
          </button>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-10 items-center justify-center rounded-full border border-brown-600 bg-white text-sm font-bold text-brown-800 hover:bg-brown-50"
            aria-label="Share on Facebook"
          >
            <span aria-hidden>f</span>
          </a>
          <a
            href={shareLinks.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-10 items-center justify-center rounded-full border border-brown-600 bg-white text-sm font-bold text-brown-800 hover:bg-brown-50"
            aria-label="Share on LinkedIn"
          >
            <span aria-hidden>in</span>
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-10 items-center justify-center rounded-full border border-brown-600 bg-white text-brown-800 hover:bg-brown-50"
            aria-label="Share on X (Twitter)"
          >
            <Bird className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
