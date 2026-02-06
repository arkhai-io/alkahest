import { readFileSync, readdirSync } from "fs";
import { join, basename } from "path";
import type { GuideDoc, GuideSection } from "../src/data/types.js";

const DOCS_DIR = join(import.meta.dir, "../../");

// Parse a markdown file into sections
function parseMarkdown(content: string): GuideSection[] {
  const sections: GuideSection[] = [];
  const lines = content.split("\n");

  let currentSection: GuideSection | null = null;
  let currentContent: string[] = [];
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockContent: string[] = [];

  for (const line of lines) {
    // Check for code block start/end
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        // End of code block
        if (currentSection) {
          currentSection.codeExamples = currentSection.codeExamples || [];
          currentSection.codeExamples.push({
            language: codeBlockLang || "text",
            code: codeBlockContent.join("\n"),
          });
        }
        inCodeBlock = false;
        codeBlockLang = "";
        codeBlockContent = [];
      } else {
        // Start of code block
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Check for headers
    const headerMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headerMatch) {
      // Save previous section
      if (currentSection) {
        currentSection.content = currentContent.join("\n").trim();
        sections.push(currentSection);
      }

      // Start new section
      currentSection = {
        title: headerMatch[2],
        content: "",
      };
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    } else {
      // Content before first header
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentSection) {
    currentSection.content = currentContent.join("\n").trim();
    sections.push(currentSection);
  }

  return sections;
}

// Extract contract references from content
function extractContractReferences(content: string): string[] {
  const refs = new Set<string>();

  // Pattern for contract names (PascalCase ending in common suffixes)
  const patterns = [
    /\b([A-Z][a-zA-Z0-9]*(?:Obligation|Arbiter|Utils))\b/g,
    /\b(ERC20|ERC721|ERC1155|NativeToken|TokenBundle|Attestation)(?:Escrow|Payment|Barter)/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      refs.add(match[1] || match[0]);
    }
  }

  return Array.from(refs);
}

// Parse a single guide file
function parseGuide(filePath: string): GuideDoc {
  const content = readFileSync(filePath, "utf-8");
  const fileName = basename(filePath, ".md");

  // Extract title from first H1 or filename
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : fileName;

  const sections = parseMarkdown(content);
  const referencedContracts = extractContractReferences(content);

  return {
    title,
    path: fileName,
    sections,
    referencedContracts,
  };
}

// Main export function
export async function parseGuides(): Promise<GuideDoc[]> {
  const files = readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => join(DOCS_DIR, f));

  const guides: GuideDoc[] = [];

  for (const file of files) {
    try {
      guides.push(parseGuide(file));
    } catch (error) {
      console.error(`Error parsing ${file}:`, error);
    }
  }

  console.log(`Parsed ${guides.length} guides`);
  return guides;
}

// Run directly for testing
if (import.meta.main) {
  const guides = await parseGuides();
  for (const guide of guides) {
    console.log(`\n${guide.title}`);
    console.log(`  Sections: ${guide.sections.length}`);
    console.log(`  Code examples: ${guide.sections.reduce((sum, s) => sum + (s.codeExamples?.length || 0), 0)}`);
    console.log(`  Referenced contracts: ${guide.referencedContracts.join(", ")}`);
  }
}
