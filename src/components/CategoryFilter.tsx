'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CategoryCount {
  slug: string;
  name: string;
  count: number;
}

export default function CategoryFilter({
  categories,
  totalCount,
}: {
  categories: CategoryCount[];
  totalCount: number;
}) {
  const pathname = usePathname();

  const items = [
    { slug: '', name: '전체', count: totalCount, href: '/' },
    ...categories.map((c) => ({
      ...c,
      href: `/category/${c.slug}`,
    })),
  ];

  return (
    <aside className="w-[300px] shrink-0 hidden lg:block">
      <div className="sticky top-24 bg-surface rounded-3xl px-6 py-7">
        <h3 className="text-lg font-bold text-title mb-4">카테고리</h3>
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href;
            return (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className={`flex justify-between items-center px-4 py-2.5 rounded-xl text-[15px] transition-colors ${
                    isActive
                      ? 'text-primary font-semibold bg-primary-light'
                      : 'text-secondary hover:text-title hover:bg-white'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-muted text-sm">{item.count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
