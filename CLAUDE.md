# Website Demos Portfolio

## Purpose
A Next.js portfolio site that showcases demo websites built for potential clients. Each demo is a live, interactive subpage at `/demos/[slug]`. The gallery at `/` lets visitors browse, filter, and search demos. The entire project lives in a single GitHub repo — the repo IS the product.

## Architecture
- **Framework**: Next.js App Router, TypeScript, Tailwind CSS v4
- **UI Library**: shadcn/ui (`npx shadcn@latest add <component>`)
- **Data**: File-based — each demo has a `meta.json` in its folder (no database)
- **Deployment**: Vercel (auto-deploys from GitHub)
- **Domain**: Custom domain via Porkbun

## How It Works
Every demo is a folder in `src/demos/`. Each folder contains:
- `page.tsx` — The demo component (default export)
- `meta.json` — Metadata (title, description, industry, tags, status)
- `components/` — Demo-specific sub-components
- `styles.module.css` — Scoped CSS for the demo

The gallery page reads all `meta.json` files at build time and renders a filterable grid. When a visitor clicks a demo, it loads the component at `/demos/[slug]`. No database, no API — just files in the repo.

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Gallery landing (reads meta.json files)
│   └── demos/
│       └── [slug]/
│           ├── page.tsx        # Dynamic demo viewer (loads from registry)
│           ├── info/page.tsx   # Demo metadata/details page
│           └── error.tsx       # Error boundary per demo
├── demos/                      # === DEMO LIBRARY (one folder per demo) ===
│   ├── index.ts                # Registry: slug → dynamic(() => import(...))
│   ├── _template/              # Copy this to create new demos
│   │   ├── page.tsx
│   │   ├── meta.json
│   │   ├── components/
│   │   └── styles.module.css
│   └── [slug]/                 # Each demo folder
│       ├── page.tsx
│       ├── meta.json
│       ├── components/
│       └── styles.module.css
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── gallery/                # Gallery components (cards, filters, search)
│   └── demo-shell.tsx          # Style isolation wrapper for demos
├── lib/
│   ├── demos.ts                # Reads meta.json files from filesystem
│   ├── types.ts                # TypeScript types (Demo, DemoMeta)
│   └── constants.ts            # Industry/category presets
│   └── utils.ts                # shadcn utility (cn)
```

## Demo Creation Workflow

When creating a new demo website:

### Step 1: Build the demo
1. Use the `frontend-design` skill to design the demo page
2. Copy `src/demos/_template/` to `src/demos/[slug]/`
3. Build out `page.tsx` with the demo content
4. Use CSS Modules or Tailwind for styling

### Step 2: Fill in meta.json
```json
{
  "title": "Demo Title",
  "description": "Short description for the gallery card",
  "industry": "restaurant",
  "category": "landing-page",
  "tags": ["elegant", "dark-theme"],
  "status": "published",
  "color_accent": "#dc2626",
  "tech_stack": ["tailwind", "framer-motion"],
  "client_name": "Optional Client Name",
  "long_description": "Longer description for the info page"
}
```

### Step 3: Register the demo
Add to `src/demos/index.ts`:
```ts
'my-slug': dynamic(() => import('./my-slug/page')),
```

### Step 4: Deploy
Push to GitHub — Vercel auto-deploys. Or use `vercel:deploy` skill for a preview.

**That's it.** No database inserts, no API calls — just files and a git push.

## MCP Tools — When to Use Each

### Vercel MCP
- `mcp__vercel__deploy_to_vercel` — Deploy previews and production
- `mcp__vercel__get_deployment` — Check deployment status
- `mcp__vercel__get_runtime_logs` — Debug production issues

### GitHub MCP
- `mcp__github__push_files` — Batch file creation for new demos
- `mcp__github__create_pull_request` — PR workflow

### Playwright MCP
- `mcp__playwright__browser_navigate` — Open demo for visual check
- `mcp__playwright__browser_take_screenshot` — Capture thumbnail
- `mcp__playwright__browser_resize` — Set viewport for screenshots

### Porkbun MCP
- `mcp__porkbun__dns_create` — Add DNS records for domain
- `mcp__porkbun__dns_list` — View current DNS records

## Conventions

### File Naming
- Demo folders: kebab-case matching the slug (`restaurant-site`, `law-firm`)
- Components: kebab-case files, PascalCase exports (`hero-section.tsx` → `HeroSection`)
- Always include `meta.json` with `"status": "published"` for the demo to appear in the gallery

### Style Rules
- Demos MUST use CSS Modules or Tailwind — never global CSS
- The `DemoShell` wrapper applies `all: initial` to prevent gallery style bleed
- Each demo should be fully self-contained

### meta.json fields
| Field | Required | Description |
|-------|----------|-------------|
| title | yes | Display name |
| description | yes | Short description for gallery card |
| industry | yes | e.g., restaurant, legal, healthcare |
| category | yes | e.g., landing-page, full-site, portfolio |
| tags | yes | Array of freeform tags |
| status | yes | "draft", "published", or "archived" |
| color_accent | no | Hex color for card fallback (default: #6366f1) |
| tech_stack | no | Array of tech used |
| client_name | no | Who it was built for |
| long_description | no | Detailed description for info page |
| thumbnail | no | Relative path to thumbnail image in demo folder |

## Skills Reference
- `frontend-design` — Use for ALL demo page creation
- `vercel:deploy` — Deploy previews or production (`/deploy prod`)
- `vercel:shadcn` — Add shadcn components
- `vercel:nextjs` — Reference for App Router patterns

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
