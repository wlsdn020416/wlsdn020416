export type Step = {
  title: string;
  where: string;
  body: string;
  /** 단계 이름 옆에 붙는 작은 표시 (예: LLM) */
  tag?: string;
};

export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="pipeline">
      {steps.map((step, i) => (
        <li key={step.title}>
          <span className="pipeline-no">{i + 1}</span>
          <div>
            <h4>
              {step.title}
              {step.tag && <span className="pipeline-tag">{step.tag}</span>}
            </h4>
            <code>{step.where}</code>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
