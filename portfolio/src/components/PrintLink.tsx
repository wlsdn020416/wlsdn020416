import QRCode from 'qrcode';
import { useMemo } from 'react';

/** 인쇄물에만 나오는 온라인 포트폴리오 주소와 QR 코드. 배포된 도메인을 그대로 가리킨다. */
export function PrintLink() {
  const url = `${location.origin}/`;
  const { size, path } = useMemo(() => {
    const { modules } = QRCode.create(url, { errorCorrectionLevel: 'M' });
    let d = '';
    for (let row = 0; row < modules.size; row++) {
      for (let col = 0; col < modules.size; col++) {
        if (modules.get(row, col)) d += `M${col} ${row}h1v1h-1z`;
      }
    }
    return { size: modules.size, path: d };
  }, [url]);

  return (
    <aside className="print-link">
      <div>
        <span className="print-link-label">Online Portfolio</span>
        <a href={url}>{url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>
        <p>QR 코드를 스캔하면 프로젝트 상세와 코드를 웹에서 볼 수 있습니다.</p>
      </div>
      <a href={url} className="print-link-qr" aria-label="온라인 포트폴리오 QR 코드">
        <svg viewBox={`-2 -2 ${size + 4} ${size + 4}`} shapeRendering="crispEdges">
          <rect x={-2} y={-2} width={size + 4} height={size + 4} fill="#fff" />
          <path d={path} fill="#1f201d" />
        </svg>
      </a>
    </aside>
  );
}
