# Website Demos

## Purpose
A workspace for researching, building, and showcasing demo websites for potential clients. Demos built here get displayed on the Graebener.tech portfolio site at `/webbuilder`. This repo also has its own Next.js gallery for local preview and development.

## Tech Stack
- **Next.js 16.2.3** (App Router, TypeScript, React 19)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`, CSS-first config in `globals.css`)
- **shadcn/ui** components (Base UI + class-variance-authority for styling)
- **Firecrawl** — web scraping for research (`@mendable/firecrawl-js` + MCP server)
- **File-based data** — no database, each demo has a `meta.json`
- **Deployment**: Vercel (auto-deploys from GitHub)

## Project Structure
```
src/
├── app/
│   ├── layout.tsx                # Root layout (Geist fonts)
│   ├── page.tsx                  # Gallery home — reads meta.json files, filterable grid
│   ├── globals.css               # Tailwind v4 + shadcn theme variables
│   └── demos/
│       ├── layout.tsx            # Pass-through wrapper
│       └── [slug]/
│           ├── page.tsx          # Dynamic demo viewer (loads from registry)
│           ├── info/page.tsx     # Demo metadata/details page
│           └── error.tsx         # Error boundary per demo
├── demos/                        # === REACT DEMO LIBRARY ===
│   ├── index.ts                  # Registry: slug → dynamic(() => import(...))
│   ├── _template/                # Copy this to start a new demo
│   │   ├── page.tsx
│   │   ├── meta.json
│   │   ├── components/.gitkeep
│   │   └── styles.module.css
│   └── mr-juicy/                 # Live demo
│       ├── page.tsx              # ~300 line React component
│       ├── meta.json             # Published metadata
│       ├── styles.module.css     # Neo-brutalist brand styles
│       └── assets/               # logo-full.svg, burger-emblem.png, burger.jpg, og-image.png
├── components/
│   ├── demo-shell.tsx            # Style isolation wrapper (all: initial + floating nav)
│   ├── gallery/
│   │   ├── demo-grid.tsx         # Responsive card grid
│   │   ├── demo-card.tsx         # Card with thumbnail/fallback, badges, hover effects
│   │   ├── filter-bar.tsx        # Industry + category badge filters (URL search params)
│   │   └── search-input.tsx      # Debounced search (300ms)
│   └── ui/                       # shadcn components (badge, button, card, input, separator, skeleton)
└── lib/
    ├── demos.ts                  # getAllDemos(), getDemo(slug), getAllSlugs() — reads filesystem
    ├── firecrawl.ts              # scrapePage(), crawlSite(), mapSite(), searchWeb() utilities
    ├── types.ts                  # DemoMeta, Demo, DemoStatus types
    ├── constants.ts              # INDUSTRIES[], CATEGORIES[] arrays
    └── utils.ts                  # cn() utility

sites/                            # === STATIC HTML FOR GRAEBENER.TECH ===
├── mr-juicy/
│   ├── index.html                # Self-contained HTML/CSS/JS
│   └── meta.json
└── _template/
    ├── index.html
    └── meta.json
```

## How It Works

### Local Gallery (this project)
- `src/lib/demos.ts` scans `src/demos/` at build time, reads each `meta.json`
- Only demos with `"status": "published"` appear in the gallery
- Gallery page (`src/app/page.tsx`) renders a filterable grid with search
- Clicking a card loads the React component at `/demos/[slug]`
- Each demo is code-split via `dynamic()` imports in the registry

### Graebener.tech Display
- Graebener.tech serves demo sites from `public/webbuilder/sites/[slug]/`
- Each site is a folder with `index.html` + assets + `meta.json`
- Cards appear at `/webbuilder`, clicking opens the full HTML site in a new tab
- **To display a demo on Graebener.tech**: copy the HTML/CSS/JS/assets directly into `Graebener.tech/public/webbuilder/sites/[slug]/`

## Research Workflow (Firecrawl)

Firecrawl is available two ways: as an **MCP server** (use tools directly in conversation) and as an **npm package** (`src/lib/firecrawl.ts`).

### MCP Tools (interactive research)
Use these during conversation to research before building a demo:
- **firecrawl_scrape** — Scrape a single page (returns markdown + HTML + metadata)
- **firecrawl_crawl** — Crawl an entire site (follows links, returns all pages)
- **firecrawl_map** — Discover all URLs on a site without scraping content
- **firecrawl_search** — Search the web for sites by query
- **firecrawl_extract** — Extract structured data from pages

### Research before building a demo
1. **Map the site**: `firecrawl_map` to discover all pages and structure
2. **Scrape key pages**: `firecrawl_scrape` the homepage, about, menu/services pages
3. **Analyze**: Review the markdown for brand voice, content structure, color hints
4. **Build**: Use `frontend-design` skill with the research as context

### Design inspiration
1. **Search**: `firecrawl_search` for "[industry] website design 2026"
2. **Scrape references**: Pull HTML/CSS patterns from top results
3. **Clone/adapt**: Use scraped structure as a starting point for the demo

### npm utilities (`src/lib/firecrawl.ts`)
For scripted/automated research:
- `scrapePage(url)` — Single page scrape → markdown + html + metadata
- `crawlSite(url, { maxDepth, limit })` — Full site crawl
- `mapSite(url)` — URL discovery
- `searchWeb(query, { limit })` — Web search with scraped results

### Environment
- API key in `.env.local` as `FIRECRAWL_API_KEY` (gitignored)
- MCP server configured in Claude Code local config

## Demo Creation Workflow

### Step 1: Build the demo
1. Copy `src/demos/_template/` to `src/demos/[slug]/`
2. Use the `frontend-design` skill to design the page
3. Build `page.tsx` as the default export
4. Use **CSS Modules** (`styles.module.css`) for scoped styles — Tailwind is also available
5. Import assets from the demo's `assets/` folder

### Step 2: Fill in meta.json
```json
{
  "title": "Demo Title",
  "description": "Short description for gallery card",
  "industry": "restaurant",
  "category": "landing-page",
  "tags": ["tag1", "tag2"],
  "status": "published",
  "color_accent": "#6366f1",
  "tech_stack": ["tailwind", "css-modules"],
  "client_name": "Optional Client",
  "long_description": "Detailed description for the info page"
}
```

### Step 3: Register the demo (REQUIRED — not auto-detected)
Add to `src/demos/index.ts`:
```ts
"my-slug": dynamic(() => import("./my-slug/page")),
```

### Step 4: Export to Graebener.tech (optional)
Copy or recreate the demo as self-contained HTML in:
```
Graebener.tech/public/webbuilder/sites/[slug]/
├── index.html    # Full site with inlined or linked CSS/JS
├── meta.json     # Same format as above
├── styles.css    # Optional external stylesheet
├── assets/       # Images, fonts, etc.
└── *.html        # Additional pages
```
Push Graebener.tech — card appears at `/webbuilder`.

## Key Patterns

### Style Isolation
- `DemoShell` (`src/components/demo-shell.tsx`) wraps every demo in `style={{ all: "initial" }}`
- This prevents gallery Tailwind styles from bleeding into demo content
- Demos MUST use CSS Modules or inline styles — never import `globals.css`
- Floating "Gallery" and "Info" buttons overlay on top of the demo

### Demo Registry
- `src/demos/index.ts` is a manual map of `slug → dynamic(() => import(...))`
- **You must add each new demo here** — the system does not auto-scan folders
- `dynamic()` gives each demo its own code-split chunk

### Data Layer
- `src/lib/demos.ts` uses `fs.readdirSync` to scan `src/demos/` at build time
- Skips folders starting with `_` (template)
- Reads `meta.json` from each folder
- `getAllDemos()` filters to `status === "published"` and sorts by title

### Gallery Filtering
- URL search params: `?q=search&industry=restaurant&category=landing-page`
- `FilterBar` uses `useRouter` + `useSearchParams` to toggle filters
- `SearchInput` debounces 300ms before updating URL
- Filtering logic is in the gallery page server component, not the data layer

## meta.json Fields
| Field | Required | Description |
|-------|----------|-------------|
| title | yes | Display name |
| description | yes | Short description for gallery card |
| industry | yes | One of: restaurant, legal, healthcare, real-estate, fitness, education, technology, retail, creative, finance, hospitality, nonprofit |
| category | yes | One of: landing-page, full-site, portfolio, e-commerce, blog, dashboard, saas |
| tags | yes | Array of freeform strings |
| status | yes | `"draft"`, `"published"`, or `"archived"` |
| color_accent | no | Hex color for card fallback thumbnail (default: #6366f1) |
| tech_stack | no | Array of tech used (e.g., `["tailwind", "framer-motion"]`) |
| client_name | no | Who it was built for |
| long_description | no | Detailed description for the info page |
| thumbnail | no | Relative path to thumbnail image in the demo folder |

## MCP Tools

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
- `mcp__playwright__browser_resize` — Set viewport for responsive screenshots

### Porkbun MCP
- `mcp__porkbun__dns_create` — Add DNS records for domain
- `mcp__porkbun__dns_list` — View current DNS records

## Skills
- `frontend-design` — Use for ALL demo page creation
- `vercel:deploy` — Deploy previews or production (`/deploy prod`)
- `vercel:shadcn` — Add shadcn components (`npx shadcn@latest add <component>`)
- `vercel:nextjs` — Reference for App Router patterns

## Git Workflow (git-auto skill)

This project uses the **git-auto** skill (`.claude/skills/git-auto/SKILL.md`) for all git operations:
- Use **conventional commits**: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`, `chore:`
- **Stage files explicitly** — never `git add -A` or `git add .`
- **Log every git session** to `.claude/git-auto-log.json`
- Never commit `.env`, credentials, or secrets
- Never force push to main/master/prod
- If a pre-commit hook fails, fix the issue and create a NEW commit (never --amend)

## Commands
- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build
- `npm run lint` — Run ESLint
