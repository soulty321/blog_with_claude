import fs from 'fs';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import { CATEGORIES } from './constants';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  coverImage: string | null;
  content: string;
  rawContent: string;
}

const POSTS_DIRS = [
  path.join(process.cwd(), 'published'),
  path.join(process.cwd(), 'drafts'),
];

function classifyCategory(title: string): { name: string; slug: string } {
  for (const cat of CATEGORIES) {
    if (cat.keywords.some((kw) => title.includes(kw))) {
      return { name: cat.name, slug: cat.slug };
    }
  }
  return { name: 'B2B SaaS', slug: 'b2b-saas' };
}

function toAsciiSlug(filename: string): string {
  const base = filename.replace(/\.md$/, '');
  // Extract ASCII words (letters, numbers, hyphens)
  const asciiWords = base
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .toLowerCase()
    .split(/[\s-]+/)
    .filter((w) => w.length > 0);

  if (asciiWords.length >= 2) {
    return asciiWords.join('-');
  }

  // Fallback: date + hash for purely Korean filenames
  const dateMatch = base.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : '2026-01-01';
  let hash = 0;
  for (let i = 0; i < base.length; i++) {
    hash = ((hash << 5) - hash + base.charCodeAt(i)) | 0;
  }
  const id = Math.abs(hash).toString(36).padStart(6, '0').slice(0, 6);
  const prefix = asciiWords.length === 1 ? `${asciiWords[0]}-` : '';
  return `${date}-${prefix}${id}`;
}

function extractMetadata(filename: string, raw: string) {
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : '2026-01-01';

  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const title = titleMatch
    ? titleMatch[1].replace(/\*\*/g, '').trim()
    : filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');

  const coverMatch = raw.match(/<!--\s*cover_image:\s*(.+?)\s*-->/);
  const coverImage = coverMatch ? coverMatch[1].trim() : null;

  // Extract excerpt: first meaningful paragraph after the title
  const lines = raw.split('\n');
  let excerpt = '';
  let pastTitle = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!pastTitle) {
      if (trimmed.startsWith('# ')) pastTitle = true;
      continue;
    }
    if (
      trimmed === '' ||
      trimmed === '---' ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('!') ||
      trimmed.startsWith('<!--') ||
      trimmed.startsWith('*출처') ||
      trimmed.startsWith('>')
    ) {
      if (excerpt) break;
      continue;
    }
    excerpt += (excerpt ? ' ' : '') + trimmed;
    if (excerpt.length > 150) break;
  }
  if (excerpt.length > 160) {
    excerpt = excerpt.slice(0, 157) + '...';
  }

  const slug = toAsciiSlug(filename);

  const { name: category, slug: categorySlug } = classifyCategory(title);

  return { date, title, coverImage, excerpt, slug, category, categorySlug };
}

function getAllMarkdownFiles(): { filepath: string; filename: string }[] {
  const files: { filepath: string; filename: string }[] = [];
  const seen = new Set<string>();

  for (const dir of POSTS_DIRS) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      if (seen.has(f)) continue; // published takes priority (listed first)
      seen.add(f);
      files.push({ filepath: path.join(dir, f), filename: f });
    }
  }
  return files;
}

let cachedPosts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts;

  const files = getAllMarkdownFiles();
  const posts: Post[] = [];
  const slugCount = new Map<string, number>();

  for (const { filepath, filename } of files) {
    const raw = fs.readFileSync(filepath, 'utf-8');
    const meta = extractMetadata(filename, raw);

    // Deduplicate slugs by appending counter
    const baseSlug = meta.slug;
    const count = slugCount.get(baseSlug) || 0;
    slugCount.set(baseSlug, count + 1);
    if (count > 0) {
      meta.slug = `${baseSlug}-${count + 1}`;
    }

    const bodyContent = raw
      .replace(/<!--\s*cover_image:.*?-->\s*/g, '')
      .trim();

    posts.push({
      ...meta,
      content: '',
      rawContent: bodyContent,
    });
  }

  cachedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return cachedPosts;
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

export async function renderMarkdown(raw: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(raw);

  return String(result);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((p) => p.categorySlug === categorySlug);
}

export function getAllCategories(): { slug: string; name: string; count: number }[] {
  const posts = getAllPosts();
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    count: posts.filter((p) => p.categorySlug === cat.slug).length,
  }));
}
