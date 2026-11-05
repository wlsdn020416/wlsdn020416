import { GrabPerformanceSummary } from './GrabPerformanceSummary';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PerformanceComparison } from './PerformanceComparison';
import '../../styles/case-study.css';
import '../../styles/grab-story.css';

const sourceRoot = 'https://github.com/prgrms-aibe-devcourse/AIBE7_FinalProject_Team3';
const sections = [
  ['problem', '목표와 운영 제약'],
  ['baseline', '첫 측정과 목표의 거리'],
  ['cost', '쿼리와 캐시 개선'],
  ['burst', '요청 집중 분석'],
  ['jitter', '재조회 시점 분산'],
  ['result', '검증 결과와 한계'],
  ['decision', '설계 판단과 배운 점'],
] as const;

export function GrabPerformancePage() {
  return (
    <main className="grab performance-page case-study">
      <a className="back" href="/projects/grab">
        <ArrowLeft size={16} /> GRAB 프로젝트
      </a>
      <article>
        <div className="grab-article-hero">
          <h1>GRAB 조회 성능 개선</h1>
          <p className="grab-article-deck">
            1,000명이 지켜보는 한정판매에서 조회 p95 200ms 이하를 목표로 삼았습니다. 단일 인스턴스와
            외부 DB 제약 안에서 측정하고, 쿼리를 줄인 뒤 드러난 재조회 순간 집중까지 해결한
            과정입니다.
          </p>
        </div>

        <div className="grab-article-layout">
          <aside className="grab-toc">
            <p>목차</p>
            <ol>
              {sections.map(([id, title], index) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span>0{index + 1}</span>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>
          <div className="grab-article-body">
            <p className="grab-opening">
              실시간 재고 갱신 과정에서 상세·목록 조회와 주문 요청이 DB 자원을 공유합니다. 쿼리
              비용과 DB 왕복을 줄인 뒤에도 지연이 발생해, 요청 도착 시점과 커넥션 대기를 추가로
              분석했습니다. 최종적으로 자동 재조회 시점을 분산하고 로컬 1,000연결 조건에서 응답시간
              기준 충족을 확인했습니다.
            </p>

            <section id="problem">
              <h2>01. 먼저 정의한 목표: 1,000연결에서 조회 p95 200ms 이하</h2>
              <p>
                한정판매에서는 많은 사용자가 같은 상품의 재고 변화를 기다립니다. 화면을 빠르게
                열어도 판매가 시작된 뒤 재조회가 밀리면 품절 여부를 늦게 보게 됩니다. 그래서 성능을
                평균 응답시간으로만 판단하지 않고, 1,000개 SSE 연결과 주문이 함께 발생할 때
                상세·재고·목록 API가 각각 p95 200ms 이하로 응답하는 것을 목표로 삼았습니다. 이는
                모든 사용자의 화면 렌더링이 200ms 안에 끝난다는 의미는 아닙니다. 기록상 초기 참고
                목표는 800~1,000연결이며, 이 글에서는 최종 검증한 1,000연결을 목표로 설명합니다.
              </p>
              <p>
                GRAB은 재고가 바뀌면 SSE로 변경 신호를 보냅니다. 화면은 이 신호를 받고 상세·재고
                또는 목록 API를 다시 조회합니다. 주문이 몰리는 순간에는 알림 전송과 조회, 주문이
                같은 DB 자원을 사용합니다.
              </p>
              <ol className="grab-flow">
                <li>
                  <b>주문 확정</b>
                  <span>DB 트랜잭션 커밋</span>
                </li>
                <li>
                  <b>변경 알림</b>
                  <span>SSE로 화면에 전달</span>
                </li>
                <li>
                  <b>HTTP 재조회</b>
                  <span>새 재고를 읽어 갱신</span>
                </li>
              </ol>
              <p>
                그래서 SSE 연결 1,000개를 유지하는 것만으로는 충분하지 않았습니다. 주문을 초당 50건
                발생시키면서, 상세 구독 70%·목록 구독 30%의 재조회까지 함께 측정했습니다. 각 화면은
                최소 2초 간격으로 자동 재조회합니다.
              </p>
              <div className="grab-callout">
                <strong>측정 기준</strong>
                <p>
                  상세·재고·목록 p95 200ms 이하, 주문 p95 500ms 이하. p95는 요청 100개 중 95개가
                  해당 시간 안에 끝났다는 뜻입니다.
                </p>
              </div>
              <h3>증설보다 먼저, 실제 제약을 실험 조건으로 옮겼습니다</h3>
              <p>
                단일 인스턴스 운영을 유지하고, RDS 대신 외부 관리형 PostgreSQL인 Supabase 무료 Nano
                환경을 사용하는 조건이었습니다. DB가 앱과 같은 머신에 있는 로컬 테스트만으로는
                운영의 네트워크 왕복 비용을 설명할 수 없었습니다. 운영 DB 왕복 실측 약 3.2~3.4ms를
                기준으로 지연을 주입하고, 제한된 CPU·메모리 안에서 어디부터 대기가 생기는지
                측정했습니다.
              </p>
              <div className="grab-table-scroll">
                <table>
                  <caption>운영 모사 조건 — GR-186·GR-180</caption>
                  <thead>
                    <tr>
                      <th>대상</th>
                      <th>고정 조건</th>
                      <th>해석</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>백엔드</th>
                      <td>단일 앱, 2 vCPU · 1GiB · JVM 550MiB</td>
                      <td>운영 EC2 t3.small을 보수적으로 모사한 앱 자원 제한</td>
                    </tr>
                    <tr>
                      <th>DB</th>
                      <td>1 vCPU · 512MiB · 최대 연결 60</td>
                      <td>Supabase Nano 공유 CPU를 대신한 가정값</td>
                    </tr>
                    <tr>
                      <th>네트워크</th>
                      <td>netem 2.5ms 주입 → 왕복 p50 3.18ms</td>
                      <td>운영 실측 3.2~3.4ms에 맞춤</td>
                    </tr>
                    <tr>
                      <th>공유 자원</th>
                      <td>HikariCP 10 · Tomcat 최대 스레드 200</td>
                      <td>조회와 주문이 같은 풀 사용</td>
                    </tr>
                    <tr>
                      <th>데이터·부하</th>
                      <td>DROP 5,000건 + 실시간 상품 24개 · 주문 50건/초</td>
                      <td>주문의 80%가 인기 상품 하나에 집중</td>
                    </tr>
                    <tr>
                      <th>회차</th>
                      <td>워밍업 60초 · 주문 구간 180초</td>
                      <td>같은 Mac에서 앱·DB·부하 발생기 실행</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                측정 전 조회 p95 200ms, 주문 p95 500ms, 오류율 1% 미만을 정했습니다. 알림 전달 p95
                3초, 주문 응답 수신부터 재조회 완료까지 p95 8초도 함께 확인했습니다. 로컬 DB CPU
                1개는 Supabase의 보장 사양이 아니므로, 결과는 이 모사 조건에서의 관측으로
                한정했습니다.
              </p>
            </section>

            <section id="baseline">
              <h2>02. 첫 통합 측정: 연결은 유지됐지만 조회 목표는 크게 초과했습니다</h2>
              <p>
                SSE 연결만 유지하는 시험에서 나아가, 알림을 받은 화면이 실제로 API를 다시 부르게
                했습니다. 전송 최적화가 반영된 코드에서 캐시를 끈 1,000연결 회차는 상세 p95 2,496ms,
                목록 2,491ms였습니다. 200ms 목표의 약 12.5배였고 주문 p95도 3,094ms까지 늘었습니다.
              </p>
              <div className="grab-table-scroll">
                <table>
                  <caption>GR-180 통합 측정 · 전송 최적화 후 · 캐시 없음</caption>
                  <thead>
                    <tr>
                      <th>연결</th>
                      <th>상세 / 재고 / 목록 p95</th>
                      <th>주문 p95</th>
                      <th>판정</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>100</th>
                      <td>280 / 267 / 203ms</td>
                      <td>304ms</td>
                      <td>조회 기준 미달</td>
                    </tr>
                    <tr>
                      <th>400</th>
                      <td>705 / 694 / 702ms</td>
                      <td>981ms</td>
                      <td>조회·주문 미달</td>
                    </tr>
                    <tr>
                      <th>1,000</th>
                      <td>2,496 / 2,486 / 2,491ms</td>
                      <td>3,094ms</td>
                      <td>조회·주문 미달</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                HTTP 오류가 0이어도 성공으로 볼 수 없었습니다. 1,000연결에서 커넥션 대기는 최대 190,
                k6가 시작하지 못한 주문은 98건이었습니다. SSE 전달 p95는 약 1초여서, 연결 수보다
                알림 이후 HTTP 재조회와 공유 DB 대기를 살펴봐야 했습니다.
              </p>
              <p className="grab-note">
                이 비교군은 성능 작업 전 바닐라 코드와 다릅니다. 바닐라는 알림 전송 자체가 느려 후속
                조회가 자연스럽게 분산됐습니다. 뒤의 최종 비교 그래프에서는 두 비교군을 섞지
                않습니다.
              </p>
            </section>

            <section id="cost">
              <h2>03. 요청 하나가 쓰는 DB 비용부터 줄였습니다</h2>
              <p>
                쿼리 실행 계획과 DB 호출 횟수를 확인했습니다. 인기순 목록은 주문 이력을 반복
                집계했고, 상세 화면은 SQL 자체가 빨라도 여러 번 DB를 왕복하고 있었습니다. 계산량과
                통신 횟수를 각각 줄였습니다.
              </p>
              <div className="grab-table-scroll">
                <table>
                  <caption>서로 다른 개별 실험에서 확인한 개선</caption>
                  <thead>
                    <tr>
                      <th scope="col">대상</th>
                      <th scope="col">바꾼 것</th>
                      <th scope="col">확인한 변화</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">인기 GRAB 목록</th>
                      <td>주문 이력 대신 기존 판매 수량 집계 활용</td>
                      <td>
                        VU 400 p95
                        <br />
                        2,117 → 46ms
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">상세 · 재고</th>
                      <td>중복 조회와 DB 왕복 축소</td>
                      <td>
                        SQL 호출
                        <br />
                        상세 9 → 6, 재고 2 → 1
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">상세 · 재고 캐시</th>
                      <td>앱 메모리 재사용 + 같은 조회 합치기</td>
                      <td>
                        주문 없는 읽기 부하 VU 800
                        <br />
                        p95 1,336 → 18.6ms
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">목록 전체 건수</th>
                      <td>목록과 count를 한 쿼리로 통합</td>
                      <td>
                        400연결 집중 부하, SQL 구간 평균
                        <br />
                        34.1 → 14.6ms
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="grab-note">
                각 행의 부하·측정 조건은 다릅니다. 수치를 합쳐 전체 개선율로 해석하지 않습니다.
              </p>
              <h3>캐시 무효화와 진행 중 조회의 경합 처리</h3>
              <p>
                조회가 진행되는 동안 주문이 확정될 수 있습니다. 이때 캐시를 지우기만 하면, 먼저
                시작한 조회가 나중에 끝나 오래된 값을 다시 넣을 수 있습니다. 캐시의 세대를 구분해
                변경 전 조회 결과가 새 세대에 저장되지 않도록 했습니다.
              </p>
              <div className="grab-cache-flow">
                <span>주문 커밋</span>
                <span aria-hidden="true">→</span>
                <span>캐시 무효화 · 세대 변경</span>
                <span aria-hidden="true">→</span>
                <span>SSE 알림</span>
              </div>
              <p>
                무효화 이후의 요청은 이전 세대의 조회를 기다리지 않습니다. 같은 세대의 동시 요청만
                하나로 합치고, 주문의 재고 판단은 계속 PostgreSQL에서 처리합니다.
              </p>
              <h3>목록 count 통합과 공유 DB 부하 감소</h3>
              <p>
                목록과 전체 건수를 <code>COUNT(*) OVER()</code>로 함께 구하자 같은 후보를 다시 읽는
                스캔과 DB 왕복을 줄일 수 있었습니다. 400연결 비교에서 주문 p95도 565ms에서 240ms로
                줄었습니다. 공유 DB 자원의 사용을 줄인 효과입니다.
              </p>
              <p>
                빈 첫 페이지는 0건으로, 범위를 벗어난 페이지는 별도 count로 처리했습니다. 정렬·필터
                14개 조합의 실행 계획과 전체 건수를 비교했습니다. 다만 전후 부하 측정은 각 1회였고,
                개선 후 목록 p95 202ms는 기준인 200ms를 넘었습니다.
              </p>
            </section>

            <section id="burst">
              <h2>04. 빨라진 조회가 다시 몰렸습니다: 목록만 빼고 측정했습니다</h2>
              <p>
                메모리 캐시를 적용하자 1,000연결의 상세 p95는 2,496→573ms, 주문은 3,094→1,302ms로
                줄었습니다. 그러나 목록은 875ms였고, 150연결에서도 목록 206ms로 기준을 넘었습니다.
                조회 하나의 비용을 낮춘 것만으로는 목표에 도달하지 못했습니다.
              </p>
              <p>
                목록이 다른 요청을 기다리게 하는지 확인하려고 400연결에서 SSE 구독과 전송은 유지하고
                목록 HTTP 재조회만 껐습니다. 목록 구독 자체를 없애면 알림 수와 구독 상품도
                달라지므로, 그 실험과 구분했습니다.
              </p>
              <div className="grab-table-scroll">
                <table>
                  <caption>
                    목록 HTTP만 제거한 대조 실험 · memory-tc-400 ↔ memory-nolisthttp-400
                  </caption>
                  <thead>
                    <tr>
                      <th>지표</th>
                      <th>목록 포함</th>
                      <th>목록 HTTP 제외</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>주문 p95</th>
                      <td>630ms</td>
                      <td>44ms</td>
                    </tr>
                    <tr>
                      <th>상세 / 재고 p95</th>
                      <td>326 / 267ms</td>
                      <td>30 / 16ms</td>
                    </tr>
                    <tr>
                      <th>Hikari 대기 최대</th>
                      <td>91</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th>DB CPU 평균</th>
                      <td>37%</td>
                      <td>7%</td>
                    </tr>
                    <tr>
                      <th>재조회 요청/초</th>
                      <td>340</td>
                      <td>280</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                목록을 빼자 주문과 상세도 함께 회복됐습니다. 다만 요청량도 줄어든 실험이므로
                이것만으로 최종 원인을 확정하지 않았습니다. DB 지연을 0으로 바꿔도 목록 p95는 674ms,
                풀을 20으로 늘려도 637ms였습니다. DB CPU를 2개로 늘린 회차에서는 187ms로
                내려갔습니다. 자원 증설 대신, 제한된 DB 자원을 왜 한꺼번에 점유하는지 추적했습니다.
              </p>
              <h3>목록 쿼리를 줄였는데도 400연결은 경계였습니다</h3>
              <p>
                목록 서비스 호출 평균 188.7ms 중 저장소 호출은 34.1ms, 변환은 0.2ms였습니다. 나머지
                약 154ms에는 커넥션 획득과 트랜잭션 비용이 포함됐습니다. 앞서 설명한 count 통합으로
                저장소 호출을 14.6ms까지 줄였지만, 후속 재측정에서 목록 p95가 236ms로 다시 기준을
                넘었습니다. 쿼리 개선만으로 해결됐다고 결론 내릴 수 없었습니다.
              </p>
              <h3>평균 340건/초는 같아도, 도착 분포는 달랐습니다</h3>
              <p>
                목록 HTTP 요청만 제외하자 주문과 상세도 빨라졌습니다. 처음에는 목록 자체가
                주원인이라고 봤습니다. 하지만 초기 코드와 개선 코드를 CPU 제한·DB 지연 조건별로
                비교하면서, 알림 전달 속도가 후속 요청을 한순간에 모으고 있다는 것을 발견했습니다.
              </p>
              <div className="grab-table-scroll">
                <table>
                  <caption>400연결 · DB CPU 1개 · 지연 주입 2.5ms</caption>
                  <thead>
                    <tr>
                      <th scope="col">관측 지표</th>
                      <th scope="col">초기 코드</th>
                      <th scope="col">
                        개선 코드
                        <br />
                        (분산 전)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">280개 상세 연결에 알림이 퍼지는 시간 p50</th>
                      <td>982ms</td>
                      <td>8ms</td>
                    </tr>
                    <tr>
                      <th scope="row">100ms당 재조회 중앙값 / 최대</th>
                      <td>35 / 56건</td>
                      <td>0 / 388건</td>
                    </tr>
                    <tr>
                      <th scope="row">초당 평균 재조회</th>
                      <td>약 340건</td>
                      <td>약 340건</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                초기 코드는 SSE를 보낼 때 연결마다 상품 공개 여부를 DB에서 다시 확인했습니다. 그
                불필요한 조회 때문에 알림과 재조회가 약 1초에 걸쳐 흩어졌습니다. 반복 확인을 없애자
                알림은 거의 동시에 도착했고, 재조회도 한꺼번에 몰렸습니다.
              </p>

              <p>
                평균 CPU나 평균 요청량만으로는 짧은 포화를 설명하기 어려웠습니다. 100ms 단위
                요청량과 커넥션 대기, Tomcat의 실제 요청 처리 스레드를 함께 확인했습니다.
              </p>
            </section>

            <section id="jitter">
              <h2>05. 원인에 맞춘 해결: 요청이 서버에 도착하기 전에 분산</h2>
              <p>
                변경 알림을 받은 화면이 0~1초 범위에서 무작위로 기다린 뒤 재조회하도록 했습니다. 이
                무작위 간격을 jitter라고 부릅니다. 브라우저가 요청을 보내기 전에 기다리므로 서버
                스레드나 DB 연결을 잡고 있지 않습니다.
              </p>
              <div className="grab-timing-figure">
                <div>
                  <b>분산 전</b>
                  <p>알림 도착 → 여러 화면이 즉시 요청 → 서버에서 대기</p>
                </div>
                <div>
                  <b>분산 후</b>
                  <p>알림 도착 → 화면마다 짧게 기다림 → 요청을 시간에 나눠 처리</p>
                </div>
                <small>동작 원리를 설명한 도식이며 실제 요청 분포 그래프는 아닙니다.</small>
              </div>
              <p>
                첫 알림에만 조회를 예약하고, 그 사이 도착한 알림은 합쳤습니다. 추가 알림이 와도
                예약을 계속 뒤로 미루지 않습니다. 대기 시간은 기존 2초 간격의 남은 시간과 무작위
                대기 중 긴 쪽을 사용하되, 첫 변경 신호 이후 최대 대기 규칙 안으로 제한했습니다. 긴급
                조회에는 무작위 대기를 넣지 않았습니다.
              </p>
              <p>
                400연결에서 분산 유무를 교차 측정했을 때 총 재조회는 약 6.1만 건으로 유지됐지만,
                주문 p95는 288~290ms에서 약 42ms로 줄었습니다. 조회를 생략한 결과가 아니라 도착
                시점을 바꾼 효과였습니다.
              </p>
              <div className="grab-table-scroll">
                <table>
                  <caption>400연결 교차 검증: 분산 없음 → 있음 → 없음 → 있음</caption>
                  <thead>
                    <tr>
                      <th>회차</th>
                      <th>상세 / 재고 / 목록 p95</th>
                      <th>주문 p95</th>
                      <th>100ms당 최대 요청</th>
                      <th>커넥션 대기 최대</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>없음 1</th>
                      <td>253 / 225 / 243ms</td>
                      <td>290ms</td>
                      <td>388</td>
                      <td>81</td>
                    </tr>
                    <tr>
                      <th>있음 1</th>
                      <td>19 / 7 / 12ms</td>
                      <td>42ms</td>
                      <td>82</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th>없음 2</th>
                      <td>176 / 160 / 252ms</td>
                      <td>288ms</td>
                      <td>670</td>
                      <td>61</td>
                    </tr>
                    <tr>
                      <th>있음 2</th>
                      <td>20 / 8 / 12ms</td>
                      <td>42ms</td>
                      <td>104</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                분산을 켜고 끄는 순서를 반복해 같은 방향의 결과를 확인했습니다. 초당 평균 요청량보다
                짧은 구간의 도착 밀도가 공유 자원 대기를 설명했습니다. 단, 알림 수신 퍼짐은 회차에
                따라 흔들려 보조 지표로만 사용했습니다.
              </p>
              <h3>트레이드오프: 자동 갱신 대기 시간</h3>
              <p>
                사용자가 적거나 변경이 드물면 즉시 할 수 있던 자동 갱신이 최대 1초 늦어질 수
                있습니다. 이번 지속 부하에서는 기존 2초 간격 제한과 대기가 겹쳐 전체 갱신 지연 p95가
                약 2.6초로 유지됐습니다. 모든 트래픽에서 체감 지연이 같다는 보장은 아닙니다.
              </p>
            </section>

            <section id="result">
              <h2>06. 서비스 적용 후 목표를 다시 검증했습니다</h2>
              <GrabPerformanceSummary detailed />
              <PerformanceComparison />
              <p>
                측정 클라이언트에서 확인한 예약 규칙을 실제 상세·목록 SSE 훅과 명세에 반영했습니다.
                Chromium 20개 독립 탭에서는 같은 100ms에 몰린 재고 조회의 최대 수가 20건에서 6건으로
                줄었고, 모든 화면의 재고 표시가 갱신됐습니다.
              </p>
              <p>
                이후 프론트와 같은 규칙의 부하 클라이언트로 최종 1,000연결을 측정했습니다. 실제
                브라우저 1,000개를 띄운 실험과는 구분했습니다.
              </p>
              <div className="grab-table-scroll">
                <table>
                  <caption>최종 1,000연결 · 주문 50건/초 · 180초 회차</caption>
                  <thead>
                    <tr>
                      <th scope="col">지표</th>
                      <th scope="col">결과</th>
                      <th scope="col">기준</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">상세 / 재고 / 목록 p95</th>
                      <td>
                        <strong>21 / 9 / 16ms</strong>
                      </td>
                      <td>각 200ms 이하</td>
                    </tr>
                    <tr>
                      <th scope="row">주문 p95</th>
                      <td>
                        <strong>42ms</strong>
                      </td>
                      <td>500ms 이하</td>
                    </tr>
                    <tr>
                      <th scope="row">재조회 HTTP 오류</th>
                      <td>0 / 152,740건</td>
                      <td>1% 미만</td>
                    </tr>
                    <tr>
                      <th scope="row">주문 응답 수신 → 재조회 완료 p95</th>
                      <td>2.60초</td>
                      <td>갱신 지연의 근사 지표</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                최신성 검증 표본에서 오래된 재고값은 검출되지 않았습니다. 알림 집계에서는 놓친 알림
                0건과 판정이 불확실한 1쌍을 구분해 남겼습니다. 브라우저 검증은 요청 분산과 화면 갱신
                확인이며, 표시값과 동시점 DB 값을 대조한 결과는 아닙니다.
              </p>
              <details className="grab-limitations">
                <summary>이 결과로 말할 수 있는 범위</summary>
                <ul>
                  <li>
                    최종 1,000연결 회차는 1회입니다. 장시간 안정성이나 운영 최대 수용량을 확정하지
                    않습니다.
                  </li>
                  <li>
                    DB CPU 1개는 로컬 제한 조건입니다. Supabase 무료 환경의 고정 CPU 보장을 뜻하지
                    않습니다.
                  </li>
                  <li>
                    갱신 지연은 주문 응답 수신부터 HTTP 재조회 완료까지입니다. 실제 DB 커밋 시각이나
                    브라우저 렌더링 시간은 아닙니다.
                  </li>
                  <li>
                    Tomcat busy 200과 커넥션 대기 최대 47이 관측됐습니다. 모든 순간 대기가 없어진
                    것은 아닙니다.
                  </li>
                  <li>
                    최종 정책의 1,500연결 탐색은 DB CPU 최대 102%와 미시작 주문 2건이 있어 안정적인
                    처리 용량으로 제시하지 않았습니다.
                  </li>
                </ul>
              </details>
            </section>

            <section id="decision">
              <h2>07. 배운 점과 다음 개선의 기준</h2>
              <h3>국소적인 최적화가 다음 단계의 부하 형태를 바꿉니다</h3>
              <p>
                SSE 전송의 불필요한 DB 조회를 없앤 것은 필요한 개선이었습니다. 하지만 빨라진 알림이
                후속 조회를 동시에 발생시켰습니다. 이후에는 SQL 하나의 속도뿐 아니라 이벤트 전달 →
                클라이언트 요청 → 공유 DB 대기까지 한 흐름으로 검증해야 한다는 기준을 얻었습니다.
              </p>
              <h3>가설은 변수를 하나씩 바꿔 확인합니다</h3>
              <p>
                목록 HTTP만 제거하고, DB 지연·CPU·풀 크기를 각각 바꾸고, 분산 적용을 교차
                반복했습니다. 처음의 “목록이 병목”이라는 관측은 “동시 도착한 재조회가 공유 자원을
                압박하고 목록이 크게 기여한다”로 정교해졌습니다. 평균 CPU가 낮아도 순간적인 포화가
                있을 수 있어 100ms 구간 요청량과 대기를 함께 봤습니다.
              </p>
              <h3>빠른 응답과 최신 정보 전달을 함께 봅니다</h3>
              <p>
                바닐라 1,000연결은 목록 p95 97ms만 보면 통과처럼 보이지만, 알림 전달이 4.27초로
                기준을 넘었습니다. 최종 코드는 알림 0.99초와 목록 16ms를 함께 달성했습니다. 응답
                속도만 최적화하지 않도록 재고 최신성 검사와 주문 정합성 확인도 유지했습니다.
              </p>
              <h3>목표를 충족한 뒤 목록 캐시는 보류했습니다</h3>
              <p>
                최종 회차에서 목록은 캐시 없이 p95 16ms로 기준을 충족했습니다. 추가 캐시의 이득보다
                갱신 규칙을 늘리는 비용을 먼저 따졌습니다.
              </p>
              <p>
                상세는 상품 하나가 바뀌면 해당 키를 지울 수 있습니다. 목록은 검색어·정렬·품절
                여부·페이지마다 키가 달라집니다. 재고가 소진되면 포함 여부와 총건수가, 결제나 WISH가
                바뀌면 순위와 페이지 구성이 바뀔 수 있습니다.
              </p>
              <div className="grab-table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">선택지</th>
                      <th scope="col">남는 비용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">모든 목록 캐시 삭제</th>
                      <td>변경이 잦으면 캐시를 재사용할 기회가 줄어듦</td>
                    </tr>
                    <tr>
                      <th scope="row">영향받는 목록만 삭제</th>
                      <td>조건별로 영향 범위를 관리해야 함</td>
                    </tr>
                    <tr>
                      <th scope="row">짧은 TTL로 갱신</th>
                      <td>품절·순위·총건수가 얼마나 늦게 반영돼도 되는지 합의 필요</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                목록 캐시가 효과 없다는 결론은 아닙니다. 현재 목표를 충족한 만큼 보류했고, 데이터와
                지속 조회량이 늘면 첫 페이지나 인기 목록부터 비용과 적중률을 다시 측정하기로
                했습니다. 동일 목록 요청 합치기와 주문 경로의 추가 최적화도 같은 기준으로 남겨
                두었습니다.
              </p>
              <h3>무효 실험 제외와 측정 조건 검증</h3>
              <p>
                실험 도중 컨테이너 재생성으로 DB CPU 제한과 지연 설정이 달라진 회차를 발견해 다시
                측정했습니다. 목록 count 통합 유무를 비교하려던 회차도 두 이미지에 같은 변경이 들어
                있어 무효로 처리했습니다. 따라서 “jitter가 있으면 쿼리 개선은 효과가 없다”는 결론은
                내리지 않았습니다.
              </p>
            </section>

            <footer className="grab-article-sources">
              <h2>구현과 측정 기록</h2>
              <p>재현 조건과 회차별 수치, 제한 사항은 저장소의 결과 문서에 남겼습니다.</p>
              <a
                href={`${sourceRoot}/blob/main/Backend/k6/scenarios/sse-stream/result-refetch.md`}
                target="_blank"
                rel="noopener noreferrer"
              >
                통합 재조회 실험 기록 <ArrowUpRight size={15} />
              </a>
              <a href={`${sourceRoot}/pull/215`} target="_blank" rel="noopener noreferrer">
                목록 count 통합 PR #215 <ArrowUpRight size={15} />
              </a>
              <a href={`${sourceRoot}/pull/220`} target="_blank" rel="noopener noreferrer">
                프론트 재조회 분산 PR #220 <ArrowUpRight size={15} />
              </a>
              <a href={`${sourceRoot}/pull/213`} target="_blank" rel="noopener noreferrer">
                운영 모사 환경 PR #213 · 82399011
              </a>
              <a href={`${sourceRoot}/pull/199`} target="_blank" rel="noopener noreferrer">
                SSE 반복 조회 제거 PR #199 · e6d7e6db
              </a>
              <a href={`${sourceRoot}/pull/206`} target="_blank" rel="noopener noreferrer">
                상세·재고 캐시 PR #206 · b2960f41
              </a>
              <a href={`${sourceRoot}/pull/214`} target="_blank" rel="noopener noreferrer">
                통합 부하 측정 PR #214 · 5e77bcca
              </a>
              <a href={`${sourceRoot}/pull/216`} target="_blank" rel="noopener noreferrer">
                순간 집중 원인 분석 PR #216 · f0829bde
              </a>
              <a className="grab-return" href="/projects/grab">
                <ArrowLeft size={16} /> GRAB 프로젝트로 돌아가기
              </a>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}
