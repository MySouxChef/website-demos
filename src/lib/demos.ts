import fs from "fs";
import path from "path";
import type { Demo, DemoMeta } from "./types";

const DEMOS_DIR = path.join(process.cwd(), "src", "demos");

export function getAllDemos(): Demo[] {
  const entries = fs.readdirSync(DEMOS_DIR, { withFileTypes: true });

  const demos: Demo[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith("_")) continue;

    const metaPath = path.join(DEMOS_DIR, entry.name, "meta.json");
    if (!fs.existsSync(metaPath)) continue;

    const raw = fs.readFileSync(metaPath, "utf-8");
    const meta: DemoMeta = JSON.parse(raw);

    if (meta.status !== "published") continue;

    demos.push({ ...meta, slug: entry.name });
  }

  return demos.sort((a, b) => a.title.localeCompare(b.title));
}

export function getDemo(slug: string): Demo | null {
  const metaPath = path.join(DEMOS_DIR, slug, "meta.json");
  if (!fs.existsSync(metaPath)) return null;

  const raw = fs.readFileSync(metaPath, "utf-8");
  const meta: DemoMeta = JSON.parse(raw);

  return { ...meta, slug };
}

export function getAllSlugs(): string[] {
  const entries = fs.readdirSync(DEMOS_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .filter((e) => {
      const metaPath = path.join(DEMOS_DIR, e.name, "meta.json");
      return fs.existsSync(metaPath);
    })
    .map((e) => e.name);
}
