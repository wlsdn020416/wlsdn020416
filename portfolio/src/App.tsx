import { TechnicalArticlePage, technicalArticles } from './pages/TechnicalArticlePage';
import { useEffect, useState } from 'react';
import { GrabPerformancePage } from './case-studies/grab/GrabPerformancePage';
import { AboutPanel } from './components/AboutPanel';
import { Header } from './components/Header';
import { Intro } from './components/Intro';
import { PrintDocument } from './components/PrintDocument';
import { PrintLink } from './components/PrintLink';
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
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const onPopState = () => {
      setPath(location.pathname);
      setAbout(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('about-open', about);
    return () => document.body.classList.remove('about-open');
  }, [about]);

  // 전체 PDF: 문서를 그린 뒤 이미지가 모두 준비되면 인쇄 창을 띄우고, 창이 닫히면 문서를 치운다.
  useEffect(() => {
    if (!printing) return;
    document.body.classList.add('print-all');
    const done = () => setPrinting(false);
    window.addEventListener('afterprint', done);

    let cancelled = false;
    const images = Array.from(document.querySelectorAll<HTMLImageElement>('.print-doc img'));
    const ready = images.map((img) => {
      img.loading = 'eager';
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve(), { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
      });
    });
    Promise.all([...ready, document.fonts.ready]).then(() => {
      if (!cancelled) window.print();
    });

    return () => {
      cancelled = true;
      window.removeEventListener('afterprint', done);
      document.body.classList.remove('print-all');
    };
  }, [printing]);

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
  const technicalArticle = technicalArticles.find(
    (article) => path.replace(/\/$/, '') === article.path,
  );
  const performance = path.replace(/\/$/, '') === '/projects/grab/performance';

  useEffect(() => {
    document.title = performance
      ? `GRAB 조회 성능 개선 — ${DEFAULT_TITLE}`
      : technicalArticle
        ? `${technicalArticle.title} — ${DEFAULT_TITLE}`
        : project
          ? `${project.name} — ${DEFAULT_TITLE}`
          : DEFAULT_TITLE;
  }, [project, performance, technicalArticle]);

  return (
    <>
      {intro && <Intro />}
      <Header
        about={about}
        onToggleAbout={() => setAbout(!about)}
        printing={printing}
        onPrint={() => {
          setAbout(false);
          setPrinting(true);
        }}
        go={go}
      />
      <PrintLink />
      {about && <AboutPanel />}
      {home ? (
        <HomePage go={go} />
      ) : performance ? (
        <GrabPerformancePage />
      ) : technicalArticle ? (
        <TechnicalArticlePage article={technicalArticle} />
      ) : project ? (
        <ProjectDetailPage key={project.id} project={project} go={go} />
      ) : (
        <NotFoundPage go={go} />
      )}
      {printing && <PrintDocument />}
    </>
  );
}
