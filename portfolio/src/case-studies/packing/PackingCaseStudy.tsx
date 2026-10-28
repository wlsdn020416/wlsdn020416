import { StudyOverview } from '../shared/StudyOverview';
import '../../styles/case-study.css';
import dayRouteShot from '../../assets/images/packing/day-route.jpg';
import recommendationShot from '../../assets/images/packing/recommendation.jpg';
import { CodeBlock } from '../../components/CodeBlock';
import { StepList, type Step } from '../shared/StepList';
import { ItineraryFlow } from './ItineraryFlow';
import { MbtiScoreExample } from './MbtiScoreExample';
import {
  fallbackSnippet,
  normalizeSnippet,
  pagesSnippet,
  rankingSnippet,
  scoringSnippet,
  targetsSnippet,
} from './snippets';

const collectionSteps: Step[] = [
  {
    title: '수집 목표 설정',
    where: 'CONTENT_TYPE_TARGETS',
    body: '17개 시·도마다 100곳을 목표로, 관광지 40 · 문화시설 25 · 음식점 25 · 레포츠 10 비율로 나눕니다.',
  },
  {
    title: '분산 페이지 선택',
    where: 'selectDistributedPages',
    body: '앞쪽 페이지에 결과가 몰리지 않도록 전체 페이지 구간에서 고르게 골라 조회합니다.',
  },
  {
    title: '목록 조회',
    where: 'TourAPI areaBasedList2',
    body: '지역과 콘텐츠 유형별로 관광지 목록을 가져옵니다. 5xx는 최대 3회 재시도하고, 호출량 초과(429)는 즉시 중단합니다.',
  },
  {
    title: '필수 데이터 검증',
    where: 'hasRequiredListFields',
    body: '주소 · 이미지 · 좌표가 없는 항목과 이미 수집한 contentid는 제외합니다.',
  },
  {
    title: '상세 설명 조회',
    where: 'TourAPI detailCommon2',
    body: '관광지 설명(overview)을 가져오고, 설명이 없는 항목은 제외합니다.',
  },
  {
    title: '가공 후 저장',
    where: 'processTourDestination → upsert',
    body: '정규화 · 키워드 · MBTI 점수를 계산해 관광지, 키워드, 유형별 점수 테이블에 upsert합니다.',
  },
];

function CollectionSection() {
  return (
    <section className="cs-part" id="collection">
      <h2>데이터 수집</h2>
      <p className="cs-lead">
        한국관광공사 TourAPI에서 전국 관광지 데이터를 수집하는 스크립트를 구현했습니다. 지역과
        콘텐츠 유형별로 수집 비율을 정해 데이터가 한쪽에 치우치지 않게 했고, 서비스 화면에 필요한
        이미지 · 좌표 · 설명이 없는 데이터는 저장 전에 걸렀습니다.
      </p>

      <div className="cs-block">
        <StepList steps={collectionSteps} />
      </div>

      <div className="cs-block cs-codes">
        <CodeBlock
          file="importTourData.js"
          lang="js"
          code={targetsSnippet}
          highlightLines={[2, 3, 4, 5, 12, 13, 14, 15]}
          caption="유형별 목표 수와, 지도 · 카드 화면에 필요한 주소 · 이미지 · 좌표 필수 조건입니다."
        />
        <CodeBlock
          file="importTourData.js"
          lang="js"
          code={pagesSnippet}
          highlightLines={[15, 16, 17]}
          caption="첫 페이지와 마지막 페이지 사이를 같은 간격으로 나눠 조회할 페이지를 고릅니다."
        />
      </div>
    </section>
  );
}

function ScoringSection() {
  return (
    <section className="cs-part" id="scoring">
      <h2>규칙 기반 점수 계산과 추천 정렬</h2>
      <p className="cs-lead">
        수집한 관광지마다 16개 여행 MBTI 유형별 적합도(0~100점)를 계산해 저장합니다. 콘텐츠 유형과
        설명 텍스트에 맞는 규칙의 가중치를 8개 축에 더하고, 유형의 네 글자에 해당하는 축 점수를
        평균합니다. 추천은 사용자 유형의 점수 순으로 정렬해 TOP 10을 보여줍니다.
      </p>

      <div className="cs-block">
        <h3>점수 계산</h3>
        <MbtiScoreExample />
      </div>

      <figure className="cs-shot">
        <img
          src={recommendationShot}
          alt="Packing 맞춤 여행지 TOP 10 화면. 추천 1위 가거도, 적합도 56.8점."
          width={1024}
          height={599}
          loading="lazy"
        />
        <figcaption>맞춤 여행지 TOP 10 화면</figcaption>
      </figure>

      <div className="cs-block cs-codes">
        <CodeBlock
          file="mbtiScorer.js"
          lang="js"
          code={scoringSnippet}
          highlightLines={[4, 5, 12, 13, 14]}
          caption="한 축에 가중치를 더하면 반대 축에서 같은 만큼 빼서, 두 축의 합이 항상 100이 되게 했습니다."
        />
        <CodeBlock
          file="destinationRecommendation.js"
          lang="js"
          code={rankingSnippet}
          highlightLines={[1, 2, 5]}
          caption="점수 내림차순, 동점이면 ID 순으로 정렬하고 이미지 · 지역 · 키워드 필터를 DB 조회 단계에서 적용합니다."
        />
      </div>
    </section>
  );
}

function ItinerarySection() {
  return (
    <section className="cs-part" id="itinerary">
      <h2>LLM 일정 추천과 fallback</h2>
      <p className="cs-lead">
        지역 · 기간 · 키워드를 입력하면 Gemini로 여행 일정을 생성합니다. 후보 선정과 하루 동선은
        규칙 기반으로 먼저 정하고 LLM에 넘기며, LLM 호출이 실패해도 같은 동선으로 일정을 만들어 기본
        일정 응답을 반환하도록 했습니다.
      </p>

      <div className="cs-block">
        <ItineraryFlow />
      </div>

      <figure className="cs-shot">
        <img
          src={dayRouteShot}
          alt="Packing 일정 상세 화면. DAY 3에 수동계곡과 가산낚시터 두 곳이 지도에 표시된다."
          width={1200}
          height={798}
          loading="lazy"
        />
        <figcaption>일정 상세 화면 — 하루 2곳을 가까운 거리로 묶은 결과</figcaption>
      </figure>

      <div className="cs-block cs-codes">
        <CodeBlock
          file="travel.js"
          lang="js"
          code={fallbackSnippet}
          highlightLines={[11, 12, 13, 14]}
          caption="Gemini 호출에서 어떤 예외가 나도 미리 만들어 둔 fallback 일정을 반환합니다."
        />
        <CodeBlock
          file="travel.js"
          lang="js"
          code={normalizeSnippet}
          highlightLines={[13, 14, 15, 16]}
          caption="LLM 응답이 있어도 날짜별 장소는 근거리 묶음 결과로 채워, 후보 밖 장소가 일정에 들어가지 않게 했습니다."
        />
      </div>
    </section>
  );
}

export function PackingArticleContent() {
  return (
    <div className="case-study">
      <CollectionSection />
      <ScoringSection />
      <ItinerarySection />
    </div>
  );
}

export function PackingCaseStudy() {
  return <StudyOverview project="packing" />;
}
