import { AUTHOR, SITE_NAME } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted">
          © 2026 {AUTHOR.name} · {SITE_NAME}
        </div>
        <div className="text-sm text-muted">
          {AUTHOR.role}
        </div>
      </div>
    </footer>
  );
}
