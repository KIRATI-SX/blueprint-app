import { useCallback, useMemo } from "react";
import { getShareLinks } from "../lib/share";

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
  }, []);

  return { shareLinks, handleCopyLink };
}
