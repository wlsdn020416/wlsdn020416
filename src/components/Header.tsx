import { Plus } from 'lucide-react';

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
        jinwoo<span className="brand-star">✳</span>
      </a>
      <nav>
        <button onClick={onToggleAbout} aria-expanded={about}>
          {about ? 'Close' : 'About me'} <Plus size={14} className={about ? 'rotated' : ''} />
        </button>
      </nav>
    </header>
  );
}
