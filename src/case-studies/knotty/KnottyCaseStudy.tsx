import '../../styles/case-study.css';
import aiMatchingShot from '../../assets/images/knotty/ai-matching.jpg';
import { CodeBlock } from '../../components/CodeBlock';
import { AuthSequence } from './AuthSequence';
import { LockTimeline } from './LockTimeline';
import { MatchingPipeline } from './MatchingPipeline';
import {
  analyzeSnippet,
  paySnippet,
  rankingSnippet,
  reasonPromptSnippet,
  refreshSnippet,
  vectorSearchSnippet,
} from './snippets';

function MatchingSection() {
  return (
    <section className="cs-part">
      <h2>AI 매칭</h2>
      <p className="cs-lead">
        자연어 검색어로 조건에 맞는 재능글·요청글을 찾는 기능입니다. LLM은 검색 조건 추출과 추천
        이유 작성에만 사용하고, 후보 선정과 순위는 벡터 검색과 SQL, Java 코드로 처리했습니다.
      </p>

      <div className="cs-block">
        <h3>처리 단계</h3>
        <MatchingPipeline />
      </div>

      <figure className="cs-shot">
        <img
          src={aiMatchingShot}
          alt="Knotty AI 매칭 결과 화면. 적합도 63%와 추천 이유가 표시된다."
          width={1200}
          height={797}
          loading="lazy"
        />
        <figcaption>AI 매칭 결과 화면</figcaption>
      </figure>

      <div className="cs-block cs-codes">
        <CodeBlock
          file="AiMatchQueryAnalysisService.java"
          code={analyzeSnippet}
          highlightLines={[8, 9, 10]}
          caption="LLM 호출이 실패하면 정규식과 키워드 규칙으로 조건을 추출합니다."
        />
        <CodeBlock
          file="VectorSearchService.java"
          code={vectorSearchSnippet}
          highlightLines={[9, 11]}
          caption="대상 타입만 필터링해 후보 30개를 가져오고, 세부 조건은 이후 SQL 단계에서 확인합니다."
        />
        <CodeBlock
          file="MatchRankingService.java"
          code={rankingSnippet}
          highlightLines={[1, 2, 18, 19]}
          caption="금액 조건이 있으면 의미 유사도 90%, 금액 적합도 10%로 점수를 계산합니다."
        />
        <CodeBlock
          file="RecommendationReasonService.java (프롬프트)"
          code={reasonPromptSnippet}
          lang="text"
          highlightLines={[2, 3]}
          caption="LLM이 후보 순서나 점수를 바꾸지 않도록 하고, 게시글 본문의 지시문은 따르지 않도록 했습니다."
        />
      </div>
    </section>
  );
}

function TradeLockSection() {
  return (
    <section className="cs-part">
      <h2>거래 동시성 제어</h2>
      <p className="cs-lead">
        팀원이 구현한 결제 흐름에 비관적 락(<code>PESSIMISTIC_WRITE</code>)을 추가해 같은 거래 ·
        요청글 · 지갑에 대한 요청을 순서대로 처리했습니다. 요청글 상태 전이 검증과 DB 부분 유니크
        인덱스로 중복 결제를 한 번 더 막았고, 게시글 저장 트랜잭션 안에서 호출하던 임베딩을{' '}
        <code>AFTER_COMMIT</code> 비동기 이벤트로 분리해 외부 API 대기 중 락을 오래 잡지 않도록
        했습니다.
      </p>

      <div className="cs-block">
        <LockTimeline />
      </div>

      <div className="cs-block cs-codes">
        <CodeBlock
          file="TradeService.java"
          code={paySnippet}
          highlightLines={[3, 7, 8]}
          caption="거래 행을 먼저 잠근 뒤 상태를 확인합니다. 뒤따르는 요청은 잠금이 풀린 후 PAID 상태를 보고 거절됩니다."
        />
      </div>
    </section>
  );
}

function AuthSection() {
  return (
    <section className="cs-part">
      <h2>인증</h2>
      <p className="cs-lead">
        XSS로 토큰이 유출되지 않도록 JWT를 HttpOnly 쿠키로만 주고받게 구현했습니다. Refresh Token은
        Redis에 저장해 서버에서 폐기할 수 있게 했고, 쿠키 사용에 따른 CSRF는 double-submit 토큰으로
        막았습니다.
      </p>

      <div className="cs-block">
        <AuthSequence />
      </div>

      <div className="cs-block cs-codes">
        <CodeBlock
          file="AuthService.java"
          code={refreshSnippet}
          highlightLines={[15, 17, 18]}
          caption="서명 검증 후 Redis에 저장된 값과 비교합니다. 로그아웃하면 Redis 키가 삭제되어 재발급되지 않습니다."
        />
      </div>
    </section>
  );
}

export function KnottyCaseStudy() {
  return (
    <div className="case-study">
      <MatchingSection />
      <TradeLockSection />
      <AuthSection />
    </div>
  );
}
