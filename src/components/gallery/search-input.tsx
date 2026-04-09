"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, router, searchParams]);

  return (
    <Input
      type="search"
      placeholder="Search demos..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="max-w-sm"
    />
  );
}
