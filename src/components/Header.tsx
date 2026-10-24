import { Plus } from 'lucide-react';
import { StarIcon } from './StarIcon';

type HeaderProps = {
  about: boolean;
  onToggleAbout: () => void;
  go: (url: string) => void;
};

export function Header({ about, onToggleAbout, go }: HeaderProps) {
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
        <button onClick={onToggleAbout} aria-expanded={about}>
          {about ? 'Close' : 'About me'} <Plus size={14} className={about ? 'rotated' : ''} />
        </button>
      </nav>
    </header>
  );
}
