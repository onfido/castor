import { ReactNode } from 'react';

export const textContent = (node: ReactNode): string => {
  if (!node) return '';

  if (node instanceof Array) return node.map(textContent).join('');

  if (node instanceof Object && 'props' in node)
    return textContent(node.props.children);

  return String(node);
};
