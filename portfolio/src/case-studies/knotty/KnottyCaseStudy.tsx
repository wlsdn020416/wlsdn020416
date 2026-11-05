import { StudyOverview } from '../shared/StudyOverview';
import '../../styles/case-study.css';
import { AuthSequence } from './AuthSequence';
import { LockTimeline } from './LockTimeline';
import { MatchingPipeline } from './MatchingPipeline';

function MatchingSection() {
  return (
    <section className="cs-part" id="matching">
      <h2>AI 매칭</h2>
      <p className="cs-lead">
        자연어 검색어로 조건에 맞는 재능글·요청글을 찾는 기능입니다. LLM은 검색 조건 추출과 추천
        이유 작성에만 사용하고, 후보 선정과 순위는 벡터 검색과 SQL, Java 코드로 처리했습니다.
      </p>

      <div className="cs-block">
        <h3>처리 단계</h3>
        <MatchingPipeline />
      </div>
    </section>
  );
}

function TradeLockSection() {
  return (
    <section className="cs-part" id="concurrency">
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
    </section>
  );
}

function AuthSection() {
  return (
    <section className="cs-part" id="authentication">
      <h2>인증</h2>
      <p className="cs-lead">
        JavaScript에서 토큰을 직접 읽을 수 없도록 JWT를 HttpOnly 쿠키로 전달했습니다. Refresh
        Token은 Redis에 저장해 서버에서 폐기할 수 있게 했고, 쿠키 사용에 따른 CSRF는 double-submit
        토큰으로 검증하도록 구현했습니다.
      </p>

      <div className="cs-block">
        <AuthSequence />
      </div>
    </section>
  );
}

export function KnottyArticleContent() {
  return (
    <div className="case-study">
      <MatchingSection />
      <TradeLockSection />
      <AuthSection />
    </div>
  );
}

export function KnottyCaseStudy() {
  return <StudyOverview project="knotty" />;
}
