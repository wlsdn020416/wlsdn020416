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
- `/projects/grab`: GRAB 담당 영역·성능 결과·정합성 설계
- `/projects/grab/performance`: 성능 개선 과정과 근거를 정리한 별도 글
- `/projects/knotty`: Knotty 담당 범위·설계 요약과 상세 문서 링크
- `/projects/packing`: Packing 담당 범위·설계 요약과 상세 문서 링크
- 그 외 경로: 404 화면

브라우저 뒤로 가기와 상세 주소 직접 접속을 지원합니다. 정적 호스팅 배포 시 모든 앱 경로를 index.html로 재작성하도록 설정해야 합니다.

크림·라임·라벤더·살구 색상, CSS 캐릭터와 카드 일러스트를 사용합니다. 그림은 실제 서비스 스크린샷이 아닙니다. 모바일에서는 이력서 뒤에 프로젝트 카드를 세로로 배치합니다. reduced-motion 설정에서는 인트로와 움직임을 생략합니다.

GRAB 전후 비교 그래프는 `src/case-studies/grab/performanceData.ts`의 `performanceComparison`에 검증된 측정값을 입력하면 표시됩니다. `points`의 각 항목에 `connections`와 `vanilla`/`current`의 `detail`, `stock`, `list`, `order` p95(ms)를 기록하고, `conditions`에 동일 측정 조건, `notes`에 회차 수·오류·미시작 요청 등 해석 조건을 적습니다. 값이 비어 있으면 측정 중 안내만 표시하며 0이나 추정값으로 대체하지 않습니다. 최종 비교에는 프론트 재조회 분산 정책의 변화도 포함됩니다.

## 폴더 구조

```
src/
├── main.tsx            # 엔트리
├── App.tsx             # 라우팅·인트로·About 패널 상태
├── assets/images/      # 이미지 (증명사진 등)
├── components/         # Header, AboutPanel, Intro, Mascot, Resume, ProjectCard, PeriodLabel, CodeBlock
├── pages/              # HomePage, ProjectDetailPage, NotFoundPage
├── case-studies/       # 프로젝트별 상세 케이스 스터디 (도식·코드 발췌)
├── data/projects.ts    # 프로젝트 콘텐츠
├── utils/              # 날짜 포맷 등 유틸
└── styles/global.css   # 전역 스타일
```

## 코드 포맷

Prettier 설정은 `.prettierrc.json`에 있습니다.

```sh
npm run format        # 전체 포맷 적용
npm run format:check  # 포맷 검사
```

Google Fonts를 사용할 수 없으면 시스템 글꼴로 대체됩니다.

- `/projects/knotty/engineering`: 검색·동시성 제어·인증 구현 상세
- `/projects/packing/engineering`: 데이터 수집·점수 계산·일정 생성 구현 상세
