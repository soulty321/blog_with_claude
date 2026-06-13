import Link from 'next/link';

export default function CategoryTag({
  name,
  slug,
  size = 'sm',
}: {
  name: string;
  slug: string;
  size?: 'sm' | 'md';
}) {
  return (
    <Link
      href={`/category/${slug}`}
      className={`inline-block text-primary bg-primary-light font-semibold rounded-lg hover:opacity-80 transition-opacity ${
        size === 'md' ? 'text-sm px-3 py-1' : 'text-[13px] px-2.5 py-0.5'
      }`}
    >
      {name}
    </Link>
  );
}
