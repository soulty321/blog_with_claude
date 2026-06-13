export const SITE_URL = 'https://hokyun.dev';
export const SITE_NAME = 'MUNOART Design Blog';
export const SITE_DESCRIPTION =
  'B2B SaaS 프로덕트 디자이너의 블로그. UX 법칙, AI 에이전트, 데이터 기반 디자인에 대한 실무 인사이트를 공유합니다.';

export const AUTHOR = {
  name: 'MUNOART',
  Name: 'Moon',
  email: 'soulty321@gmail.com',
  role: 'B2B SaaS Product Designer',
  bio: '데이터로 사용자 불편함을 증명하고 논리적 UX 설계로 비즈니스 성과를 만드는 디자이너',
  strengths: [
    {
      title: 'AI 시스템 설계',
      description:
        'AI 파이프라인 7단계를 직접 학습하고, 2,050건 데이터를 99% 정확도로 처리하는 AI UX를 설계합니다.',
    },
    {
      title: 'VOC → 풀사이클 설계',
      description:
        '고객 인터뷰에서 문제를 발견하고, 리서치 → 가설 → 설계 → 출시 → 데이터 검증까지 전체 사이클을 주도합니다.',
    },
    {
      title: '데이터 기반 성과',
      description:
        '핵심 전환 지표 26.4% 성장, 리포트 작업 99% 절감 등 측정 가능한 비즈니스 임팩트를 만듭니다.',
    },
    {
      title: '디자인 시스템 구축',
      description:
        '14만 줄 레거시를 분석해 4층 컬러 토큰 체계를 설계하고, 코드베이스 40% 경량화를 달성했습니다.',
    },
  ],
  experience: [
    {
      company: '한국/일본 시장 데이터 분석 SaaS',
      role: '프로덕트 디자이너',
      period: '2023.03 ~ 현재',
      flag: '🇰🇷',
      highlights: [
        'AI CDJ 자동 분석 솔루션 — 2,050건 데이터 99% 정확도, 분석 시간 1~2일 → 10분',
        'AI 키워드 전략 에이전트 — 3,410회 사용, 인당 7.9회 재사용으로 PMF 검증',
        '유저 여정 듀얼뷰 UX — 핵심 전환 지표(검색량) 26.4% 성장, 특허 1건 등록',
        '워크플로우 자동화 — 리포트 작업 99% 절감(3일 → 1분), 월 290회 수동 작업 제거',
        '디자인 시스템 구축 — 코드베이스 40% 경량화, 빌드 대기 22초 → 0.2초',
      ],
    },
    {
      company: '일본 모빌리티 스타트업',
      role: 'Intern',
      period: '2023.10 ~ 2024.02',
      flag: '🇯🇵',
      highlights: [
        '도쿄 178개 거점 배치 디자인 제작',
        '앱 팝업·배너 콘텐츠 디자인',
        'KR 프로덕트 팀 원격 협업',
      ],
    },
    {
      company: '아티스트 굿즈 브랜드',
      role: 'Founder & Designer',
      period: '2018.12 ~ 2023.12',
      flag: '🎨',
      highlights: [
        '음악가 대상 브랜드 운영, 영업이익률 50.5% 달성',
        '팬덤 VOC 기반 상품 기획 및 판매',
      ],
    },
  ],
  education: {
    school: 'Nihon University',
    major: '디자인 학과',
    period: '2019.04 ~ 2023.03',
    flag: '🇯🇵',
  },
  activities: [
    {
      title: '당근 "각자 할 거 하는 모임" 운영',
      period: '2024.02 ~ 현재',
      description: '행동 심리 기반 온보딩 설계로 참여율 4배 증가, 지역 내 1위',
    },
  ],
  skills: {
    dev: ['HTML', 'CSS', 'LLM', 'Git'],
    design: ['Figma', 'UX 리서치', '문제 정의', 'Wireframe'],
    comm: ['One pager', '개발 프로세스 도식화', '일본어', '영어'],
  },
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
