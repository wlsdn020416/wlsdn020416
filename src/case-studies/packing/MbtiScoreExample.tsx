// mbtiScorer.js와 같은 계산: 8축 50점 시작 → 규칙 가중치를 축(+)과 반대 축(−)에 적용 → 0~100 보정 → 4축 평균
type Axis = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

const OPPOSITE: Record<Axis, Axis> = {
  E: 'I',
  I: 'E',
  S: 'N',
  N: 'S',
  T: 'F',
  F: 'T',
  J: 'P',
  P: 'J',
};
const PAIRS: [Axis, Axis][] = [
  ['E', 'I'],
  ['S', 'N'],
  ['T', 'F'],
  ['J', 'P'],
];

// 예시: 해변이 있는 관광지 (mbtiRules.js의 실제 규칙 값)
const rules: { label: string; axes: Partial<Record<Axis, number>> }[] = [
  { label: '콘텐츠 유형 12 (관광지)', axes: { I: 8, N: 5, F: 6, P: 3 } },
  { label: "텍스트 '해변'", axes: { I: 5, N: 6, F: 10, P: 4 } },
];

function computeAxes() {
  const axes = { E: 50, I: 50, S: 50, N: 50, T: 50, F: 50, J: 50, P: 50 } as Record<Axis, number>;
  rules.forEach((rule) =>
    Object.entries(rule.axes).forEach(([axis, w]) => {
      axes[axis as Axis] += w!;
      axes[OPPOSITE[axis as Axis]] -= w!;
    }),
  );
  (Object.keys(axes) as Axis[]).forEach(
    (a) => (axes[a] = Math.max(0, Math.min(100, Math.round(axes[a])))),
  );
  return axes;
}

const axes = computeAxes();
const types = PAIRS.reduce<string[]>(
  (acc, [a, b]) => acc.flatMap((prefix) => [prefix + a, prefix + b]),
  [''],
)
  .map((type) => ({
    type,
    score: (type.split('') as Axis[]).reduce((sum, a) => sum + axes[a], 0) / 4,
  }))
  .sort((x, y) => y.score - x.score);

const shown = [...types.slice(0, 3), types[types.length - 1]];

export function MbtiScoreExample() {
  return (
    <div className="mbti-example">
      <div className="mbti-rules">
        <span className="mbti-caption">예시 · 해변이 있는 관광지</span>
        {rules.map((r) => (
          <p key={r.label}>
            <b>{r.label}</b>
            <code>
              {Object.entries(r.axes)
                .map(([a, w]) => `${a}+${w}`)
                .join(' ')}
            </code>
          </p>
        ))}
      </div>

      <div className="mbti-axes">
        {PAIRS.map(([left, right]) => (
          <div key={left} className="mbti-axis">
            <span>
              {left} {axes[left]}
            </span>
            <div className="mbti-bar" aria-hidden="true">
              <i style={{ width: `${axes[left]}%` }} />
            </div>
            <span>
              {axes[right]} {right}
            </span>
          </div>
        ))}
      </div>

      <ol className="mbti-types">
        {shown.map((t, i) => (
          <li key={t.type} className={i === shown.length - 1 ? 'is-last' : ''}>
            <span>{i === shown.length - 1 ? '16' : i + 1}</span>
            <code>{t.type}</code>
            <b>{t.score.toFixed(2)}</b>
          </li>
        ))}
      </ol>
    </div>
  );
}
