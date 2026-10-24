// ✳ 문자는 모바일에서 이모티콘으로 바뀌어 보이므로 SVG로 그린다. 크기는 font-size(1em)를 따른다.
export function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    >
      <path d="M12 2.5v19M2.5 12h19M5.2 5.2l13.6 13.6M18.8 5.2 5.2 18.8" />
    </svg>
  );
}
