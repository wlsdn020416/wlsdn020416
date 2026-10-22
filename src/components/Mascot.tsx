export function Mascot({ mini = false }: { mini?: boolean }) {
  return (
    <div className={`mascot ${mini ? 'mini' : ''}`} aria-hidden="true">
      <div className="antenna" />
      <div className="head">
        <div className="eyes">
          <i />
          <i />
        </div>
        <div className="smile" />
        <span className="cheek left" />
        <span className="cheek right" />
      </div>
      <div className="foot f1" />
      <div className="foot f2" />
      <span className="spark s1">✳</span>
      <span className="spark s2">✦</span>
    </div>
  );
}
