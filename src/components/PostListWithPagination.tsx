'use client';

import { useState } from 'react';
import PostCard from './PostCard';
import type { Post } from '@/lib/posts';

const POSTS_PER_PAGE = 10;

export default function PostListWithPagination({ posts }: { posts: Post[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const displayed = posts.slice(0, page * POSTS_PER_PAGE);
  const hasMore = page < totalPages;

  return (
    <div>
      <div>
        {displayed.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-3 rounded-xl text-[15px] font-semibold text-secondary bg-surface hover:bg-border transition-colors"
          >
            더 보기
          </button>
        </div>
      )}
    </div>
  );
}
