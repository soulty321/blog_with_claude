import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getAllPosts,
  getPostBySlug,
  renderMarkdown,
} from '@/lib/posts';
import { SITE_URL, AUTHOR, SITE_NAME } from '@/lib/constants';
import CategoryTag from '@/components/CategoryTag';
import PostContent from '@/components/PostContent';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/posts/${slug}`,
      publishedTime: post.date,
      authors: [AUTHOR.name],
    },
    alternates: {
      canonical: `${SITE_URL}/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.rawContent);

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      jobTitle: AUTHOR.role,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR.name,
    },
    description: post.excerpt,
    url: `${SITE_URL}/posts/${slug}`,
    mainEntityOfPage: `${SITE_URL}/posts/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-[740px] mx-auto px-6 py-12">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <CategoryTag
              name={post.category}
              slug={post.categorySlug}
              size="md"
            />
            <time className="text-sm text-muted" dateTime={post.date}>
              {post.date}
            </time>
          </div>
          <div className="flex items-center gap-2 mt-6 text-sm text-secondary">
            <span className="font-semibold text-title">{AUTHOR.name}</span>
            <span className="text-muted">·</span>
            <span>{AUTHOR.role}</span>
          </div>
        </header>

        <PostContent html={html} />

        <nav className="mt-16 pt-8 border-t border-border grid grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/posts/${prevPost.slug}`}
              className="group p-5 rounded-2xl bg-surface hover:bg-primary-light transition-colors"
            >
              <span className="text-xs text-muted">이전 글</span>
              <p className="mt-1 text-[15px] font-semibold text-title group-hover:text-primary line-clamp-2">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="group p-5 rounded-2xl bg-surface hover:bg-primary-light transition-colors text-right"
            >
              <span className="text-xs text-muted">다음 글</span>
              <p className="mt-1 text-[15px] font-semibold text-title group-hover:text-primary line-clamp-2">
                {nextPost.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </>
  );
}
