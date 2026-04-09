export type DemoStatus = "draft" | "published" | "archived";

export interface DemoMeta {
  title: string;
  description: string;
  industry: string;
  category: string;
  tags: string[];
  status: DemoStatus;
  color_accent?: string;
  tech_stack?: string[];
  client_name?: string;
  long_description?: string;
  thumbnail?: string; // relative path to thumbnail in the demo folder
}

export interface Demo extends DemoMeta {
  slug: string;
}
