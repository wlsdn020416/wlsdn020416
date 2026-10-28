import { GrabPerformanceSummary } from './GrabPerformanceSummary';
import { ArrowUpRight } from 'lucide-react';
import '../../styles/case-study.css';
import '../../styles/grab-story.css';

export function GrabCaseStudy() {
  return (
    <div className="case-study grab-summary">
      <section className="cs-part">
        <h2>조회 성능 개선</h2>
        <p className="cs-lead">
          SSE 1,000연결·주문 50건/초 조건에서 목록 조회 p95를 97ms에서 16ms로, 주문 p95를 233ms에서
          42ms로 줄였습니다. 쿼리·캐시 최적화와 클라이언트 재조회 분산을 적용했으며, 알림 전달 p95는
          4.27초에서 0.99초로 감소했습니다.
        </p>
        <GrabPerformanceSummary />
        <a className="grab-story-link" href="/projects/grab/performance">
          <span>
            <strong>성능 개선 상세 문서</strong>
          </span>
          <ArrowUpRight size={28} aria-hidden="true" />
        </a>
      </section>

      <section className="cs-part">
        <h2>담당 기능</h2>
        <p className="cs-lead">
          GRAB은 판매 전 관심을 모으고, 정해진 시간에 한정 수량을 판매하는 커머스입니다. DROP·WISH
          기능과 실시간 재고 알림을 구현하고, 주문이 발생하는 동안 여러 화면이 재조회하는 상황을
          부하 테스트로 검증했습니다.
        </p>
        <dl className="grab-responsibilities">
          <div>
            <dt>DROP · WISH</dt>
            <dd>상품 공개·수정과 관심 등록·취소, 상태 전환 및 동시 요청 처리</dd>
          </div>
          <div>
            <dt>조회 성능</dt>
            <dd>목록 집계 개선, 상세·재고 DB 왕복 축소, 앱 메모리 캐시와 무효화</dd>
          </div>
          <div>
            <dt>실시간 갱신</dt>
            <dd>SSE 변경 알림, 프론트 재조회 정책, 주문을 포함한 통합 부하 검증</dd>
          </div>
        </dl>
      </section>

      <section className="cs-part">
        <h2>데이터 정합성</h2>
        <div className="grab-principles">
          <div>
            <h3>조회 캐시와 재고 판단 분리</h3>
            <p>
              재고 차감과 주문 생성의 판단은 PostgreSQL 트랜잭션과 행 잠금에 맡깁니다. 조회 캐시가
              비어도 주문의 정합성은 DB에서 유지합니다.
            </p>
          </div>
          <div>
            <h3>변경 확정 후 캐시 무효화</h3>
            <p>
              커밋 뒤 캐시를 무효화하고 SSE를 보냅니다. 변경 전에 시작된 조회가 뒤늦게 끝나도 오래된
              결과를 새 캐시에 넣지 않도록 세대를 구분했습니다.
            </p>
          </div>
          <div>
            <h3>WISH 동시 요청 처리</h3>
            <p>
              WISH 재활성화·취소가 겹칠 때 잠금 전에 구한 시각 때문에 순서가 어긋날 수 있는 경로를
              보완했습니다. 잠금을 얻은 뒤 시각을 결정하도록 변경했습니다.
            </p>
          </div>
        </div>
        <p className="grab-note">
          위 내용은 직접 담당한 조회·알림·동시성 개선입니다. 주문 경로는 팀에서 구현한 기능과 함께
          통합 검증했습니다.
        </p>
      </section>
    </div>
  );
}
