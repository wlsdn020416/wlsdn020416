import { Mascot } from './Mascot';

const skills = [
  { category: 'Backend', items: 'Java · Spring Boot · Spring Data JPA' },
  { category: 'Database', items: 'MySQL · PostgreSQL · Redis' },
  { category: 'AI & Data', items: 'Spring AI · pgvector · LLM Integration' },
  { category: 'Frontend', items: 'React · TypeScript · JavaScript' },
  { category: 'Infrastructure', items: 'Docker · Nginx · GitHub Actions · AWS' },
];

const experiences = [
  {
    name: 'GRAB',
    summary: '한정수량 판매 서비스',
    points: [
      'DROP 도메인의 공개·판매 상태와 WISH 등록 및 취소 흐름',
      '배치 처리의 상태 전환, 트랜잭션과 잠금 전략',
      'SSE 구독과 이벤트 전달, 연결 종료 시 자원 관리',
    ],
  },
  {
    name: 'Knotty',
    summary: 'AI 기반 재능 거래 및 매칭 플랫폼',
    points: [
      '쿠키 기반 인증과 사용자 포트폴리오 관리',
      'Spring AI를 활용한 AI 매칭 기능',
      'pgvector 의미 검색과 서비스 로직의 연결',
    ],
  },
  {
    name: 'Packing',
    summary: '데이터 기반 개인화 여행 추천',
    points: [
      '외부 API 원천 데이터 수집 및 저장',
      '규칙 기반 성향 점수 계산과 가공 데이터 저장',
      '사용자 성향과 지역 조건을 반영하는 LLM 추천',
    ],
  },
];

const principles = [
  {
    title: '구조부터 이해하기',
    body: '기능을 구현하기 전에 데이터가 어디서 오고, 어떤 조건에서 상태가 바뀌는지 살펴봅니다.',
  },
  {
    title: '선택의 이유 남기기',
    body: '대안의 장단점과 선택한 이유를 설명할 수 있는 설계를 지향합니다.',
  },
  {
    title: '검증하며 개선하기',
    body: '테스트와 측정으로 동작을 확인하고, 확인한 근거를 바탕으로 다음 개선을 결정합니다.',
  },
];

export function Resume() {
  return (
    <section className="resume" aria-label="이력서">
      <div className="resume-intro">
        <div>
          <h1>
            진우<span>Backend Developer</span>
          </h1>
          <p className="resume-lead">
            호기심으로 시작해서,
            <br />
            <strong>믿고 쓸 수 있는 시스템</strong>으로.
          </p>
        </div>
        <Mascot mini />
      </div>

      <section className="resume-section">
        <h2>소개</h2>
        <p>
          문제의 원인과 시스템의 구조를 먼저 이해합니다. 기술 선택의 대안을 비교하고, 트레이드오프를
          고민하며, 테스트와 검증을 통해 설계의 근거를 쌓아갑니다.
        </p>
        <p>
          데이터 수집과 추천에서 시작해, AI 매칭과 벡터 검색, 동시성과 상태 전환을 다루는 백엔드
          시스템으로 관심을 넓혀왔습니다.
        </p>
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
            <h3>{exp.name}</h3>
            <p className="experience-summary">{exp.summary}</p>
            <ul>
              {exp.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="resume-section resume-last">
        <h2>일하는 방식</h2>
        {principles.map((p) => (
          <div className="work-principle" key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
