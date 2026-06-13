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
    name: AUTHOR.fullName,
    jobTitle: AUTHOR.role,
    description: AUTHOR.bio,
    email: AUTHOR.email,
    url: `${SITE_URL}/about`,
    knowsAbout: AUTHOR.domains,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: AUTHOR.education.school,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[740px] mx-auto px-6 py-16">
        {/* Profile */}
        <section className="mb-14">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center text-primary text-3xl font-bold shrink-0">
              M
            </div>
            <div>
              <h1 className="text-3xl font-bold text-title">{AUTHOR.name}</h1>
              <p className="text-sm text-muted mt-0.5">{AUTHOR.fullName}</p>
              <p className="mt-1 text-lg text-primary font-semibold">
                {AUTHOR.role}
              </p>
              <p className="mt-3 text-[17px] leading-[27.2px] text-body">
                {AUTHOR.bio}
              </p>
              <a
                href={`mailto:${AUTHOR.email}`}
                className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-[15px] hover:opacity-90 transition-opacity"
              >
                Contact →
              </a>
            </div>
          </div>
        </section>

        {/* Strengths */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-title mb-6">Core Strengths</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AUTHOR.strengths.map((s) => (
              <div key={s.title} className="p-6 rounded-3xl bg-surface">
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

        {/* Experience */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-title mb-6">Experience</h2>
          <div className="space-y-8">
            {AUTHOR.experience.map((exp) => (
              <div key={exp.company} className="relative pl-6 border-l-2 border-border">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{exp.flag}</span>
                  <h3 className="font-bold text-title text-lg">{exp.company}</h3>
                </div>
                <p className="text-sm text-primary font-semibold">{exp.role}</p>
                <p className="text-sm text-muted mb-3">{exp.period}</p>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-[15px] leading-6 text-secondary pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-muted"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-title mb-6">Activities</h2>
          {AUTHOR.activities.map((a) => (
            <div key={a.title} className="pl-6 border-l-2 border-border">
              <h3 className="font-bold text-title">{a.title}</h3>
              <p className="text-sm text-muted mb-1">{a.period}</p>
              <p className="text-[15px] text-secondary">{a.description}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-title mb-6">Education</h2>
          <div className="pl-6 border-l-2 border-border">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{AUTHOR.education.flag}</span>
              <h3 className="font-bold text-title">{AUTHOR.education.school}</h3>
            </div>
            <p className="text-sm text-primary font-semibold">{AUTHOR.education.major}</p>
            <p className="text-sm text-muted">{AUTHOR.education.period}</p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-title mb-6">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-surface">
              <h3 className="font-bold text-title text-sm mb-3">Development</h3>
              <div className="flex flex-wrap gap-2">
                {AUTHOR.skills.dev.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-white text-sm text-secondary">{s}</span>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-surface">
              <h3 className="font-bold text-title text-sm mb-3">Design</h3>
              <div className="flex flex-wrap gap-2">
                {AUTHOR.skills.design.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-white text-sm text-secondary">{s}</span>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-surface">
              <h3 className="font-bold text-title text-sm mb-3">Communication</h3>
              <div className="flex flex-wrap gap-2">
                {AUTHOR.skills.comm.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-lg bg-white text-sm text-secondary">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Domains */}
        <section>
          <h2 className="text-2xl font-bold text-title mb-6">Domains</h2>
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
