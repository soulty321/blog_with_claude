'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '전체' },
    ...CATEGORIES.map((c) => ({ href: `/category/${c.slug}`, label: c.name })),
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-title">
          호균 블로그
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-[15px] font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-primary-light'
                    : 'text-secondary hover:text-title hover:bg-surface'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <MobileMenu navItems={navItems} pathname={pathname} />
      </div>
    </header>
  );
}

function MobileMenu({
  navItems,
  pathname,
}: {
  navItems: { href: string; label: string }[];
  pathname: string;
}) {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2 text-secondary hover:text-title">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </summary>
        <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-lg border border-border p-2 min-w-[180px]">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 rounded-xl text-[15px] font-medium ${
                  isActive
                    ? 'text-primary bg-primary-light'
                    : 'text-secondary hover:text-title hover:bg-surface'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </details>
    </div>
  );
}
