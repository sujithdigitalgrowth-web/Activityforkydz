import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  // Overrides for the page <title> (without the " | activityforKydz" suffix
  // — the root layout's title template adds that) and meta description.
  // Same pattern as Product.seoTitle/seoDescription.
  seoTitle?: string;
  seoDescription: string;
  excerpt: string;
  publishedDate: string; // ISO date, e.g. "2026-07-11"
  // Optional real photo. Until one exists, posts fall back to the emoji +
  // gradient placeholder below — same convention as ProductVisual, not a
  // sourced/generated image.
  featuredImage?: string;
  featuredImageAlt?: string;
  placeholderEmoji: string;
  placeholderAccent: string; // tailwind gradient pair, matches Product.accent
};

export type BlogPost = PostFrontmatter & {
  slug: string; // derived from the filename, not stored in frontmatter
  content: string; // raw markdown body
};

function readPostFile(filename: string): BlogPost {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return { slug, content, ...(data as PostFrontmatter) };
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(readPostFile)
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  return readPostFile(`${slug}.md`);
}
