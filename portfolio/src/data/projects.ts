import grabLogo from '../assets/images/grab/logo.png';
import knottyLogo from '../assets/images/knotty/logo.png';
import packingLogo from '../assets/images/packing/logo.png';
import type { Period } from '../utils/period';

export type Project = {
  id: string;
  name: string;
  /** 카드·배너 한 줄 소개 */
  description: string;
  tags: string[];
  period: Period;
  repo: string;
  logo: { src: string; width: number; height: number };
  team: string;
  role: string;
};

export const projects: Project[] = [
  {
    id: 'grab',
    name: 'GRAB',
    description: '한정 수량 DROP 커머스',
    tags: ['Spring Boot', 'PostgreSQL', 'SSE', 'k6'],
    period: { start: '2026-09-22', end: '2026-11-04' },
    repo: 'https://github.com/wlsdn020416/Grab',
    logo: { src: grabLogo, width: 640, height: 213 },
    team: '4인 팀',
    role: 'DROP · WISH · SSE · 조회 성능 개선',
  },
  {
    id: 'knotty',
    name: 'Knotty',
    description: 'AI 매칭 기반 재능 거래 플랫폼',
    tags: ['Spring AI', 'pgvector', 'PostgreSQL', 'Spring Security', 'Redis'],
    period: { start: '2026-08-21', end: '2026-09-03' },
    repo: 'https://github.com/wlsdn020416/Knotty',
    logo: { src: knottyLogo, width: 640, height: 286 },
    team: '3인 팀',
    role: 'AI 매칭 · 거래 동시성 제어 · 인증',
  },
  {
    id: 'packing',
    name: 'Packing',
    description: '여행 성향 기반 국내 관광지 추천 서비스',
    tags: ['Node.js', 'Express', 'Supabase', 'LLM'],
    period: { start: '2026-06-08', end: '2026-06-12' },
    repo: 'https://github.com/wlsdn020416/Packing',
    logo: { src: packingLogo, width: 640, height: 308 },
    team: '4인 팀',
    role: '데이터 수집 · 가공 · LLM 추천',
  },
];

export function getNextProject(id: string): Project {
  const index = projects.findIndex((p) => p.id === id);
  return projects[(index + 1) % projects.length];
}
