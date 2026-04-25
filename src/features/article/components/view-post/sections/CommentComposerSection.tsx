import type { FocusEvent, PointerEvent } from "react";

type CommentComposerSectionProps = Readonly<{
  fieldId: string;
  onPointerDownCapture: (event: PointerEvent<HTMLTextAreaElement>) => void;
  onFocus: (event: FocusEvent<HTMLTextAreaElement>) => void;
}>;

export function CommentComposerSection({
  fieldId,
  onPointerDownCapture,
  onFocus,
}: CommentComposerSectionProps) {
  return (
    <section aria-labelledby={`${fieldId}-heading`} className="flex flex-col gap-3">
      <h2 id={`${fieldId}-heading`} className="text-lg font-semibold text-brown-800">
        Comment
      </h2>
      <form
        className="flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor={fieldId} className="sr-only">
          Your comment
        </label>
        <textarea
          id={fieldId}
          name="comment"
          rows={5}
          placeholder="What are your thoughts?"
          onPointerDownCapture={onPointerDownCapture}
          onFocus={onFocus}
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
  );
}
