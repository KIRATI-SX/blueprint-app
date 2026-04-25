import { Spinner } from "@/components/ui/spinner";

export function ViewPostLoading() {
  return (
    <section className="mx-auto flex w-fit max-w-4xl items-center justify-center gap-3 rounded-2xl border border-brown-200  p-8 text-brown-500">
      <Spinner className="size-5" />
      <p className="body-1">Loading post...</p>
    </section>
  );
}

type ViewPostErrorProps = Readonly<{
  message: string;
}>;

export function ViewPostError({ message }: ViewPostErrorProps) {
  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
      <h1 className="headline-4">Unable to open post</h1>
      <p className="body-2 mt-2">{message}</p>
    </section>
  );
}
