import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const demoRegistry: Record<string, ComponentType> = {
  // Add new demos here:
  // 'restaurant-site': dynamic(() => import('./restaurant-site/page')),
};

export function getDemoComponent(slug: string): ComponentType | null {
  return demoRegistry[slug] ?? null;
}

export function getAllDemoSlugs(): string[] {
  return Object.keys(demoRegistry);
}
