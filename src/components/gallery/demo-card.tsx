import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Demo } from "@/lib/types";

interface DemoCardProps {
  demo: Demo;
}

export function DemoCard({ demo }: DemoCardProps) {
  return (
    <Link href={`/demos/${demo.slug}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {demo.thumbnail ? (
            <img
              src={`/demos/${demo.slug}/${demo.thumbnail}`}
              alt={demo.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-4xl font-bold text-white"
              style={{ backgroundColor: demo.color_accent || "#6366f1" }}
            >
              {demo.title.charAt(0)}
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="text-lg font-semibold leading-tight">{demo.title}</h3>
          {demo.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {demo.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="secondary" className="text-xs">
              {demo.industry}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {demo.category}
            </Badge>
            {demo.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
