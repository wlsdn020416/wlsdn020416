import type { ReactNode } from 'react';

const KEYWORDS = new Set([
  'abstract',
  'boolean',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'default',
  'double',
  'else',
  'enum',
  'extends',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'if',
  'implements',
  'import',
  'instanceof',
  'int',
  'interface',
  'long',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'record',
  'return',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'throws',
  'true',
  'try',
  'var',
  'void',
  'while',
  'let',
  'function',
  'await',
  'async',
]);

const TOKEN =
  /(\/\/.*$|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)|(@\w+)|(\b[A-Za-z_]\w*\b)|(\b\d+(?:\.\d+)?[LlFfDd]?\b)/gm;

function highlight(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    const [text, comment, string, annotation, word, number] = m;
    const index = m.index ?? 0;
    if (index > last) out.push(line.slice(last, index));
    let cls = '';
    if (comment) cls = 'tok-comment';
    else if (string) cls = 'tok-string';
    else if (annotation) cls = 'tok-annotation';
    else if (word && KEYWORDS.has(word)) cls = 'tok-keyword';
    else if (word && /^[A-Z]/.test(word)) cls = 'tok-type';
    else if (number) cls = 'tok-number';
    out.push(
      cls ? (
        <span key={index} className={cls}>
          {text}
        </span>
      ) : (
        text
      ),
    );
    last = index + text.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

type CodeBlockProps = {
  file: string;
  code: string;
  /** 강조할 줄 번호 (1부터) */
  highlightLines?: number[];
  caption?: ReactNode;
  /** text면 문법 강조 없이 출력 (프롬프트, SQL 등) */
  lang?: 'java' | 'js' | 'text';
};

export function CodeBlock({
  file,
  code,
  highlightLines = [],
  caption,
  lang = 'java',
}: CodeBlockProps) {
  const lines = code.replace(/^\n+|\n+$/g, '').split('\n');
  return (
    <figure className={`code-block lang-${lang}`}>
      <figcaption className="code-file">{file}</figcaption>
      <pre>
        <code>
          {lines.map((line, i) => (
            <span
              key={i}
              className={`code-line ${highlightLines.includes(i + 1) ? 'is-highlighted' : ''}`}
            >
              {lang === 'text' ? line : highlight(line)}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
      {caption && <p className="code-caption">{caption}</p>}
    </figure>
  );
}
