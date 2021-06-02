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
    (children as unknown[])?.join?.('\n') || children,
    `</${name}>`,
  ]
    .filter(Boolean)
    .join('\n');

function toAttribute([key, value]: [string, unknown]) {
  if (value === '' || value === true) return key;
  if (!value) return '';

  return `${key}="${value}"`;
}
