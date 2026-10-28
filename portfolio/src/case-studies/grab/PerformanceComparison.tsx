import { useId, useState } from 'react';
import { comparisonMetrics, performanceComparison, type MetricKey } from './performanceData';

export function PerformanceComparison() {
  const [metric, setMetric] = useState<MetricKey>('delivery');
  const id = useId();
  const { points, conditions, notes } = performanceComparison;
  if (!points.length) {
    return (
      <aside className="grab-comparison-pending">
        <h3>연결 수별 개선 전후 비교</h3>
        <p>
          200 · 400 · 600 · 800 · 1000 연결별 비교를 측정 중입니다. 검증한 결과를 받은 뒤 이곳에
          응답시간 그래프를 추가합니다. 아래의 기존 실험 결과와는 별도로 비교합니다.
        </p>
      </aside>
    );
  }
  const selected = comparisonMetrics.find((item) => item.key === metric)!;
  const sorted = [...points].sort((a, b) => a.connections - b.connections);
  const max =
    Math.ceil(
      Math.max(selected.target, ...sorted.flatMap((p) => [p.vanilla[metric], p.current[metric]])) /
        100,
    ) * 100;
  const first = sorted[0].connections;
  const span = sorted[sorted.length - 1].connections - first || 1;
  const x = (connections: number) => 62 + ((connections - first) / span) * 600;
  const y = (value: number) => 260 - (value / max) * 222;
  return (
    <figure className="grab-chart">
      <figcaption>
        <h3>연결 수별 알림 전달·재조회 지연 비교</h3>
        <p>{conditions}</p>
      </figcaption>
      <div className="grab-chart-controls" aria-label="비교할 응답시간">
        {comparisonMetrics.map((item) => (
          <button
            key={item.key}
            aria-pressed={metric === item.key}
            onClick={() => setMetric(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="grab-chart-legend">
        <span>— 개선 전</span>
        <span>━ 최종 코드 + 재조회 분산</span>
      </div>
      <svg viewBox="0 0 710 310" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{selected.label} p95 비교</title>
        <desc id={`${id}-desc`}>
          가로축은 SSE 연결 수, 세로축은 밀리초입니다. 정확한 값은 아래 표에서 확인할 수 있습니다.
        </desc>
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <g key={ratio}>
            <line x1="62" x2="662" y1={y(max * ratio)} y2={y(max * ratio)} stroke="#dedfd7" />
            <text x="52" y={y(max * ratio) + 4} textAnchor="end">
              {max * ratio}
            </text>
          </g>
        ))}
        <text x="12" y="18">
          p95 (ms)
        </text>
        <line
          x1="62"
          x2="662"
          y1={y(selected.target)}
          y2={y(selected.target)}
          stroke="#a05830"
          strokeDasharray="3 5"
        />
        <text x="660" y={y(selected.target) - 7} textAnchor="end">
          기준 {selected.target}ms
        </text>
        {(['vanilla', 'current'] as const).map((version) => (
          <g key={version}>
            <polyline
              fill="none"
              stroke={version === 'current' ? '#4b6900' : '#8872a4'}
              strokeWidth="3"
              strokeDasharray={version === 'vanilla' ? '7 5' : undefined}
              points={sorted.map((p) => `${x(p.connections)},${y(p[version][metric])}`).join(' ')}
            />
            {sorted.map((p) => (
              <circle
                key={p.connections}
                cx={x(p.connections)}
                cy={y(p[version][metric])}
                r="4"
                fill={version === 'current' ? '#4b6900' : '#8872a4'}
              >
                <title>
                  {p.connections} 연결 · {version === 'current' ? '최종' : '개선 전'}:{' '}
                  {p[version][metric]}ms
                </title>
              </circle>
            ))}
          </g>
        ))}
        {sorted.map((p) => (
          <text key={p.connections} x={x(p.connections)} y="282" textAnchor="middle">
            {p.connections}
          </text>
        ))}
        <text x="662" y="306" textAnchor="end">
          SSE 연결 수
        </text>
      </svg>
      <details>
        <summary>측정값 표로 보기 · {selected.label}</summary>
        <div className="grab-table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">연결 수</th>
                <th scope="col">개선 전 p95</th>
                <th scope="col">최종 p95</th>
                <th scope="col">개선 전 재조회/초</th>
                <th scope="col">최종 재조회/초</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.connections}>
                  <th scope="row">{p.connections}</th>
                  <td>{p.vanilla[metric]}ms</td>
                  <td>{p.current[metric]}ms</td>
                  <td>{p.vanillaRps}</td>
                  <td>{p.currentRps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <p>
        바닐라는 800연결부터 알림 전달 기준을 초과했습니다. 알림이 늦어 재조회량도 약 440건/초에
        머물렀으므로, HTTP p95만으로 처리 용량을 비교하지 않습니다. 현재 코드는 1000연결에서
        848.6건/초를 처리했고, 2000연결에서는 재조회·주문 기준을 초과했습니다.
      </p>
      <p>
        문서상 기준 충족 단계는 바닐라 600연결, 현재 1500연결입니다. 다만 1500연결에는 미시작 주문
        2건과 DB CPU 포화가 있어 경계 결과로 구분하며 안정적인 최대 수용량으로 제시하지 않습니다.
      </p>
      <p className="grab-note">{notes}</p>
    </figure>
  );
}
