import { useEffect, useState } from 'react';
import { AboutPanel } from './components/AboutPanel';
import { Header } from './components/Header';
import { Intro } from './components/Intro';
import { projects } from './data/projects';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

const DEFAULT_TITLE = '박진우 포트폴리오';
const INTRO_KEY = 'jw-intro';
const INTRO_DURATION = 1450;

export function App() {
  const [path, setPath] = useState(location.pathname);
  const [intro, setIntro] = useState(
    () => !sessionStorage.getItem(INTRO_KEY) && location.pathname === '/',
  );
  const [about, setAbout] = useState(false);

  useEffect(() => {
    const onPopState = () => {
      setPath(location.pathname);
      setAbout(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!intro) return;
    const timer = setTimeout(() => {
      setIntro(false);
      sessionStorage.setItem(INTRO_KEY, '1');
    }, INTRO_DURATION);
    return () => clearTimeout(timer);
  }, [intro]);

  function go(url: string) {
    history.pushState({}, '', url);
    setPath(url);
    setAbout(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const project = projects.find((p) => path === `/projects/${p.id}`);
  const home = path === '/';

  useEffect(() => {
    document.title = project ? `${project.name} — ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  }, [project]);

  return (
    <>
      {intro && <Intro />}
      <Header about={about} onToggleAbout={() => setAbout(!about)} go={go} />
      {about && <AboutPanel />}
      {home ? (
        <HomePage go={go} />
      ) : project ? (
        <ProjectDetailPage key={project.id} project={project} go={go} />
      ) : (
        <NotFoundPage go={go} />
      )}
    </>
  );
}
