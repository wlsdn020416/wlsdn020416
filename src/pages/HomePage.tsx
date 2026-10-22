import { ProjectCard } from '../components/ProjectCard';
import { Resume } from '../components/Resume';
import { projects } from '../data/projects';

export function HomePage({ go }: { go: (url: string) => void }) {
  return (
    <main className="home">
      <div className="home-grid">
        <Resume />
        <section className="project-shelf" aria-label="프로젝트 목록">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} go={go} />
          ))}
        </section>
      </div>
    </main>
  );
}
