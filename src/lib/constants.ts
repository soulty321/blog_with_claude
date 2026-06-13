export const SITE_URL = 'https://hokyun.dev';
export const SITE_NAME = '문호균 블로그';
export const SITE_DESCRIPTION =
  'B2B SaaS 프로덕트 디자이너 문호균의 블로그. UX 법칙, AI 에이전트, 데이터 기반 디자인에 대한 실무 인사이트를 공유합니다.';

export const AUTHOR = {
  name: '문호균',
  role: 'B2B SaaS 프로덕트 디자이너',
  bio: '데이터로 사용자 불편함을 증명하고 논리적 UX 설계로 비즈니스 성과를 만드는 디자이너',
  strengths: [
    {
      title: '데이터 기반 의사결정',
      description:
        '정량·정성 데이터를 분석하여 사용자 행동을 이해하고, 근거 있는 디자인 의사결정을 이끌어냅니다.',
    },
    {
      title: '문제 정의력',
      description:
        '복잡한 비즈니스 요구사항에서 진짜 문제를 찾아내고, 해결 가능한 단위로 구조화합니다.',
    },
    {
      title: '실행력 · 빠른 가설 검증',
      description:
        '가설을 세우고 프로토타입으로 빠르게 검증하여 학습 속도를 높입니다.',
    },
    {
      title: '시스템 사고',
      description:
        '개별 화면이 아닌 서비스 전체의 흐름과 구조를 설계합니다. 일관된 경험을 만드는 디자인 시스템을 구축합니다.',
    },
  ],
  domains: ['B2B SaaS', 'AI 프로덕트', '데이터 분석 도구', 'UX/UI 디자인'],
} as const;

export interface Category {
  slug: string;
  name: string;
  keywords: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'ux-laws',
    name: 'UX법칙',
    keywords: [
      '법칙',
      '효과',
      '원칙',
      '휴리스틱',
      '게슈탈트',
      '피츠',
      '힉',
      '밀러',
      '테슬러',
      '포스텔',
      '넛지',
      '슬러지',
      '디폴트',
      '프레이밍',
      '앵커링',
      '자이가르닉',
      '피크엔드',
      '파레토',
      '레스토프',
      '도허티',
      '잭의',
      '파킨슨',
      '사용성',
      '미학적',
      '손실 회피',
      '사회적 증거',
      '프로그레시브 디스클로저',
      '시각적 위계',
      '정보 아키텍처',
    ],
  },
  {
    slug: 'ai',
    name: 'AI',
    keywords: [
      'AI',
      '에이전트',
      '멀티에이전트',
      '메모리',
      '오케스트레이션',
      '휴먼인더루프',
    ],
  },
  {
    slug: 'career',
    name: '커리어',
    keywords: [
      '디자이너의 조건',
      '커리어',
      '배워야',
      '학습',
      '준비',
      '협업',
      '미래를 여는',
    ],
  },
  {
    slug: 'b2b-saas',
    name: 'B2B SaaS',
    keywords: [
      'B2B',
      'SaaS',
      '분석 도구',
      '대시보드',
      '리텐션',
      '온보딩',
      '훅 모델',
      '트리거',
      '투자 단계',
      '행동 단계',
    ],
  },
];
