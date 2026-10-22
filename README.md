<p align="center">
  <img src="./assets/profile-header.svg" alt="Hi, I'm Jinwoo! — Backend Developer. 민트색 노트북으로 작업하는 라벤더 캐릭터." width="100%" />
</p>

## Projects

### 01 &nbsp; GRAB · 한정 수량 DROP 커머스

**정해진 시간에 판매를 시작하고, 재고 변화를 실시간으로 전달하는 서비스**

![Java](https://img.shields.io/badge/Java-E4DCF5?style=flat-square&logo=openjdk&logoColor=51465E)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-E4DCF5?style=flat-square&logo=springboot&logoColor=51465E)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-C7E7D9?style=flat-square&logo=postgresql&logoColor=51465E)
![Redis](https://img.shields.io/badge/Redis-C7E7D9?style=flat-square&logo=redis&logoColor=51465E)
![SSE](https://img.shields.io/badge/SSE-E4DCF5?style=flat-square)

4인 팀 · **담당: DROP·WISH 도메인, 상태 전환 배치, SSE, 프론트엔드 개발·검증 환경**

- **동시에 실행되는 배치의 중복 처리 방지** — Spring Scheduler와 `FOR UPDATE SKIP LOCKED`를 활용해 DROP 판매 상태를 전환합니다.
- **재고 변경을 화면까지 연결** — SSE 구독과 재연결, 연결 종료 시 자원 정리를 다루고 상품 상세·WISH·GRAB 목록에 연동했습니다.
- **AI 활용 개발의 검증 체계 구성** — OpenAPI 기반 TypeScript 타입 생성, ESLint·Prettier, Playwright E2E 검증을 개발 흐름에 연결했습니다.

[Repository ↗](https://github.com/prgrms-aibe-devcourse/AIBE7_FinalProject_Team3) · [SSE 구현 PR ↗](https://github.com/prgrms-aibe-devcourse/AIBE7_FinalProject_Team3/pull/128) · [E2E 검증 환경 PR ↗](https://github.com/prgrms-aibe-devcourse/AIBE7_FinalProject_Team3/pull/68)

<br />

### 02 &nbsp; Knotty · AI 매칭 기반 재능 거래 플랫폼

**자연어로 필요한 재능을 찾고, 채팅에서 거래까지 이어지는 서비스**

![Java](https://img.shields.io/badge/Java-E4DCF5?style=flat-square&logo=openjdk&logoColor=51465E)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-E4DCF5?style=flat-square&logo=springboot&logoColor=51465E)
![Spring AI](https://img.shields.io/badge/Spring_AI-C7E7D9?style=flat-square&logo=spring&logoColor=51465E)
![pgvector](https://img.shields.io/badge/pgvector-C7E7D9?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-C7E7D9?style=flat-square&logo=postgresql&logoColor=51465E)
![Redis](https://img.shields.io/badge/Redis-C7E7D9?style=flat-square&logo=redis&logoColor=51465E)

3인 팀 · **담당: AI 매칭, 거래 동시성 제어, 인증·사용자 포트폴리오**

- **의미 검색과 실제 거래 조건 결합** — Spring AI와 pgvector로 유사한 게시글을 찾고, DB 원본 데이터로 조건을 확인하는 매칭 흐름을 구현했습니다.
- **중복 결제 방지** — 거래·지갑·요청글에 비관적 락과 DB 제약을 적용하고, 상태 전이를 검증했습니다.
- **외부 AI 호출과 거래 트랜잭션 분리** — 임베딩 처리를 `AFTER_COMMIT` 비동기 이벤트로 옮겨 외부 호출이 트랜잭션의 락을 오래 점유하지 않도록 개선했습니다.

[Repository ↗](https://github.com/wlsdn020416/Knotty)

<br />

### 03 &nbsp; Packing · 여행 성향 기반 국내 관광지 추천

**실제 관광지 데이터에 사용자 성향과 여행 조건을 더하는 서비스**

![Node.js](https://img.shields.io/badge/Node.js-E4DCF5?style=flat-square&logo=nodedotjs&logoColor=51465E)
![Express](https://img.shields.io/badge/Express-E4DCF5?style=flat-square&logo=express&logoColor=51465E)
![Supabase](https://img.shields.io/badge/Supabase-C7E7D9?style=flat-square&logo=supabase&logoColor=51465E)
![Gemini](https://img.shields.io/badge/Gemini-C7E7D9?style=flat-square&logo=googlegemini&logoColor=51465E)
![TourAPI](https://img.shields.io/badge/TourAPI-C7E7D9?style=flat-square)

4인 팀 · **담당: 관광지 데이터 수집·가공, 성향 점수 산정, LLM 추천**

- **추천에 사용할 데이터부터 설계** — TourAPI 관광지 데이터를 수집·정규화하고, 서비스 키워드와 MBTI 16유형 적합도 점수로 가공했습니다.
- **실제 장소를 기준으로 일정 생성** — DB에 존재하는 관광지를 후보로 제공하고, AI 호출 실패 시 규칙 기반 대체 일정을 반환하도록 구성했습니다.

[Repository ↗](https://github.com/wlsdn020416/Packing)

<br />

## Tech Stack

### Backend

![Java](https://img.shields.io/badge/Java-E4DCF5?style=for-the-badge&logo=openjdk&logoColor=51465E)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-E4DCF5?style=for-the-badge&logo=springboot&logoColor=51465E)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-E4DCF5?style=for-the-badge&logo=spring&logoColor=51465E)
![Spring Security](https://img.shields.io/badge/Spring_Security-E4DCF5?style=for-the-badge&logo=springsecurity&logoColor=51465E)
![Node.js](https://img.shields.io/badge/Node.js-E4DCF5?style=for-the-badge&logo=nodedotjs&logoColor=51465E)
![Express](https://img.shields.io/badge/Express-E4DCF5?style=for-the-badge&logo=express&logoColor=51465E)

### Data & AI

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-C7E7D9?style=for-the-badge&logo=postgresql&logoColor=51465E)
![Redis](https://img.shields.io/badge/Redis-C7E7D9?style=for-the-badge&logo=redis&logoColor=51465E)
![Spring AI](https://img.shields.io/badge/Spring_AI-C7E7D9?style=for-the-badge&logo=spring&logoColor=51465E)
![pgvector](https://img.shields.io/badge/pgvector-C7E7D9?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Gemini-C7E7D9?style=for-the-badge&logo=googlegemini&logoColor=51465E)
![Supabase](https://img.shields.io/badge/Supabase-C7E7D9?style=for-the-badge&logo=supabase&logoColor=51465E)

### Frontend

![React](https://img.shields.io/badge/React-F9E0CD?style=for-the-badge&logo=react&logoColor=51465E)
![TypeScript](https://img.shields.io/badge/TypeScript-F9E0CD?style=for-the-badge&logo=typescript&logoColor=51465E)
![JavaScript](https://img.shields.io/badge/JavaScript-F9E0CD?style=for-the-badge&logo=javascript&logoColor=51465E)
![Vite](https://img.shields.io/badge/Vite-F9E0CD?style=for-the-badge&logo=vite&logoColor=51465E)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-F9E0CD?style=for-the-badge&logo=reactquery&logoColor=51465E)

### Testing & Workflow

![JUnit](https://img.shields.io/badge/JUnit-E1EDB2?style=for-the-badge)
![Testcontainers](https://img.shields.io/badge/Testcontainers-E1EDB2?style=for-the-badge)
![Playwright](https://img.shields.io/badge/Playwright-E1EDB2?style=for-the-badge)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-E1EDB2?style=for-the-badge&logo=githubactions&logoColor=51465E)
![Docker](https://img.shields.io/badge/Docker-E1EDB2?style=for-the-badge&logo=docker&logoColor=51465E)
![OpenAPI](https://img.shields.io/badge/OpenAPI-E1EDB2?style=for-the-badge&logo=openapiinitiative&logoColor=51465E)
