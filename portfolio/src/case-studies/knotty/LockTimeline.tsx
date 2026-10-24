type Row = { who: 'A' | 'B'; text: string; result?: 'ok' | 'fail' | 'wait' };

const before: Row[] = [
  { who: 'A', text: '거래 조회 — PENDING' },
  { who: 'B', text: '거래 조회 — PENDING' },
  { who: 'A', text: '잔액 차감, PAID 변경' },
  { who: 'B', text: '잔액 차감, PAID 변경', result: 'fail' },
];

const after: Row[] = [
  { who: 'A', text: '거래 행 잠금 — PENDING' },
  { who: 'B', text: '같은 행 잠금 요청', result: 'wait' },
  { who: 'A', text: '잔액 차감, PAID 변경, 커밋' },
  { who: 'B', text: '잠금 획득 — PAID 확인 후 거절', result: 'ok' },
];

function Column({ title, rows, note }: { title: string; rows: Row[]; note: string }) {
  return (
    <div className="lock-col">
      <h4>{title}</h4>
      <ol>
        {rows.map((r, i) => (
          <li key={i} className={`who-${r.who} ${r.result ? `is-${r.result}` : ''}`}>
            <span className="lock-who">{r.who}</span>
            <span>{r.text}</span>
          </li>
        ))}
      </ol>
      <p>{note}</p>
    </div>
  );
}

export function LockTimeline() {
  return (
    <div className="lock-timeline">
      <Column
        title="잠금 없음"
        rows={before}
        note="두 요청 모두 변경 전 상태를 읽어 중복 결제가 발생할 수 있습니다."
      />
      <Column
        title="PESSIMISTIC_WRITE"
        rows={after}
        note="먼저 잠근 트랜잭션이 커밋할 때까지 다음 요청은 대기합니다."
      />
    </div>
  );
}
