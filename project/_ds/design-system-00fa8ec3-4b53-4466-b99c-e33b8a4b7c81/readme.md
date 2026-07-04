# 물때(Multtae) Design System

낚시인(갯바위·선상)을 위한 물때 정보 서비스 **물때(Multtae)**의 디자인 시스템.
"라이트 리퀴드 글래스" — 밝은 라벤더-블루 배경 위에 유동하는 리퀴드 블롭과 흰 유리 패널, 브랜드 블루(#0077FF) 액션 컬러로 이루어진 친근하고 부드러운 시스템이다.

## 소스

- `uploads/stitch_sns/` — 레퍼런스 화면(휴대폰 인증) + Blueprint Tactical DESIGN.md (타입 스케일·간격 체계의 출처)
- `물때 브랜딩.dc.html` — 로고·컬러·컴포넌트 탐색 캔버스 (특히 5턴 = 이 시스템의 확정 방향)
- `uploads/스플래시 ….md` — 스플래시 화면 기획 명세 (모션 타이밍의 출처)

## CONTENT FUNDAMENTALS

- **언어**: 한국어 우선. 서비스명은 한글 "물때"만 표기 (영문 병기 없음).
- **어조**: 친근한 해요체. 낚시 동행자가 말을 건네듯. 예: "오늘은 7물, 물이 잘 가는 날이에요", "물 흐름을 아는 낚시의 시작".
- **호칭**: 사용자를 직접 지칭하지 않고 상황을 말한다. 명령형 대신 안내형.
- **도메인 용어를 그대로 쓴다**: 만조/간조, 7물, 조금/사리, 갯바위/선상/방파제, 출조. 풀어 쓰지 않는다.
- **숫자·시간이 콘텐츠의 핵심**: 05:42 형식(24h), 해수면 cm, 음력 병기 ("7월 4일 (토) · 음력 5.20").
- **이모지 사용 안 함.**
- 버튼 카피는 2~4어절 동사형: "출조 일정 저장", "지금 물때 보기", "포인트 추가".

## VISUAL FOUNDATIONS

- **배경**: 항상 라벤더-블루 그라데이션 `--mt-bg` + 2~3개의 리퀴드 블롭(흰/코랄/블루 radial, `mt-morph` 15~20s로 느리게 모핑, blur 18~26px). 단색 배경 금지.
- **표면 = 유리**: 흰 반투명 패널 (`--mt-glass` 40% + `backdrop-filter: var(--mt-blur-md)` + 1px 흰 헤어라인 + `--mt-shadow-glass`). 깊이는 투명도 단계(40/50/60%)로 표현하고 진한 그림자는 쓰지 않는다.
- **컬러**: 브랜드 블루 #0077FF는 주요 액션·활성 상태에만. 코랄핑크 액센트 #FF385C(`--mt-accent`)는 하이라이트 — "지금"(현재 조수 시점)·물때 배지("7물")·다가옴 상태 — 전용. 블루=행동, 코랄=주목. 나머지는 잉크 그레이 3단계(#191C1E / #434656 / #737688). 바다 데이터 라인엔 `--mt-info` 블루 허용.
- **타이포**: 본문 Noto Sans KR(400/500/700), 디스플레이 Jua(워드마크·물때 배지 "7물"·큰 숫자). 위계는 색이 아니라 굵기 대비로.
- **코너**: 버튼·인풋 16px, 카드 24px, 칩·필 pill. 각진 요소 없음.
- **그림자**: `--mt-shadow-glass`(유리), 브랜드 블루 요소는 `--mt-shadow-brand`, 코랄 액센트 요소는 `--mt-shadow-accent`(컬러 섀도). 검정 그림자는 5% 이하.
- **모션**: 느리고 부드럽게. 블롭 모핑(장식), 페이드+미세 translateY(진입), `--mt-ease` 180~250ms(전환). 바운스 없음. 스플래시: 로고 0~350ms, 서비스명 220~650ms 페이드인.
- **호버/프레스**: 호버는 표면 투명도 상승(40%→60%), 프레스는 `--mt-brand-active` 또는 scale(0.98).
- **포커스**: 브랜드 블루 보더 + `--mt-focus-ring` 글로우.
- **레이아웃**: 모바일 퍼스트, 좌우 20px 고정 마진, 4/8px 간격 체계. 헤더/푸터 바는 `--mt-glass-header` + blur 20px로 콘텐츠 위에 뜬다. 하단 고정 요소는 안전영역 34px.
- **이미지**: 실사 사진 최소화. 배경은 그라데이션+블롭으로, 데이터는 곡선 그래프로 표현.

## ICONOGRAPHY

- 전용 아이콘 폰트 없음. **라인 SVG 아이콘**: stroke 2.5px, round cap/join, 단색 (`currentColor`). 필요 시 Material Symbols Outlined(CDN) 허용 — 레퍼런스 화면이 사용.
- 조수 방향은 ∧(밀물)/∨(썰물) 셰브론으로 표현.
- 이모지·유니코드 글리프를 아이콘으로 쓰지 않는다.
- 로고: `assets/logo-wave.svg`(블루, 밝은 배경용), `assets/logo-wave-white.svg`(블루 타일/사진 위), `assets/app-icon.svg`(홈 화면). 두 겹 물결 = 밀물과 썰물.

## Intentional additions

- `TideChart` — 조수 곡선 그래프. 물때 서비스의 핵심 도메인 표현이라 프리미티브로 승격.

## Index

- `styles.css` → `tokens/` (fonts·colors·typography·spacing·effects)
- `assets/` — 로고 3종
- `guidelines/` — 파운데이션 스펙 카드 (Colors/Type/Spacing/Brand)
- `components/core/` — Button, Chip, Input, Toggle
- `components/display/` — GlassCard, Badge, SegmentTabs, ListRow, TideChart
- `ui_kits/multtae_app/` — 스플래시 + 홈 화면 recreation
- `SKILL.md` — 에이전트용 스킬 정의

## Caveats

- 폰트는 Google Fonts CDN(@import) 사용 — 자체 바이너리 없음. 오프라인 배포 시 Jua/Noto Sans KR ttf를 받아 `@font-face`로 교체할 것.
- 로고는 이 프로젝트에서 새로 만든 오리지널 마크(1a 겹물결 계열, 블루 #0077FF 버전).
