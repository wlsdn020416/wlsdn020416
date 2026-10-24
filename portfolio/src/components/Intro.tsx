import { Mascot } from './Mascot';

export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <Mascot />
      <div className="loading-line" />
    </div>
  );
}
