import { ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { PeriodLabel } from '../components/PeriodLabel';
import { caseStudies } from '../case-studies';
import { getNextProject, type Project } from '../data/projects';

type ProjectDetailPageProps = {
  project: Project;
  go: (url: string) => void;
};

export function ProjectDetailPage({ project: p, go }: ProjectDetailPageProps) {
  const next = getNextProject(p.id);
  const CaseStudy = caseStudies[p.id];

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
        <img
          className="detail-logo"
          src={p.logo.src}
          alt={p.name}
          width={p.logo.width}
          height={p.logo.height}
        />
        <p className="detail-summary">{p.description}</p>
        <dl className="detail-facts">
          <div>
            <dt>기간</dt>
            <dd>
              <PeriodLabel period={p.period} />
            </dd>
          </div>
          <div>
            <dt>팀</dt>
            <dd>{p.team}</dd>
          </div>
          <div>
            <dt>담당</dt>
            <dd>{p.role}</dd>
          </div>
          <div>
            <dt>기술</dt>
            <dd>{p.tags.join(' · ')}</dd>
          </div>
        </dl>
        <a className="github-link" href={p.repo} target="_blank" rel="noopener noreferrer">
          <Github size={15} />
          GitHub
          <span className="repo-url">{p.repo.replace(/^https?:\/\//, '')}</span>
        </a>
      </section>

      <section className="detail-content">
        {CaseStudy && <CaseStudy />}

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
