import type { Metadata } from 'next';
import { AUTHOR, SITE_URL, SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `About — ${AUTHOR.name}`,
  description: AUTHOR.bio,
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.role,
    description: AUTHOR.bio,
    url: `${SITE_URL}/about`,
    knowsAbout: AUTHOR.domains,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[740px] mx-auto px-6 py-16">
        <section className="mb-12">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary text-3xl font-bold shrink-0">
              {AUTHOR.name[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-title">{AUTHOR.name}</h1>
              <p className="mt-1 text-lg text-primary font-semibold">
                {AUTHOR.role}
              </p>
              <p className="mt-3 text-[17px] leading-[27.2px] text-body">
                {AUTHOR.bio}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-title mb-6">핵심 역량</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AUTHOR.strengths.map((s) => (
              <div
                key={s.title}
                className="p-6 rounded-3xl bg-surface"
              >
                <h3 className="font-bold text-title text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-[15px] leading-6 text-secondary">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-title mb-6">관심 도메인</h2>
          <div className="flex flex-wrap gap-3">
            {AUTHOR.domains.map((d) => (
              <span
                key={d}
                className="px-4 py-2 rounded-xl bg-primary-light text-primary font-semibold text-[15px]"
              >
                {d}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
