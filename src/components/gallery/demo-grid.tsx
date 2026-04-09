import type { Demo } from "@/lib/types";
import { DemoCard } from "./demo-card";

interface DemoGridProps {
  demos: Demo[];
}

export function DemoGrid({ demos }: DemoGridProps) {
  if (demos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          No demos found
        </p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {demos.map((demo) => (
        <DemoCard key={demo.slug} demo={demo} />
      ))}
    </div>
  );
}
