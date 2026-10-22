import { Github } from 'lucide-react';
import profilePhoto from '../assets/images/profile.jpg';
import type { Period } from '../utils/period';
import { PeriodLabel } from './PeriodLabel';

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
  points: string[];
  period?: Period;
  repo?: string;
};

const experiences: Experience[] = [
  {
    name: 'GRAB',
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
    name: 'Knotty',
    summary: 'AI 기반 재능 거래 및 매칭 플랫폼',
    period: { start: '2026-08-21', end: '2026-09-03' },
    repo: 'https://github.com/wlsdn020416/Knotty',
    points: [
      '쿠키 기반 인증 및 사용자 포트폴리오 관리 기능 구현',
      'Spring AI를 활용한 사용자·재능 기반 AI 매칭 기능 구현',
      'pgvector를 활용한 벡터 유사도 검색과 매칭 비즈니스 로직 연동',
    ],
  },
  {
    name: 'Packing',
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
            ✳
          </span>
        </figure>
        <div className="resume-heading">
          <h1>
            박진우<span>Backend Developer</span>
          </h1>
          <p className="resume-birth">
            <time dateTime="2002-04-16">2002. 04. 16.</time>
          </p>
          <a
            className="github-link"
            href="https://github.com/wlsdn020416"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={15} />
            github.com/wlsdn020416
          </a>
        </div>
      </div>

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

      <section className="resume-section resume-last">
        <h2>프로젝트 경험</h2>
        {experiences.map((exp) => (
          <article className="resume-experience" key={exp.name}>
            <div className="experience-head">
              <h3>{exp.name}</h3>
              {exp.period && <PeriodLabel className="experience-period" period={exp.period} />}
            </div>
            <p className="experience-summary">
              {exp.summary}
              {exp.repo && (
                <a
                  className="experience-repo"
                  href={exp.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={13} />
                  GitHub
                </a>
              )}
            </p>
            <ul>
              {exp.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </section>
  );
}
