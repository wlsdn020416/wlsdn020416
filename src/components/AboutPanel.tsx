const skills = ['Java', 'Spring Boot', 'React', 'TypeScript', 'Docker', 'PostgreSQL'];

export function AboutPanel() {
  return (
    <aside className="about-panel">
      <h2>
        먼저 이해하고,
        <br />
        이유 있게 만듭니다.
      </h2>
      <p>
        문제의 원인과 시스템의 구조를 먼저 살펴봅니다. 대안과 트레이드오프를 고민하고, 테스트와
        검증으로 설계의 근거를 쌓아갑니다.
      </p>
      <div className="tags">
        {skills.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </aside>
  );
}
