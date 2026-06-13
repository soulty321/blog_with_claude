import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import { CATEGORIES, SITE_URL } from '@/lib/constants';
import PostCard from '@/components/PostCard';
import CategoryFilter from '@/components/CategoryFilter';
import PostListWithPagination from '@/components/PostListWithPagination';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};

  return {
    title: `${cat.name} — 카테고리`,
    description: `${cat.name} 관련 글 모음`,
    alternates: { canonical: `${SITE_URL}/category/${category}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const posts = getPostsByCategory(category);
  const categories = getAllCategories();
  const totalCount = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      <section className="mb-10">
        <h1 className="text-page-title text-title-sub">{cat.name}</h1>
        <p className="mt-2 text-xl text-secondary font-medium leading-7">
          {cat.name} 관련 글 {posts.length}편
        </p>
      </section>
      <div className="flex gap-10">
        <div className="flex-1 min-w-0">
          <PostListWithPagination posts={posts} />
        </div>
        <CategoryFilter categories={categories} totalCount={totalCount} />
      </div>
    </div>
  );
}
