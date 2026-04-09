import { Suspense } from "react";
import { getAllDemos } from "@/lib/demos";
import type { Demo } from "@/lib/types";
import { DemoGrid } from "@/components/gallery/demo-grid";
import { FilterBar } from "@/components/gallery/filter-bar";
import { SearchInput } from "@/components/gallery/search-input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    industry?: string;
    category?: string;
  }>;
}

function filterDemos(
  demos: Demo[],
  params: { q?: string; industry?: string; category?: string }
): Demo[] {
  let filtered = demos;

  if (params.industry) {
    filtered = filtered.filter((d) => d.industry === params.industry);
  }
  if (params.category) {
    filtered = filtered.filter((d) => d.category === params.category);
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return filtered;
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export default async function GalleryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const allDemos = getAllDemos();
  const demos = filterDemos(allDemos, params);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Website Demos</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse our collection of demo websites built for potential clients.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <Suspense>
          <SearchInput />
        </Suspense>
        <Suspense>
          <FilterBar />
        </Suspense>
      </div>

      <Separator className="mb-8" />

      {/* Demo Grid */}
      <Suspense fallback={<GallerySkeleton />}>
        <DemoGrid demos={demos} />
      </Suspense>
    </main>
  );
}
