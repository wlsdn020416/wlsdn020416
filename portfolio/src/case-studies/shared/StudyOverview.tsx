import { ArrowUpRight } from 'lucide-react';
import '../../styles/case-study.css';
import '../../styles/technical-study.css';

const summaries = {
  knotty: {
    intro:
      '재능글과 요청글을 등록하고 거래하는 플랫폼입니다. 자연어 검색 기반 매칭, 기존 결제 흐름의 동시성 제어, JWT 인증을 담당했습니다.',
    roles: [
      ['AI 매칭', '검색 조건 추출, pgvector 후보 검색, SQL 필터링, 서버 점수 계산'],
      ['거래 동시성', '거래·요청글·지갑 잠금, 상태 검증, 중복 결제 제약'],
      ['인증', 'HttpOnly 쿠키, Redis Refresh Token 관리, CSRF 검증'],
    ],
    decisions: [
      [
        'LLM과 서버의 책임 분리',
        'LLM은 조건 추출과 추천 이유 생성을 담당합니다. 가격·상태 필터와 최종 순위는 SQL·Java 코드로 처리해 결과의 판단 근거를 유지했습니다.',
      ],
      [
        '잠금 이후 상태 확인',
        '같은 거래의 결제 요청을 행 잠금으로 직렬화하고, 잠금 획득 후 상태를 검증합니다. DB 부분 유니크 인덱스를 추가해 중복 결제를 제한했습니다.',
      ],
      [
        '외부 호출과 트랜잭션 분리',
        '게시글 저장 중 실행하던 임베딩 호출을 커밋 이후 비동기 이벤트로 분리했습니다. 외부 API 응답을 기다리는 동안 트랜잭션을 유지하지 않도록 했습니다.',
      ],
    ],
    scope:
      '결제 흐름은 팀원이 구현한 기능에 동시성 제어를 추가했습니다. 아래 문서에서 매칭 처리 단계, 결제 잠금 순서, 인증 흐름과 코드 발췌를 확인할 수 있습니다.',
    link: '검색·거래 동시성·인증 구현 상세',
  },
  packing: {
    intro:
      '여행 성향과 지역 조건을 기반으로 관광지와 일정을 추천하는 서비스입니다. TourAPI 데이터 수집·가공, 유형별 추천 점수 계산, LLM 일정 생성과 실패 시 대체 처리를 담당했습니다.',
    roles: [
      ['데이터 수집', '지역·유형별 수집 목표, 필수 필드 검증, 중복 제거와 upsert'],
      ['추천 정렬', '관광지별 16개 유형 점수 계산, 지역·키워드 필터, 동점 정렬'],
      ['일정 생성', '후보 선정과 근거리 묶음, Gemini 응답 정규화, 규칙 기반 대체 일정'],
    ],
    decisions: [
      [
        '수집 단계에서 데이터 검증',
        '주소·이미지·좌표·설명이 없는 항목은 제외했습니다. 지역과 콘텐츠 유형별 목표를 나누고 페이지를 분산 조회해 수집 대상의 편중을 줄였습니다.',
      ],
      [
        '점수와 정렬 기준 명시',
        '콘텐츠 유형과 설명에 규칙별 가중치를 적용하고 유형별 점수를 저장했습니다. 점수 내림차순으로 조회하고 동점이면 ID로 정렬했습니다.',
      ],
      [
        'LLM 실패 시 기본 응답 제공',
        '여행지 후보와 하루 동선은 먼저 계산합니다. LLM 호출이나 응답 해석에 실패하면 같은 후보·동선으로 구성한 기본 일정을 반환하도록 했습니다.',
      ],
    ],
    scope:
      '유형별 점수는 서비스에서 정의한 규칙 기반 적합도입니다. 추천 정확도를 실험으로 검증한 수치는 아니며, 아래 문서에는 실제 계산 규칙과 처리 흐름을 정리했습니다.',
    link: '데이터 수집·추천·일정 생성 구현 상세',
  },
};

export function StudyOverview({ project }: { project: keyof typeof summaries }) {
  const content = summaries[project];
  return (
    <div className="case-study technical-overview">
      <section className="cs-part">
        <h2>담당 기능</h2>
        <p className="cs-lead">{content.intro}</p>
        <dl className="study-roles">
          {content.roles.map(([title, description]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="cs-part">
        <h2>주요 설계</h2>
        <div className="study-decisions">
          {content.decisions.map(([title, description]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <p className="study-scope">{content.scope}</p>
        <a className="study-document-link" href={`/projects/${project}/engineering`}>
          <span>{content.link}</span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
