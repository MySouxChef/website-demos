"use client";

import Link from "next/link";

export default function DemoError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground">
        This demo encountered an error while loading.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border px-4 py-2 text-sm hover:bg-muted"
        >
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}
