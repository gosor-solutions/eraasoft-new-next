"use client";

import { useEffect } from "react";

export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-red-500 text-sm max-w-md text-center">{error?.message}</p>
      <button onClick={() => unstable_retry()} className="rounded px-4 py-2 bg-blue-600 text-white">
        Try again
      </button>
    </main>
  );
}
