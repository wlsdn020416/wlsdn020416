import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { PeriodLabel } from './PeriodLabel';

type ProjectCardProps = {
  project: Project;
  go: (url: string) => void;
};

export function ProjectCard({ project: p, go }: ProjectCardProps) {
  const url = `/projects/${p.id}`;
  return (
    <>
      <a
        href={url}
        onClick={(e) => {
          e.preventDefault();
          go(url);
        }}
        className={`project-card ${p.id}`}
      >
        <img
          className="card-logo"
          src={p.logo.src}
          alt={p.name}
          width={p.logo.width}
          height={p.logo.height}
        />
        <p className="card-summary">{p.description}</p>
        <p className="card-meta">
          <PeriodLabel period={p.period} />
          <span>{p.role}</span>
        </p>
        <span className="card-arrow" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
      </a>
      {/* 카드 전체가 상세 페이지 링크라 그 안에 넣으면 PDF에서 GitHub로 이동하지 않는다. 인쇄할 때만 보인다. */}
      <a className="card-repo" href={p.repo} target="_blank" rel="noopener noreferrer">
        GitHub · {p.repo.replace(/^https?:\/\//, '')}
      </a>
    </>
  );
}
