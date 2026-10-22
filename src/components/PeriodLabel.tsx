import { formatDate, type Period } from '../utils/period';

export function PeriodLabel({ period, className }: { period: Period; className?: string }) {
  return (
    <span className={className}>
      <time dateTime={period.start}>{formatDate(period.start)}</time>
      {' – '}
      <time dateTime={period.end}>{formatDate(period.end)}</time>
    </span>
  );
}
