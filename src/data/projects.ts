import type { Period } from '../utils/period';

export type Project = {
  id: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  year: string;
  flow: string[];
  notes: string[];
  /** 카드 제목 옆 기호 */
  symbol: string;
  /** 홈 카드 한 줄 소개 */
  tagline: string;
  /** 상세 페이지 스탬프 문구 */
  stamp: string;
  /** 상세 페이지 흐름 시뮬레이션 제목 */
  flowTitle: string;
  /** 서비스 화면 자리 표시 여부 */
  hasService: boolean;
  /** 진행 기간 */
  period?: Period;
  /** GitHub 저장소 */
  repo?: string;
};

export const projects: Project[] = [
  {
    id: 'grab',
    name: 'GRAB',
    eyebrow: 'BACKEND SYSTEM ENGINEERING',
    title: 'When every\nmillisecond matters.',
    description:
      '한정된 수량, 동시에 몰리는 요청. 상태 전환과 실시간 이벤트를 통해 신뢰할 수 있는 커머스 시스템을 설계합니다.',
    tags: ['Spring Boot', 'MySQL', 'Redis', 'SSE'],
    color: '#ff6b35',
    year: '01',
    flow: ['대상 탐색', '행 잠금', '조건 재검증', '상태 갱신', '이벤트 전달'],
    notes: [
      'DROP의 공개·판매 상태와 WISH 등록 및 취소 흐름을 다룹니다.',
      'FOR UPDATE SKIP LOCKED를 활용하는 배치의 잠금과 트랜잭션 흐름을 설명합니다.',
      'SSE 구독부터 연결 종료까지 이벤트 전달과 자원 관리 과정을 다룹니다.',
    ],
    symbol: '↗',
    tagline: '동시에 몰려도, 흔들리지 않게.',
    stamp: 'precision.',
    flowTitle: 'From waiting to live.',
    hasService: true,
    period: { start: '2026-09-22', end: '2026-11-04' },
    repo: 'https://github.com/wlsdn020416/Grab',
  },
  {
    id: 'knotty',
    name: 'Knotty',
    eyebrow: 'AI & VECTOR SEARCH ENGINEERING',
    title: 'Beyond keywords.\nCloser to meaning.',
    description:
      '단어를 넘어 의도를 연결합니다. 임베딩과 벡터 검색을 실제 서비스의 매칭 경험으로 이어갑니다.',
    tags: ['Spring AI', 'pgvector', 'PostgreSQL'],
    color: '#b89aff',
    year: '02',
    flow: ['매칭 입력', '임베딩', '벡터 검색', '결과 처리', '매칭 결과'],
    notes: [
      '사용자 포트폴리오와 재능 데이터를 연결하는 AI 매칭 경험을 다룹니다.',
      'Spring AI와 pgvector를 활용한 의미적 유사도 검색의 흐름을 설명합니다.',
      '임베딩 생성 방식과 검색 조건은 실제 코드를 확인한 후 상세화할 예정입니다.',
    ],
    symbol: '✳',
    tagline: '단어 너머, 의미로 연결하기.',
    stamp: 'curiosity.',
    flowTitle: 'A little closer to the right match.',
    hasService: true,
    period: { start: '2026-08-21', end: '2026-09-03' },
    repo: 'https://github.com/wlsdn020416/Knotty',
  },
  {
    id: 'packing',
    name: 'Packing',
    eyebrow: 'DATA PIPELINE',
    title: 'Data in.\nPossibilities out.',
    description:
      '외부 데이터를 수집하고 성향 점수를 계산해, 개인화된 여행 추천으로 연결한 첫 번째 팀 프로젝트.',
    tags: ['Node.js', 'Express', 'Supabase', 'LLM'],
    color: '#a9dfcd',
    year: '03',
    flow: ['API 수집', '원천 저장', '성향 점수화', '가공 저장', 'LLM 추천'],
    notes: [
      '외부 API의 여행 데이터를 수집하고 원천 데이터를 DB에 적재합니다.',
      '별도 스크립트로 규칙 기반 성향 점수를 계산하고 가공 데이터를 저장합니다.',
      '사용자 성향과 지역 조건을 LLM 추천에 연결합니다. DB 유실로 현재 서비스는 제공하지 않으며 코드 기반 사례로 정리합니다.',
    ],
    symbol: '✦',
    tagline: '흩어진 데이터를 여행의 힌트로.',
    stamp: 'possibility.',
    flowTitle: 'From raw data to a new destination.',
    hasService: false,
    period: { start: '2026-06-08', end: '2026-06-12' },
    repo: 'https://github.com/wlsdn020416/Packing',
  },
];

export function getNextProject(id: string): Project {
  const index = projects.findIndex((p) => p.id === id);
  return projects[(index + 1) % projects.length];
}
