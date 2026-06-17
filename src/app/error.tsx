"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/error-reporting";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, { digest: error.digest });
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-almond_cream px-6">
      <span className="text-[10px] tracking-[0.5em] uppercase text-stone_brown/50 mb-6">
        Something went wrong
      </span>
      <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
        Unexpected Error
      </h1>
      <p className="text-base text-almond_cream/50 font-light mb-10 max-w-md text-center">
        We hit a snag. Please try again.
      </p>
      <button
        onClick={reset}
        className="bg-khaki_beige/90 text-black px-8 py-3.5 rounded-full text-sm tracking-[0.2em] uppercase hover:scale-105 transition-transform cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
