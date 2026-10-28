import { performanceComparison, type MetricKey } from './performanceData';

const metrics: { key: MetricKey; label: string; unit: string; divisor: number }[] = [
  { key: 'list', label: '목록 재조회 p95', unit: 'ms', divisor: 1 },
  { key: 'order', label: '주문 응답 p95', unit: 'ms', divisor: 1 },
  { key: 'delivery', label: '알림 전달 p95', unit: '초', divisor: 1000 },
  { key: 'completion', label: '주문 응답 수신 → 재조회 완료 p95', unit: '초', divisor: 1000 },
];

export function GrabPerformanceSummary({ detailed = false }: { detailed?: boolean }) {
  const point = performanceComparison.points.find((row) => row.connections === 1000);
  if (!point) return null;
  const rows = metrics.map((metric) => ({
    ...metric,
    before: point.vanilla[metric.key] / metric.divisor,
    after: point.current[metric.key] / metric.divisor,
    reduction: ((1 - point.current[metric.key] / point.vanilla[metric.key]) * 100).toFixed(1),
  }));
  return (
    <>
      {detailed ? (
        <div className="grab-table-scroll">
          <table>
            <caption>동일 1,000연결·주문 50건/초 조건의 바닐라 대비 개선율</caption>
            <thead>
              <tr>
                <th scope="col">지표</th>
                <th scope="col">개선 전</th>
                <th scope="col">개선 후</th>
                <th scope="col">감소율</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <th scope="row">{row.label}</th>
                  <td>
                    {row.before}
                    {row.unit}
                  </td>
                  <td>
                    {row.after}
                    {row.unit}
                  </td>
                  <td>
                    <strong>{row.reduction}%</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grab-metrics">
          {rows.slice(0, 3).map((row) => (
            <div key={row.key}>
              <strong>
                {row.reduction}
                <span>% 감소</span>
              </strong>
              <p>{row.label}</p>
              <p>
                {row.before} → {row.after}
                {row.unit}
              </p>
            </div>
          ))}
        </div>
      )}
      <p className="grab-note">
        SSE 1,000연결·주문 50건/초. DB CPU 1개·512MiB, 앱 CPU 2개·1GiB, DB 왕복 약 3.2ms. 바닐라와
        개선 후 각 1회 측정이며 SQL·캐시·재조회 분산을 포함한 전체 변경의 비교입니다. 안정적인 운영
        최대 수용량을 의미하지 않습니다.
      </p>
      {detailed && (
        <p>
          감소율은 (개선 전 − 개선 후) ÷ 개선 전으로 계산했습니다. 실제 재조회량은 초당{' '}
          {point.vanillaRps}건에서 {point.currentRps}건으로 늘었습니다. 알림 전달 속도에 따라
          발생량이 달라지므로 이를 서버 최대 처리량의 증가율로 표현하지 않습니다.
        </p>
      )}
    </>
  );
}
