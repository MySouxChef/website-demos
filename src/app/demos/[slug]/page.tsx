import { notFound } from "next/navigation";
import { getDemoComponent } from "@/demos";
import { DemoShell } from "@/components/demo-shell";
import { getDemo, getAllSlugs } from "@/lib/demos";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return { title: "Demo Not Found" };

  return {
    title: `${demo.title} | Website Demos`,
    description: demo.description,
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const DemoComponent = getDemoComponent(slug);
  const demo = getDemo(slug);

  if (!DemoComponent || !demo) notFound();

  return (
    <DemoShell demo={demo}>
      <DemoComponent />
    </DemoShell>
  );
}
