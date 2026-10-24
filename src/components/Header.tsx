import { FileDown, Plus } from 'lucide-react';
import { StarIcon } from './StarIcon';

type HeaderProps = {
  about: boolean;
  onToggleAbout: () => void;
  printing: boolean;
  onPrint: () => void;
  go: (url: string) => void;
};

export function Header({ about, onToggleAbout, printing, onPrint, go }: HeaderProps) {
  return (
    <header>
      <a
        href="/"
        className="brand"
        onClick={(e) => {
          e.preventDefault();
          go('/');
        }}
      >
        jinwoo
        <StarIcon className="brand-star" />
      </a>
      <nav>
        <button onClick={onPrint} disabled={printing} aria-label="포트폴리오 전체 PDF 저장">
          PDF <FileDown size={14} />
        </button>
        <button onClick={onToggleAbout} aria-expanded={about}>
          {about ? 'Close' : 'About me'} <Plus size={14} className={about ? 'rotated' : ''} />
        </button>
      </nav>
    </header>
  );
}
