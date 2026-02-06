import { loadSearchIndex, loadSearchDocs } from "../data/loader.js";
import type { SearchDocument } from "../data/types.js";

export interface SearchResult {
  id: string;
  type: SearchDocument["type"];
  title: string;
  score: number;
  category?: string;
  path?: string;
}

export interface SearchOptions {
  type?: "contract" | "sdk" | "guide" | "all";
  limit?: number;
}

export function search(query: string, options: SearchOptions = {}): SearchResult[] {
  const index = loadSearchIndex();
  const docs = loadSearchDocs();

  // Perform search
  let results = index.search(query);

  // Get full documents
  const docsById = new Map(docs.map((d) => [d.id, d]));

  let searchResults: SearchResult[] = results
    .map((result) => {
      const doc = docsById.get(result.ref);
      if (!doc) return null;
      return {
        id: doc.id,
        type: doc.type,
        title: doc.title,
        score: result.score,
        category: doc.category,
        path: doc.path,
      } as SearchResult;
    })
    .filter((r): r is SearchResult => r !== null);

  // Filter by type if specified
  if (options.type && options.type !== "all") {
    searchResults = searchResults.filter((r) => r.type === options.type);
  }

  // Apply limit
  if (options.limit) {
    searchResults = searchResults.slice(0, options.limit);
  }

  return searchResults;
}
