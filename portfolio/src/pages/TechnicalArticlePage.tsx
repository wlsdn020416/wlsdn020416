import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { KnottyArticleContent } from '../case-studies/knotty/KnottyCaseStudy';
import { PackingArticleContent } from '../case-studies/packing/PackingCaseStudy';
import '../styles/technical-study.css';

export const technicalArticles = [
  {
    id: 'knotty',
    name: 'Knotty',
    path: '/projects/knotty/engineering',
    title: 'Knotty 백엔드 구현',
    description:
      '자연어 검색 기반 매칭, 거래 동시성 제어, 쿠키 기반 인증의 처리 구조와 구현 코드입니다.',
    sections: [
      ['matching', 'AI 매칭'],
      ['concurrency', '거래 동시성 제어'],
      ['authentication', '인증'],
    ],
    repo: 'https://github.com/wlsdn020416/Knotty',
    Content: KnottyArticleContent,
  },
  {
    id: 'packing',
    name: 'Packing',
    path: '/projects/packing/engineering',
    title: 'Packing 데이터 처리와 추천 구현',
    description:
      '관광지 데이터 수집·검증, 유형별 점수 계산, LLM 일정 생성과 실패 처리의 구현 내용입니다.',
    sections: [
      ['collection', '데이터 수집'],
      ['scoring', '점수 계산과 정렬'],
      ['itinerary', '일정 생성과 실패 처리'],
    ],
    repo: 'https://github.com/wlsdn020416/Packing',
    Content: PackingArticleContent,
  },
];

export function TechnicalArticlePage({ article }: { article: (typeof technicalArticles)[number] }) {
  const Content = article.Content;
  return (
    <main className={`technical-page case-study ${article.id}`}>
      <a className="back" href={`/projects/${article.id}`}>
        <ArrowLeft size={16} />
        {article.name} 프로젝트
      </a>
      <article>
        <div className="technical-heading">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </div>
        <div className="technical-layout">
          <aside className="technical-toc" aria-label="문서 목차">
            <p>목차</p>
            <ol>
              {article.sections.map(([id, title]) => (
                <li key={id}>
                  <a href={`#${id}`}>{title}</a>
                </li>
              ))}
            </ol>
          </aside>
          <div className="technical-body">
            <Content />
            <footer className="technical-footer">
              <a href={article.repo} target="_blank" rel="noopener noreferrer">
                GitHub 저장소 <ArrowUpRight size={16} />
              </a>
              <a href={`/projects/${article.id}`}>
                <ArrowLeft size={16} />
                {article.name} 프로젝트로 돌아가기
              </a>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}
