| 스타일 | Size | Weight | Line-height | Color |
|--------|------|--------|-------------|-------|
| Article Title (H1) | 48px | 700 | 60px | `#333D4B` |
| Page Title (목록 H1) | 36px | 700 | 48.6px | `#333D4B` |
| Heading 2 | 30px | 700 | 46.5px | `#191F28` |
| Heading 3 | 24px | 700 | 38.4px | `#191F28` |
| Card Title | 20px | 700 | 29px | `#191F28` |
| Page Subtitle | 20px | 500 | 28px | `#6B7684` |
| Body / 본문 | 17px | 400 | 27.2px | `#333D4B` |
| Card Excerpt | 17px | 400 | 27.2px | `#6B7684` |
| Nav / Body 기본 | 16px | 400 | — | `#212529` |
| Date | 14px | 400 | — | `#8B95A1` |
| Category Tag / Author | 13px | 600 | 20.8px | — |

- 강조(Strong): `font-weight: 700`, 본문과 같은 색으로 굵기만 변화
- 본문 단락 간격: `margin-bottom: 8px`
- H2 상단 여백: `margin-top: 40px`, 하단 4px

## 4. 레이아웃 (Layout)

- **콘텐츠 폭**: 아티클 본문 max-width **740px**, 중앙 정렬
- **헤더(Nav)**: 투명/화이트 배경, 좌측 로고 + 중앙 메뉴(Engineering / Design / Product) + 우측 CTA·검색 아이콘
- **목록 페이지**: 2단 구성 — 좌측 아티클 리스트(텍스트 + 썸네일), 우측 `직무 카테고리` 필터 사이드바(폭 300px)
- **여백 철학**: 섹션·요소 간 넉넉한 화이트 스페이스로 호흡감 확보

## 5. 컴포넌트 (Components)

### Category Tag (카테고리 라벨)
```css
color: #3182F6;
background: #E8F3FF;
font-size: 13px;
font-weight: 600;
padding: 2px 10px;
border-radius: 8px;
```

### Filter Card (사이드바)
```css
background: #F2F4F6;
border-radius: 24px;
padding: 28px 24px 24px;
width: 300px;
box-shadow: none;
border: none;
```

### Subscribe Button (구독하기 — Primary)
```css
color: #007BFF;
background: transparent;
font-size: 16px;
```

### Recruit Button (채용 바로가기 — Secondary)
```css
color: rgba(3, 18, 40, 0.7);
background: rgba(2, 32, 71, 0.05);
font-size: 15px;
font-weight: 600;
padding: 9px 12px;
border-radius: 10px;
```

### Blockquote (인용)
```css
font-size: 19px;
color: #191F28;
padding: 0 0 0 20px;   /* 좌측 들여쓰기 */
```

## 6. 라운딩 & 형태 (Radius)

| 요소 | Radius |
|------|--------|
| 카테고리 태그 | 8px |
| 버튼 | 10px |
| 필터/서피스 카드 | 24px |

## 7. 요약 (Cheat Sheet)

- **메인 컬러**: 토스 블루 `#3182F6`
- **제목 컬러**: `#191F28` / `#333D4B`
- **보조 텍스트**: `#6B7684` / `#8B95A1`
- **서피스 그레이**: `#F2F4F6`
- **폰트**: Toss Product Sans (sans-serif)
- **본문**: 17px / line-height 1.6 / 폭 740px
- **제목 굵기**: 700 (Bold) 일관 적용
- **스타일 키워드**: 미니멀 · 화이트 스페이스 · 강한 타이포 위계 · 절제된 블루 포인트