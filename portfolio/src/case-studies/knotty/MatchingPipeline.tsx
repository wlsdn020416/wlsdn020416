import { StepList, type Step } from '../shared/StepList';

const steps: Step[] = [
  {
    title: '검색어 분석',
    where: 'AiMatchQueryAnalysisService',
    body: '검색 대상, 의미 검색용 문장, 카테고리, 금액·기간 조건을 JSON으로 추출합니다.',
    tag: 'LLM',
  },
  {
    title: '조건 검증',
    where: 'MatchConditionValidator',
    body: '대상별 허용 조건과 범위가 올바른지 확인합니다.',
  },
  {
    title: '벡터 검색',
    where: 'VectorSearchService',
    body: 'pgvector 코사인 유사도로 후보를 최대 30개 조회합니다.',
  },
  {
    title: '조건 필터링',
    where: 'MatchCandidateFilter',
    body: 'DB 원본 기준으로 상태·카테고리·금액·기간·마감일이 맞지 않는 후보를 제외합니다.',
  },
  {
    title: '점수 계산',
    where: 'MatchRankingService',
    body: '의미 유사도와 금액 적합도로 점수를 매겨 상위 5개를 선정합니다.',
  },
  {
    title: '추천 이유 생성',
    where: 'RecommendationReasonService',
    body: '선정된 후보별 추천 이유를 한 번의 호출로 생성합니다.',
    tag: 'LLM',
  },
];

export function MatchingPipeline() {
  return <StepList steps={steps} />;
}
