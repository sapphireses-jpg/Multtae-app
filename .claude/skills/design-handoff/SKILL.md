---
name: design-handoff
description: >
  Claude Design에서 넘어온 화면 디자인(HTML)을 project/ 핸드오프 원본으로
  정규화해 커밋하는 절차. 사용자가 디자인 HTML을 업로드했거나, 클로드 디자인
  핸드오프로 세션이 시작됐거나, 새 화면 구현 요청에 디자인 원본이 딸려온 경우
  구현 시작 전에 반드시 실행한다.
---

# 디자인 핸드오프 아카이브 절차

목표: 클로드 디자인 결과물을 `project/Multtae <화면명>.dc.html`로 정규화해
커밋한다. 이 파일이 화면 비주얼·문구의 정본이고, RN 구현은 이 파일을 1:1로
포팅한다. (2026-07 기기권한 안내 화면에서 검증된 절차.)

## 1. 입력 형태 판별

- **자체 포함 번들** (수 MB, `<script type="__bundler/template">` 존재):
  아래 2단계로 추출한다. 클로드 디자인의 "파일로 내보내기"가 이 형태.
- **이미 .dc.html 소스 형태** (`<x-dc>` 루트 + `_ds/` 상대 참조): 추출 없이
  4단계(경로 정리)로 바로 간다.

## 2. 번들에서 소스 추출 (node)

```js
const html = fs.readFileSync(BUNDLE_PATH, 'utf8');
const template = JSON.parse(
  html.match(/<script type="__bundler\/template">\s*([\s\S]*?)\s*<\/script>/)[1]);
// 화면 마크업: <div data-screen-label="…"> 부터 </x-dc> 직전까지
// + 뒤따르는 <script type="text/x-dc" …>…</script> (컴포넌트 로직)
```

에셋 매니페스트(`__bundler/manifest`)는 uuid → { mime, compressed(gzip),
data(base64) }. 마크업이 참조하는 uuid는 `zlib.gunzipSync(Buffer.from(data,
'base64'))`로 복원한다.

## 3. 에셋 정규화

- 복원한 에셋이 `project/assets/`의 기존 파일과 **바이트 동일**하면 해당
  상대 경로로 치환 (예: 물때 로고 → `assets/logo-wave.svg`).
- 새 에셋이면 `project/assets/`에 저장하고 그 경로를 참조.
- 마크업에 uuid가 남아 있으면 실패로 처리하고 원인을 확인한다.

## 4. 표준 골격으로 래핑

`project/Multtae Login.dc.html`의 헤더 구조를 그대로 따른다:
`./support.js` + `_ds/design-system-00fa8ec3-…/tokens/*.css` + `styles.css` +
`_ds_bundle.js` 링크, 그 아래 화면 고유 `<style>`(예: `mt-enter` 키프레임,
body 배경)만 helmet에 남긴다. 번들 helmet에 인라인된 토큰 CSS는 `_ds/`와
중복이므로 버린다.

## 5. 렌더 검증 (커밋 전 필수)

Playwright(chromium, `/opt/pw-browsers`)로 `file://` 열어 스크린샷을 찍고
원본 번들 렌더와 대조한다. 주의: DC 런타임이 unpkg에서 React 18 UMD를
로드하는데 프록시가 차단하므로 `page.route('**://unpkg.com/**', …)`로
로컬 React UMD(`npm pack react@18.3.1 react-dom@18.3.1`)를 주입한다.
`[data-screen-label]`이 visible 될 때까지 대기 후 캡처.

## 6. 커밋

`project/Multtae <화면명>.dc.html`로 추가하고 커밋한다. 화면명은
`data-screen-label` 값을 따른다 (예: "기기권한 안내" → `Multtae
Permission.dc.html`처럼 기존 영문 명명과 일관되게). 그 다음에 RN 구현을
시작한다 — 구현 기준은 이 파일이지 Notion 명세 텍스트가 아니다.
