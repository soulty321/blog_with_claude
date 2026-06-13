import Link from 'next/link';
import CategoryTag from './CategoryTag';
import type { Post } from '@/lib/posts';

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="py-7 border-b border-border last:border-b-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <CategoryTag name={post.category} slug={post.categorySlug} />
          <time className="text-sm text-muted" dateTime={post.date}>
            {post.date}
          </time>
        </div>
        <Link href={`/posts/${post.slug}`} className="group">
          <h2 className="text-xl font-bold text-title leading-[29px] group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-1.5 text-[17px] leading-[27.2px] text-secondary line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </Link>
      </div>
    </article>
  );
}
