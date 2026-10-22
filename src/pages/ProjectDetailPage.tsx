import { ArrowLeft, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { FlowSimulation } from '../components/FlowSimulation';
import { getNextProject, type Project } from '../data/projects';

type ProjectDetailPageProps = {
  project: Project;
  go: (url: string) => void;
};

export function ProjectDetailPage({ project: p, go }: ProjectDetailPageProps) {
  const next = getNextProject(p.id);

  return (
    <main className={`detail ${p.id}`}>
      <a
        className="back"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          go('/');
        }}
      >
        <ArrowLeft size={16} /> All projects
      </a>

      <section className="detail-hero">
        <div>
          <h1>
            {p.name}
            <span>↗</span>
          </h1>
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <div className="tags">
            {p.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        <div className="detail-stamp">
          <b>{p.stamp}</b>
          <Sparkles />
        </div>
      </section>

      <section className="detail-content">
        <div className="focus-grid">
          <h2>
            What happens
            <br />
            under the hood?
          </h2>
          <div>
            {p.notes.map((n) => (
              <div className="focus-item" key={n}>
                <p>{n}</p>
              </div>
            ))}
          </div>
        </div>

        <FlowSimulation title={p.flowTitle} flow={p.flow} />

        {p.hasService && (
          <div className="placeholder">
            <span className="placeholder-icon">
              <Layers size={32} />
            </span>
            <h3>서비스 화면</h3>
            <p>배포 이전이 끝나면, 실제 서비스 화면이 여기에 들어옵니다.</p>
          </div>
        )}

        <div className="draft-note">
          <b>콘텐츠 초안</b>
          <p>
            기획서를 바탕으로 구성했습니다. 개인 기여 범위와 구현 세부 사항은 코드 확인 후
            확정합니다.{' '}
            {p.hasService
              ? '서비스 링크는 Oracle Cloud 이전과 동작 확인 후 연결합니다.'
              : 'Packing은 서비스 링크 없는 기술 사례로 남깁니다.'}
          </p>
        </div>

        <a
          className="next-project"
          href={`/projects/${next.id}`}
          onClick={(e) => {
            e.preventDefault();
            go(e.currentTarget.pathname);
          }}
        >
          <span>
            <h3>{next.name}</h3>
          </span>
          <ArrowRight size={40} />
        </a>
      </section>
    </main>
  );
}
