export const INDUSTRIES = [
  "restaurant",
  "legal",
  "healthcare",
  "real-estate",
  "fitness",
  "education",
  "technology",
  "retail",
  "creative",
  "finance",
  "hospitality",
  "nonprofit",
] as const;

export const CATEGORIES = [
  "landing-page",
  "full-site",
  "portfolio",
  "e-commerce",
  "blog",
  "dashboard",
  "saas",
] as const;

export type Industry = (typeof INDUSTRIES)[number];
export type Category = (typeof CATEGORIES)[number];
