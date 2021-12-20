import { StoryContext } from '@storybook/react';
import React, { ReactElement, ReactNode } from 'react';

// NOTE: always execute storyFn so that source code snippets are generated
export const prepareForInline = (
  storyFn: () => JSX.Element,
  ctx: StoryContext
) => {
  const story = storyFn();

  if (ctx.id.startsWith('css-')) return parse(story);

  return story;
};

/**
 * Deeply parses a React structure for strings and parses those as HTML
 */
function parse(node: ReactElement<{ children: ReactNode }>) {
  const { children } = node.props;

  if (!children) return node;

  return {
    ...node,
    props: {
      ...node.props,
      children: value(children),
    },
  };
}

function value(node: ReactNode) {
  if (Array.isArray(node)) return node.map(value);
  if (typeof node === 'string') return html(node);
  if (typeof node === 'object' && 'props' in node) return parse(node);
  return node;
}

const html = (content: string) => (
  <div ref={(el) => el && (el.outerHTML = content)} />
);
