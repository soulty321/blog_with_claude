# Blog Pipeline — Project Context

## 저장소 정보

- **GitHub:** `soulty321/blog_with_claude` (private)
- **로컬 경로:** `C:\Users\soult\workSpace\blog\`
- **발행 플랫폼:** 브런치 (수동 업로드, 공개 타이밍 직접 결정)
- **소스:** 일본 컨퍼런스 자료 11개 (7개 발행 완료, 4개 진행 중)

---

## 2일 사이클 워크플로우

### Day 1 — 자동 (routine /schedule)
1. 일본 컨퍼런스 원본 자료 → 초안 생성
2. WebSearch로 이미지 후보 5-6장 수집 (Unsplash/Pexels/Pixabay 우선)
3. `drafts/` + `data/images/YYYY-MM-DD.json` push
4. Discord #blog 알림
5. 인터뷰 질문 5개 생성 → `data/questions/YYYY-MM-DD.json` push
6. Discord #blog 질문 + 이미지 수집 현황 전송

### Day 2 — 수동 (`/blog-enhance` 스킬)
1. `process_state.json`에서 `status: "questions_sent"` 아티클 탐색
2. 질문 + 초안 + 사전 답변 로드
3. 사용자가 질문에 답변 입력
4. 이미지 후보에서 커버 1장 + 인라인 2-3장 선택
5. 실무자 관점 보강 + 이미지 삽입 → 완성본 작성
6. `published/` push → Discord 완성본 알림
7. 브런치 작가의 서랍에 수동 업로드 → 공개 타이밍에 맞춰 발행

---

## 핵심 파일 경로 및 역할

| 파일 | 역할 |
|------|------|
| `data/process_state.json` | 전체 아티클 상태 추적 (단일 진실 공급원) |
| `data/questions/YYYY-MM-DD.json` | 날짜별 인터뷰 질문 5개 |
| `data/images/YYYY-MM-DD.json` | 날짜별 이미지 후보 메타데이터 |
| `data/answers/YYYY-MM-DD.json` | 사전 작성 답변 (있을 경우) |
| `drafts/` | Day 1 생성 초안 마크다운 |
| `published/` | Day 2 최종 완성본 마크다운 |
| `text-style/` | 참고용 아티클 스타일 샘플 |

---

## process_state.json 상태 플로우

```
draft_created → questions_sent → published
```

**주요 필드:**
```json
{
  "article_status": {
    "YYYY-MM-DD-키": {
      "source": "원본 파일명",
      "draft_file": "drafts/...",
      "status": "questions_sent",
      "questions_file": "data/questions/YYYY-MM-DD.json",
      "images_file": "data/images/YYYY-MM-DD.json",
      "published_file": "published/..."
    }
  }
}
```

---

## 이미지 규칙

### 저장 형식 (`data/images/YYYY-MM-DD.json`)
```json
[
  {
    "url": "이미지_URL",
    "source_name": "Unsplash",
    "source_url": "출처_페이지_URL",
    "photographer": "촬영자명",
    "alt_text": "이미지 설명"
  }
]
```

### 마크다운 삽입
```markdown
![alt_text](url)
*출처: [Unsplash / 촬영자명](source_url)*
```

### 커버 이미지 지정
```html
<!-- cover_image: URL -->
```
GitHub Actions가 이 주석을 파싱해 Hashnode `coverImageOptions`에 전달함.

---

## 사전 답변 confidence 레벨

| 레벨 | 처리 방식 |
|------|----------|
| `high` | 검토만 하고 그대로 사용 |
| `medium` | 검토 후 보강 반영 |
| `needs_user` | 사용자 직접 답변 필수 |

---

## 블로그 주요 독자 (타겟)

- 채용을 담당하는 시니어 디자이너
- 인사팀 (HR)
- 타겟 기업: 토스증권, 카카오뱅크, 채널톡, 보이저엑스, 뤼튼, 당근마켓 등 AI/B2B SaaS 중심

## 필자 포지셔닝

**문호균 — B2B SaaS 프로덕트 디자이너**
- 데이터로 사용자 불편함을 증명하고 논리적 UX 설계로 비즈니스 성과를 만드는 디자이너
- 핵심 강점 4가지: 데이터 기반 의사결정 / 문제 정의력 / 실행력·빠른 가설 검증 / 시스템 사고

## 아티클 목적 및 방향

**목적:** 자기 세일즈 — 컨퍼런스 인사이트를 소재로, 필자의 **사고 방식**과 **실무 판단력**을 채용 담당자에게 자연스럽게 노출

**방향:**
- 인사이트 요약 X → "나는 이것을 이렇게 해석하고, 실무에 이렇게 적용한다" O
- 각 아티클마다 핵심 강점 4가지 중 하나 이상이 자연스럽게 드러나야 함
- B2B SaaS / AI 프로덕트 맥락과 연결 (타겟 기업 JD 키워드: 데이터 기반 의사결정, 복잡한 정보 단순화, 빠른 실행과 검증)

---

## 소스 소진 후 전략

컨퍼런스 자료 4개 소진 후 → `notebook.md` 기반 콘텐츠로 전환.
B2B 데이터 분석 서비스 디자이너 관점, 스터디 노트북 주제 활용.
회사 내부 데이터 비노출 원칙 준수.
