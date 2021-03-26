/**
 * Renders as HTML inside a React `div`.

 * @param name Tag name, to use as root element.
 * @param param1 Properties and attributes.
 */
export const html = (
  name: string,
  { children, ...props }: Record<string, unknown>
) =>
  [
    `<${name}`,
    Object.entries(props).map(toAttribute).join('\n'),
    '>',
    children?.join?.('') || children,
    `</${name}>`,
  ]
    .filter(Boolean)
    .join('\n');

function toAttribute([key, value]: [string, unknown]) {
  if (!value) return '';
  if (value === true) return key;

  return `${key}="${value}"`;
}
