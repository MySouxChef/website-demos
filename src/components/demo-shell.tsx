"use client";

import Link from "next/link";
import type { Demo } from "@/lib/types";

interface DemoShellProps {
  demo: Demo;
  children: React.ReactNode;
}

export function DemoShell({ demo, children }: DemoShellProps) {
  return (
    <div className="relative min-h-screen">
      {/* Floating back button */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Gallery
        </Link>
      </div>

      {/* Floating info button */}
      <div className="fixed top-4 right-4 z-50">
        <Link
          href={`/demos/${demo.slug}/info`}
          className="flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          Info
        </Link>
      </div>

      {/* Style-isolated demo content */}
      <div
        style={{ all: "initial", display: "block", minHeight: "100vh" }}
      >
        {children}
      </div>
    </div>
  );
}
