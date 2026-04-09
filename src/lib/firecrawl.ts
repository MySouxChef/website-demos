import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY!,
});

/**
 * Scrape a single page — returns markdown content, metadata, and HTML.
 * Great for researching a client's existing site or pulling design reference.
 */
export async function scrapePage(url: string) {
  const result = await firecrawl.scrapeUrl(url, {
    formats: ["markdown", "html"],
  });

  if (!result.success) {
    throw new Error(`Scrape failed: ${result.error}`);
  }

  return {
    markdown: result.markdown,
    html: result.html,
    metadata: result.metadata,
  };
}

/**
 * Crawl an entire site — follows links up to maxDepth.
 * Returns all pages as markdown + metadata.
 * Use for full site research before building a demo.
 */
export async function crawlSite(
  url: string,
  options?: { maxDepth?: number; limit?: number }
) {
  const result = await firecrawl.crawlUrl(url, {
    limit: options?.limit ?? 10,
    maxDepth: options?.maxDepth ?? 2,
    scrapeOptions: {
      formats: ["markdown"],
    },
  });

  if (!result.success) {
    throw new Error(`Crawl failed: ${result.error}`);
  }

  return result.data;
}

/**
 * Map a site — returns all discovered URLs without scraping content.
 * Fast way to understand site structure before doing a full crawl.
 */
export async function mapSite(url: string) {
  const result = await firecrawl.mapUrl(url);

  if (!result.success) {
    throw new Error(`Map failed: ${result.error}`);
  }

  return result.links;
}

/**
 * Search the web — find sites by query, returns scraped results.
 * Great for finding design inspiration by industry.
 */
export async function searchWeb(query: string, options?: { limit?: number }) {
  const result = await firecrawl.search(query, {
    limit: options?.limit ?? 5,
    scrapeOptions: {
      formats: ["markdown"],
    },
  });

  if (!result.success) {
    throw new Error(`Search failed: ${result.error}`);
  }

  return result.data;
}

export { firecrawl };
