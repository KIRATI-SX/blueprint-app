import { MOCK_COMMENTS } from "../model/constants";

export function PostCommentsSection() {
  return (
    <section aria-label="Comments" className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-brown-800">Comments</h2>
      <div className="rounded-2xl border border-brown-200 bg-brown-100/70 px-6 py-2">
        {MOCK_COMMENTS.map((comment, index) => (
          <article
            key={comment.id}
            className={`py-6 ${
              index < MOCK_COMMENTS.length - 1 ? "border-b border-brown-300" : ""
            }`}
          >
            <header className="mb-4 flex items-center gap-3">
              <img
                src={comment.avatarSrc}
                alt={comment.avatarAlt}
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="size-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold leading-tight text-brown-700">
                  {comment.author}
                </h3>
                <time dateTime={comment.dateTime} className="body-3 text-brown-400">
                  {comment.dateLabel}
                </time>
              </div>
            </header>
            <p className="body-1 text-brown-500">{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
