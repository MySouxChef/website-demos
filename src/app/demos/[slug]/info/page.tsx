import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDemo } from "@/lib/demos";

export default async function DemoInfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = getDemo(slug);

  if (!demo) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Gallery
        </Link>
        <span className="text-muted-foreground">/</span>
        <Link
          href={`/demos/${demo.slug}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {demo.title}
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-sm font-medium">Info</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{demo.title}</CardTitle>
          {demo.client_name && (
            <p className="text-muted-foreground">
              Built for {demo.client_name}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {(demo.long_description || demo.description) && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {demo.long_description || demo.description}
              </p>
            </div>
          )}

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Industry
              </h3>
              <Badge variant="secondary" className="mt-1 capitalize">
                {demo.industry.replace("-", " ")}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Category
              </h3>
              <Badge variant="secondary" className="mt-1 capitalize">
                {demo.category.replace("-", " ")}
              </Badge>
            </div>
          </div>

          {demo.tags.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {demo.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {demo.tech_stack && demo.tech_stack.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {demo.tech_stack.map((tech) => (
                  <Badge key={tech} variant="outline" className="capitalize">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="flex justify-center">
            <Link
              href={`/demos/${demo.slug}`}
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Live Demo
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
