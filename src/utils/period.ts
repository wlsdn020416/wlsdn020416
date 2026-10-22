export type Period = { start: string; end: string };

/** '2026-06-08' → '2026.06.08' */
export function formatDate(date: string): string {
  return date.replaceAll('-', '.');
}
