import { getAllPosts, getAllCategories } from '@/lib/posts';
import { SITE_DESCRIPTION } from '@/lib/constants';
import PostCard from '@/components/PostCard';
import CategoryFilter from '@/components/CategoryFilter';
import PostListWithPagination from '@/components/PostListWithPagination';

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      <section className="mb-10">
        <h1 className="text-page-title text-title-sub">블로그</h1>
        <p className="mt-2 text-xl text-secondary font-medium leading-7">
          {SITE_DESCRIPTION}
        </p>
      </section>
      <div className="flex gap-10">
        <div className="flex-1 min-w-0">
          <PostListWithPagination posts={posts} />
        </div>
        <CategoryFilter categories={categories} totalCount={posts.length} />
      </div>
    </div>
  );
}
