import { StoryContext } from '@storybook/addons';
import React from 'react';
import { ContainerContext } from '../../docs/decorators/withContainer';
import { decorators } from '../preview';

export const prepareForInline = (
  storyFn: () => JSX.Element,
  ctx: StoryContext & ContainerContext
) => {
  const story = storyFn();
  const content: unknown = ctx.getOriginal()(ctx.args);
  const decorate = withDecorators(ctx);

  console.log(story);
  console.log(content);

  if (typeof content === 'string') return decorate(<Html>{content}</Html>);

  if (content instanceof Element) return decorate(<DomNode>{content}</DomNode>);

  return story;
};

const DomNode = ({ children }: { children: Element }) => (
  <Html>{children.innerHTML}</Html>
);

const Html = ({ children }: { children: string }) => (
  <div ref={(node) => node && (node.outerHTML = children)} />
);

const withDecorators = (ctx: StoryContext & ContainerContext) => (
  content: JSX.Element
) => decorators.reduce((final, next) => next(() => final, ctx), content);
