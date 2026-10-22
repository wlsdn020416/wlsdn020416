import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';

function CardIllustration({ id }: { id: string }) {
  if (id === 'grab') {
    return (
      <div className="ticket">
        <b>GRAB IT!</b>
        <div className="ticket-dots" />
      </div>
    );
  }
  if (id === 'knotty') {
    return (
      <div className="knot">
        <i />
        <i />
        <span>✦</span>
      </div>
    );
  }
  return (
    <div className="suitcase">
      <i />
      <span>✳</span>
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  go: (url: string) => void;
};

export function ProjectCard({ project: p, go }: ProjectCardProps) {
  const url = `/projects/${p.id}`;
  return (
    <a
      href={url}
      onClick={(e) => {
        e.preventDefault();
        go(url);
      }}
      className={`project-card ${p.id}`}
    >
      <div className="card-copy">
        <h2>
          {p.name}
          <span>{p.symbol}</span>
        </h2>
        <p>{p.tagline}</p>
        <div className="card-tags">
          {p.tags.slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div className={`card-illustration ${p.id}`} aria-hidden="true">
        <CardIllustration id={p.id} />
      </div>
      <span className="card-arrow">
        <ArrowUpRight size={23} />
      </span>
    </a>
  );
}
