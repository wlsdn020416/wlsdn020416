import { useState } from 'react';

type Lane = 0 | 1 | 2;

type Step = {
  from: Lane;
  to: Lane;
  label: string;
  detail?: string;
};

type Scenario = {
  id: string;
  title: string;
  steps: Step[];
};

const LANES = ['Browser', 'Spring Boot', 'Redis'];

const scenarios: Scenario[] = [
  {
    id: 'login',
    title: '로그인',
    steps: [
      { from: 0, to: 1, label: 'POST /auth/login', detail: 'X-XSRF-TOKEN 헤더' },
      { from: 1, to: 1, label: '비밀번호 검증, JWT 발급' },
      { from: 1, to: 2, label: 'SET refresh:{userId}', detail: 'TTL 14일' },
      { from: 1, to: 0, label: 'Set-Cookie', detail: 'accessToken, refreshToken' },
    ],
  },
  {
    id: 'request',
    title: '인증 요청',
    steps: [
      { from: 0, to: 1, label: 'GET /users/me', detail: 'Cookie: accessToken' },
      { from: 1, to: 1, label: 'JwtFilter', detail: '토큰 검증 후 SecurityContext 설정' },
      { from: 1, to: 0, label: '200 OK' },
    ],
  },
  {
    id: 'refresh',
    title: '토큰 재발급',
    steps: [
      { from: 0, to: 1, label: 'API 요청', detail: '만료된 accessToken' },
      { from: 1, to: 0, label: '401' },
      { from: 0, to: 1, label: 'POST /auth/refresh', detail: 'Cookie: refreshToken' },
      { from: 1, to: 2, label: 'GET refresh:{userId}', detail: '저장된 값과 비교' },
      { from: 1, to: 0, label: 'Set-Cookie', detail: '새 accessToken' },
      { from: 0, to: 1, label: '원래 요청 재시도', detail: '1회' },
    ],
  },
];

function SequenceStep({ step }: { step: Step }) {
  const start = Math.min(step.from, step.to);
  const span = Math.abs(step.to - step.from) + 1;
  const self = step.from === step.to;
  const direction = step.to > step.from ? 'right' : 'left';

  return (
    <li
      className={`seq-step ${self ? 'is-self' : `is-${direction}`}`}
      style={{ gridColumn: `${start + 1} / span ${span}`, ['--span' as string]: span }}
    >
      <span className="seq-label">{step.label}</span>
      {step.detail && <span className="seq-detail">{step.detail}</span>}
      {!self && <span className="seq-arrow" aria-hidden="true" />}
    </li>
  );
}

export function AuthSequence() {
  const [active, setActive] = useState(scenarios[0].id);

  return (
    <div className="seq">
      <div className="seq-tabs" role="tablist" aria-label="인증 시나리오">
        {scenarios.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === active}
            className={s.id === active ? 'is-active' : ''}
            onClick={() => setActive(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>
      {/* 인쇄에서는 탭을 누를 수 없으므로 모든 시나리오를 렌더링하고, 화면에서만 선택된 것 외에는 숨긴다. */}
      {scenarios.map((scenario) => (
        <div
          key={scenario.id}
          role="tabpanel"
          className={`seq-board${scenario.id === active ? ' is-active' : ''}`}
        >
          <p className="seq-title">{scenario.title}</p>
          <div className="seq-lanes" aria-hidden="true">
            {LANES.map((lane) => (
              <span key={lane}>{lane}</span>
            ))}
          </div>
          <ol className="seq-steps">
            {scenario.steps.map((step, i) => (
              <SequenceStep key={i} step={step} />
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
