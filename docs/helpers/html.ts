import { Properties } from 'csstype';
import { CSSProperties } from 'react';

/**
 * Renders as HTML inside a React `div`.

 * @param name Tag name, to use as root element.
 * @param param1 Properties and attributes.
 */
export const html = (name: string, { children, ...props }: Props) =>
  content([
    `<${name}`,
    Object.entries(props).map(toAttribute).sort().join('\n'),
    '>',
    children instanceof Array ? content(children) : children,
    `</${name}>`,
  ]);

type Props = Record<string, unknown> & { style?: CSSProperties | string };

const content = (nodes: unknown[]) => nodes.filter(Boolean).join('\n');

function toAttribute([key, value]: [string, unknown]) {
  if (key === 'style' && typeof value === 'object') value = styleFor(value);
  if (value === true) return key;
  if (value === false || value == null) return '';

  return `${key}="${value}"`;
}

const styleFor = (style: Properties | null | undefined) =>
  Object.entries(style || {})
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ') || undefined;
