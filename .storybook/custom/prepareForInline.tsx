import { StoryContext } from '@storybook/addons';
import React from 'react';
import { ContainerContext } from '../../docs/decorators/withContainer';
import { decorators } from '../preview';

export const prepareForInline = (
  storyFn: () => JSX.Element,
  ctx: StoryContext & ContainerContext
) => {
  const story = storyFn();
  const content: unknown = ctx.originalStoryFn(ctx.args as any, ctx);
  const decorate = withDecorators(ctx);

  if (typeof content === 'string')
    return decorate(<HtmlContainer>{content}</HtmlContainer>);
  else if (ctx.id.startsWith('css-')) return decorate(story);

  return story;
};

const HtmlContainer = ({ children }: { children: string }) => (
  <div ref={(node) => node && (node.outerHTML = children)} />
);

const withDecorators =
  (ctx: StoryContext & ContainerContext) => (content: JSX.Element) =>
    decorators.reduce((final, next) => next(() => final, ctx), content);
