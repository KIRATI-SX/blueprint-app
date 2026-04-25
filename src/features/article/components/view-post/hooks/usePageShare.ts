import { useCallback, useMemo } from "react";
import { getShareLinks } from "../lib/share";
import { showToast } from "@/components/ui/toast";

export function usePageShare(postTitle: string) {
  const pageUrl = useMemo(() => {
    if (typeof globalThis === "undefined" || !globalThis.location) {
      return "";
    }
    return globalThis.location.href;
  }, []);

  const shareLinks = useMemo(
    () => getShareLinks(pageUrl, postTitle),
    [pageUrl, postTitle],
  );

  const handleCopyLink = useCallback(() => {
    const url = globalThis.location?.href ?? "";
    void navigator.clipboard.writeText(url);
    showToast({
      title: "Link copied to clipboard",
      description: "You can now share the link with your friends",
      duration: 3000,
      position: "bottom-right",
      icon: "🚀",
    });
  }, []);

  return { shareLinks, handleCopyLink };
}
