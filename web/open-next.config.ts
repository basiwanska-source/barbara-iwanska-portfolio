import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Strony /strona/[n] są prerenderowane (SSG). Bez incremental cache OpenNext
// szukałby ich w KV/R2 i zwracał 404 — tu serwujemy je z assets (read-only).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
