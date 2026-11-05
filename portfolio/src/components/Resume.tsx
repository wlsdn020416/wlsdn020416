import { ArrowUpRight, Github } from 'lucide-react';
import '../styles/resume.css';
import profilePhoto from '../assets/images/profile.jpg';
import type { Period } from '../utils/period';
import { PeriodLabel } from './PeriodLabel';
import { StarIcon } from './StarIcon';

const skills = [
  { category: 'Backend', items: 'Java · Spring Boot · Spring Data JPA' },
  { category: 'Database', items: 'MySQL · PostgreSQL · Redis' },
  { category: 'AI & Data', items: 'Spring AI · pgvector · LLM Integration' },
  { category: 'Frontend', items: 'React · TypeScript · JavaScript' },
  { category: 'Infra & DevOps', items: 'AWS (EC2, RDS) · Docker · Nginx · GitHub Actions' },
];

type Experience = {
  name: string;
  summary: string;
  id: string;
  team: string;
  description: string;
  role: string;
  results: { label: string; text: string }[];
  measurement?: string;
  points: string[];
  period?: Period;
  repo?: string;
};

const experiences: Experience[] = [
  {
    id: 'grab',
    name: 'GRAB',
    team: '4인 프로젝트',
    description:
      '한정 수량 상품의 공개·판매 상태를 관리하고, 관심 상품 등록과 실시간 재고 확인을 지원하는 커머스 서비스입니다.',
    role: 'DROP · WISH · SSE · 조회 성능 개선',
    results: [
      {
        label: '문제',
        text: '실시간 재고 알림 후 재조회가 집중되어 상세 재조회 p95 176~253ms 발생',
      },
      { label: '해결', text: '재조회 시점을 0~1초 분산해 상세 재조회 p95 19~20ms로 개선' },
    ],
    measurement: '측정 기준: 400연결·DB CPU 1개 제한 로컬 환경, 동일 요청량으로 분산 전·후 비교',
    summary: '한정수량 판매 서비스',
    period: { start: '2026-09-22', end: '2026-11-04' },
    repo: 'https://github.com/wlsdn020416/Grab',
    points: [
      'DROP 도메인 설계 및 상품 공개·판매 상태 관리, WISH 등록·취소 기능 구현',
      'Spring Scheduler와 SKIP LOCKED 기반 상태 전환 배치 구현 및 중복 처리 방지',
      'SSE 기반 실시간 재고 이벤트 전달과 비동기 연결·자원 생명주기 관리',
      'AI 활용 프론트엔드 개발을 위한 코드 생성·검증 자동화 환경 구축',
      'OpenAPI 스키마 기반 타입 생성, ESLint·Prettier 정적 검증 및 Playwright E2E 테스트 체계 구성',
    ],
  },
  {
    id: 'knotty',
    name: 'Knotty',
    team: '3인 프로젝트',
    description:
      '사용자와 재능 정보를 바탕으로 AI가 재능을 매칭하고, 요청·거래·결제로 연결하는 플랫폼입니다.',
    role: 'AI 매칭 · 거래 동시성 제어 · 인증',
    results: [
      {
        label: '성과',
        text: '의미 기반 검색과 원본 데이터 검증을 결합하며, AI 기능을 서비스에 통합하는 설계 역량 강화',
      },
    ],
    summary: 'AI 기반 재능 거래 및 매칭 플랫폼',
    period: { start: '2026-08-21', end: '2026-09-03' },
    repo: 'https://github.com/wlsdn020416/Knotty',
    points: [
      'Spring AI를 활용한 사용자·재능 기반 AI 매칭 기능 구현',
      'pgvector를 활용한 벡터 유사도 검색과 매칭 비즈니스 로직 연동',
      '거래·지갑·요청글 비관적 락과 DB 중복 방지 제약으로 결제 동시성 제어',
      '임베딩 처리를 AFTER_COMMIT 비동기 이벤트로 분리해 트랜잭션 락 점유 시간 단축',
      '쿠키 기반 인증 및 사용자 포트폴리오 관리 기능 구현',
    ],
  },
  {
    id: 'packing',
    name: 'Packing',
    team: '4인 프로젝트',
    description:
      '사용자 성향과 지역 조건에 맞는 국내 관광지를 추천하고, LLM으로 맞춤형 여행 전략을 제공하는 서비스입니다.',
    role: '데이터 수집 · 가공 · LLM 추천',
    results: [
      {
        label: '성과',
        text: '관계형 DB의 데이터 구조와 웹의 요청·응답 흐름을 이해하고, API·DB 연동에 적용',
      },
    ],
    summary: '데이터 기반 개인화 여행 추천 서비스',
    period: { start: '2026-06-08', end: '2026-06-12' },
    repo: 'https://github.com/wlsdn020416/Packing',
    points: [
      '외부 API 데이터 수집·저장 및 서비스 목적에 맞는 데이터 가공 파이프라인 구현',
      '규칙 기반 성향 점수 산정 및 추천용 데이터 구조화',
      '사용자 성향 점수와 지역 조건을 활용한 LLM 기반 맞춤형 여행 전략 추천',
    ],
  },
];

export function Resume() {
  return (
    <section className="resume" aria-label="이력서">
      <div className="resume-intro">
        <figure className="profile-photo">
          <img src={profilePhoto} alt="박진우 프로필 사진" width={600} height={777} />
          <span className="profile-sticker" aria-hidden="true">
            <StarIcon />
          </span>
        </figure>
        <div className="resume-heading">
          <h1>
            박진우
            <span>
              <a className="email-link" href="mailto:wlsdn020416@gmail.com">
                wlsdn020416@gmail.com
              </a>
            </span>
          </h1>
          <p className="resume-birth">
            <time dateTime="2002-04-16">2002. 04. 16.</time>
          </p>
          <p className="resume-contact">
            <a href="tel:01068302219">010-6830-2219</a>
          </p>
          <a
            className="github-link"
            href="https://github.com/wlsdn020416"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={15} />
            <span>github.com/wlsdn020416</span>
          </a>
        </div>
      </div>

      <p className="resume-address">
        <span>주소</span> 경기도 고양시 일산서구 대화로27번길 36-1 (법곳동)
      </p>

      <section className="resume-section resume-profile" aria-labelledby="resume-profile-title">
        <h2 id="resume-profile-title">
          문제의 본질을 파악하고,
          <br />더 나은 답을 설계하는 개발자 박진우입니다.
        </h2>
        <p>기술의 원리를 이해하고 문제를 구조적으로 분석하는 것을 중요하게 생각합니다.</p>
        <p>
          복잡한 정보 속에서 핵심을 빠르게 찾아내고, 명확하고 간결한 소통을 통해 실행 가능한
          해결책으로 연결합니다.
        </p>
        <dl className="resume-highlights">
          <div>
            <dt>Knotty</dt>
            <dd>
              AI 매칭의 핵심을 검색·원본 검증·순위 산정으로 나누고, 구현·테스트 후 LLM 연동으로
              확장했습니다.
            </dd>
          </div>
          <div>
            <dt>GRAB</dt>
            <dd>
              재고 갱신 지연의 원인을 재조회 집중으로 파악하고, 요청 시점을 분산해 응답 지연을
              줄였습니다.
            </dd>
          </div>
        </dl>
      </section>

      <section className="resume-section">
        <h2>기술</h2>
        <dl className="resume-skills">
          {skills.map((s) => (
            <div key={s.category}>
              <dt>{s.category}</dt>
              <dd>{s.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="resume-section">
        <h2>프로젝트 경험</h2>
        {experiences.map((exp) => (
          <article className="resume-experience" key={exp.name}>
            <div className="experience-head">
              <h3>{exp.name}</h3>
              {exp.period && <PeriodLabel className="experience-period" period={exp.period} />}
            </div>
            <p className="experience-summary">
              {exp.summary}
              <span className="experience-team">{exp.team}</span>
            </p>
            <p className="experience-description">{exp.description}</p>
            <p className="experience-role">{exp.role}</p>
            <ul>
              {exp.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <dl className="experience-results">
              {exp.results.map((result) => (
                <div key={result.label}>
                  <dt>{result.label}</dt>
                  <dd>{result.text}</dd>
                </div>
              ))}
            </dl>
            {exp.measurement && <p className="experience-measurement">{exp.measurement}</p>}
            <div className="experience-links">
              <a className="experience-detail" href={`/projects/${exp.id}`}>
                프로젝트 상세 <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              {exp.repo && (
                <a
                  className="experience-repo"
                  href={exp.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={13} aria-hidden="true" />
                  GitHub
                  <span className="repo-url">{exp.repo.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="resume-section resume-last">
        <h2>교육 이력</h2>
        <article className="resume-education">
          <h3>프로그래머스 데브코스: 생성형 AI 활용 백엔드 개발</h3>
          <div className="experience-head">
            <p>(주)그렙</p>
            <PeriodLabel
              className="experience-period"
              period={{ start: '2026-05-13', end: '2026-11-09' }}
            />
          </div>
          <ul>
            <li>
              Java·Spring Boot·JPA 기반 API 설계와 DB·트랜잭션 처리를 학습하고 팀 프로젝트에 적용
            </li>
            <li>
              생성형 AI·LLM 기능 구현부터 GitHub 협업, 테스트 자동화·CI/CD·클라우드 배포까지 경험
            </li>
          </ul>
        </article>
      </section>
    </section>
  );
}
