import { useEffect, useState } from 'react';
import { Layers, Play, RotateCcw } from 'lucide-react';

type FlowSimulationProps = {
  title: string;
  flow: string[];
};

export function FlowSimulation({ title, flow }: FlowSimulationProps) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(
      () =>
        setStep((s) => {
          if (s === 4) {
            setPlaying(false);
            return s;
          }
          return s + 1;
        }),
      800,
    );
    return () => clearInterval(timer);
  }, [playing]);

  return (
    <div className="simulation">
      <div className="sim-heading">
        <h3>{title}</h3>
        <span>0{step + 1} / 05</span>
      </div>
      <div className="flow">
        {flow.map((s, i) => (
          <button
            key={s}
            onClick={() => {
              setStep(i);
              setPlaying(false);
            }}
            className={i === step ? 'current' : i < step ? 'done' : ''}
          >
            <span>0{i + 1}</span>
            <Layers size={22} />
            <b>{s}</b>
          </button>
        ))}
      </div>
      <div className="sim-footer">
        <p>구조를 설명하는 예시입니다.</p>
        <div>
          <button
            aria-label="초기화"
            onClick={() => {
              setStep(0);
              setPlaying(false);
            }}
          >
            <RotateCcw size={17} />
          </button>
          <button
            className="play"
            disabled={playing}
            onClick={() => {
              setStep(0);
              setPlaying(true);
            }}
          >
            <Play size={14} />
            {playing ? 'Playing…' : 'Try the flow'}
          </button>
        </div>
      </div>
    </div>
  );
}
