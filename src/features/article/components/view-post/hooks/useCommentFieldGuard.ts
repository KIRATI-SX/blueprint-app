import { useCallback, type FocusEvent, type PointerEvent } from "react";

export function useCommentFieldGuard(
  isAuthenticated: boolean,
  requireAuth: () => boolean,
) {
  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLTextAreaElement>) => {
      if (!isAuthenticated) {
        event.preventDefault();
        requireAuth();
      }
    },
    [isAuthenticated, requireAuth],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      if (!isAuthenticated) {
        event.currentTarget.blur();
        requireAuth();
      }
    },
    [isAuthenticated, requireAuth],
  );

  return {
    handlePointerDown,
    handleFocus,
  };
}
