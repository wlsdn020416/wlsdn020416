import { ArrowLeft } from 'lucide-react';

export function NotFoundPage({ go }: { go: (url: string) => void }) {
  return (
    <main className="not-found">
      <h1>
        Wrong turn.
        <br />
        Right place.
      </h1>
      <button onClick={() => go('/')}>
        <ArrowLeft /> 홈으로 돌아가기
      </button>
    </main>
  );
}
