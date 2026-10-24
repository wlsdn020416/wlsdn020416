import { projects } from '../data/projects';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { AboutSections } from './AboutPanel';
import { PrintLink } from './PrintLink';
import { Resume } from './Resume';

const noop = () => {};

/** 전체 PDF 저장용 문서. 화면에는 보이지 않고 인쇄할 때만 출력된다. */
export function PrintDocument() {
  return (
    <div className="print-doc">
      <PrintLink />
      <Resume />
      <section className="print-doc-about about-panel" aria-label="About me">
        <p className="print-doc-eyebrow">About me</p>
        <AboutSections />
      </section>
      {projects.map((p) => (
        <ProjectDetailPage key={p.id} project={p} go={noop} />
      ))}
    </div>
  );
}
