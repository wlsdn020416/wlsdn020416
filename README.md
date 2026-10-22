# JINWOO — Casual Portfolio

React + TypeScript + Vite 기반 포트폴리오 초안입니다.

## 실행

```sh
npm install
npm run dev
```

자동 갱신 WebSocket 없이 완성된 빌드 보기:

```sh
npm run build
npm run preview -- --port 4173
```

실행한 터미널을 유지한 채 표시된 주소로 접속합니다.

## 화면

- `/`: 첫 방문 인트로(약 1.45초), 왼쪽 이력서와 스크롤을 따라오는 오른쪽 프로젝트 카드. 같은 탭에서 인트로는 한 번만 재생됩니다.
- `/projects/grab`: GRAB 상세 및 설명용 처리 흐름
- `/projects/knotty`: Knotty 상세 및 설명용 처리 흐름
- `/projects/packing`: 서비스 링크 없는 Packing 기술 사례
- 그 외 경로: 404 화면

브라우저 뒤로 가기와 상세 주소 직접 접속을 지원합니다. 정적 호스팅 배포 시 모든 앱 경로를 index.html로 재작성하도록 설정해야 합니다.

크림·라임·라벤더·살구 색상, CSS 캐릭터와 카드 일러스트를 사용합니다. 그림은 실제 서비스 스크린샷이 아닙니다. 모바일에서는 소개 뒤에 프로젝트 카드를 세로로 배치합니다. reduced-motion 설정에서는 인트로와 움직임을 생략합니다.

실제 스크린샷과 서비스 링크는 Oracle Cloud 이전 후 추가합니다. 개인 기여 및 기술 상세는 저장소 대조 전인 기획서 기반 초안입니다. 연락처·GitHub·이력서는 공개 전 추가해야 합니다.

## 폴더 구조

```
src/
├── main.tsx            # 엔트리
├── App.tsx             # 라우팅·인트로·About 패널 상태
├── components/         # Header, AboutPanel, Intro, Mascot, Resume, ProjectCard, FlowSimulation
├── pages/              # HomePage, ProjectDetailPage, NotFoundPage
├── data/projects.ts    # 프로젝트 콘텐츠
└── styles/global.css   # 전역 스타일
```

## 코드 포맷

Prettier 설정은 `.prettierrc.json`에 있습니다.

```sh
npm run format        # 전체 포맷 적용
npm run format:check  # 포맷 검사
```

Google Fonts를 사용할 수 없으면 시스템 글꼴로 대체됩니다.
