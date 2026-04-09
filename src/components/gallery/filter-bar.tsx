"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { INDUSTRIES, CATEGORIES } from "@/lib/constants";

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeIndustry = searchParams.get("industry");
  const activeCategory = searchParams.get("category");

  function setFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="space-y-3">
      {/* Industries */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground self-center mr-1">
          Industry:
        </span>
        {INDUSTRIES.map((industry) => (
          <Badge
            key={industry}
            variant={activeIndustry === industry ? "default" : "outline"}
            className="cursor-pointer capitalize"
            onClick={() => setFilter("industry", industry)}
          >
            {industry.replace("-", " ")}
          </Badge>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground self-center mr-1">
          Type:
        </span>
        {CATEGORIES.map((category) => (
          <Badge
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className="cursor-pointer capitalize"
            onClick={() => setFilter("category", category)}
          >
            {category.replace("-", " ")}
          </Badge>
        ))}
      </div>
    </div>
  );
}
