import { getAllPosts } from '@/lib/posts';
import { AUTHOR, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

export async function GET() {
  const posts = getAllPosts();

  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `## Author`,
    `- Name: ${AUTHOR.name}`,
    `- Role: ${AUTHOR.role}`,
    `- Bio: ${AUTHOR.bio}`,
    `- Expertise: ${AUTHOR.domains.join(', ')}`,
    `- About page: ${SITE_URL}/about`,
    '',
    `## Content Categories`,
    '- UX법칙: UX/UI 디자인 법칙과 심리학 기반 설계 원칙',
    '- AI: AI 에이전트, 멀티에이전트, 휴먼인더루프 디자인',
    '- 커리어: 디자이너 커리어 성장과 학습 전략',
    '- B2B SaaS: B2B 분석 도구 UX 설계와 SaaS 프로덕트 전략',
    '',
    `## Articles (${posts.length} posts)`,
    '',
    ...posts.map(
      (p) =>
        `- [${p.title}](${SITE_URL}/posts/${p.slug}): ${p.excerpt || p.title} (${p.date}, ${p.category})`
    ),
    '',
    `## Links`,
    `- Homepage: ${SITE_URL}`,
    `- RSS Feed: ${SITE_URL}/feed.xml`,
    `- Sitemap: ${SITE_URL}/sitemap.xml`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
