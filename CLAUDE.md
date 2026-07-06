# 물때(Multtae) — 앱 코드 정본 (canonical code repository)

이 저장소는 물때 낚시 앱의 **코드 정본**이다. 앱 구현 작업은 여기서 한다.

## 구조

- `multtae-app/` — **실제 앱** (Expo managed + React Native + TypeScript + Supabase Auth).
  개발 명령: `cd multtae-app && npm install && npx expo start`. 타입체크: `npx tsc --noEmit`.
- `project/` — Claude Design 핸드오프 원본 (HTML 프로토타입 + `_ds/` 디자인 토큰).
  **기존 파일은 읽기 전용** — 수정하지 않는다. 새 화면의 핸드오프 원본을 추가하는
  것만 허용 (아래 "디자인 핸드오프 규칙"). 토큰의 TS 포팅본은 `multtae-app/src/theme/`.
- `chats/` — 디자인 반복 과정의 대화 기록 (레이아웃 확정 근거).

## 디자인 핸드오프 규칙 (모든 세션 필수)

클로드 디자인에서 넘어온 화면을 구현하는 세션은 — 핸드오프로 시작했든, 사용자가
디자인 HTML(번들)을 업로드했든 — **구현을 시작하기 전에** 디자인 원본을
`project/Multtae <화면명>.dc.html`로 정규화해 커밋한다. 절차는
`.claude/skills/design-handoff/SKILL.md`. 화면의 비주얼·문구 정본은 이 파일이며,
디자인 원본 없이 Notion 명세 텍스트만으로 화면을 재해석해 만들지 않는다 —
원본을 찾을 수 없으면 사용자에게 디자인 파일을 요청한다.

## 명세 정본

화면·UX 명세의 정본은 Notion의 "화면 명세 · UX 정의" DB이다 (예: 로그인 화면 =
`Login_BeforeMain`). 상태·흐름·진입 조건이 코드와 충돌하면 Notion 명세가
우선하고, 비주얼·문구는 `project/`의 디자인 핸드오프 원본이 우선한다.

## 제품 결정 (MVP, 확정)

- 인증: 소셜 로그인 전용 — 카카오 · Google · Apple (Supabase Auth).
  이메일/비밀번호·휴대폰 인증 없음. 별도 약관 동의 단계 없음(클릭랩).
- 기존/신규 회원 분기: provider user ID 기준. 기존=`Main_Home`, 신규=`Signup_inputinfo`
  (닉네임 → `Signup_Complete` → `Signup_FishHistory`). — 미구현, 다음 작업 패키지.
- 약관 동의 이력 저장은 가입 확정 시점(닉네임 저장 성공)에 수행 — 가입 플로우 작업에 포함.
