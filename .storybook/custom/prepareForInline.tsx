import { StoryContext } from '@storybook/addons';
import React from 'react';
import { ContainerContext } from '../../docs/decorators/withContainer';
import { decorators } from '../preview';

export const prepareForInline = (
  storyFn: () => JSX.Element,
  ctx: StoryContext & ContainerContext
) => {
  const content = ctx.originalStoryFn(ctx.args as any, ctx);

  if (typeof content == 'string')
    return decorate(ctx, <HtmlContainer>{content}</HtmlContainer>);

  return storyFn();
};

const HtmlContainer = ({ children }: { children: string }) => (
  <div ref={(node) => node && (node.outerHTML = children)} />
);

const decorate = (ctx: StoryContext & ContainerContext, content: JSX.Element) =>
  decorators.reduce((final, next) => next(() => final, ctx), content);
