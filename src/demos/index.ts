import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const demoRegistry: Record<string, ComponentType> = {
  "mr-juicy": dynamic(() => import("./mr-juicy/page")),
};

export function getDemoComponent(slug: string): ComponentType | null {
  return demoRegistry[slug] ?? null;
}

export function getAllDemoSlugs(): string[] {
  return Object.keys(demoRegistry);
}
