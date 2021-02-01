import { StoryContext } from '@storybook/react/types-6-0';
import React from 'react';
import { decorators } from '../preview';
import styles from './container.scss';

export const prepareForInline = (
  storyFn: () => JSX.Element,
  ctx: StoryContext & { parameters: ContainerContext }
) => {
  const story = storyFn();
  const content: unknown = ctx.getOriginal()(ctx.args);
  const { columns, display } = ctx.parameters;
  const decorate = withDecorators(ctx);

  if (typeof content === 'string')
    return decorate(<Html params={{ columns, display }}>{content}</Html>);

  if (content instanceof Element)
    return decorate(<DomNode params={{ columns, display }}>{content}</DomNode>);

  return story;
};

interface ContainerContext {
  columns?: string;
  display: 'block' | 'flex' | 'grid';
}

interface DomNodeProps {
  children: Element;
  params: ContainerContext;
}

const DomNode = ({ children, params }: DomNodeProps) => (
  <Container {...params} ref={(node) => node?.appendChild(children)} />
);

interface HtmlProps {
  children: string;
  params: ContainerContext;
}

const Html = ({ children, params }: HtmlProps) => (
  <Container {...params} dangerouslySetInnerHTML={{ __html: children }} />
);

type ContainerProps = ContainerContext & JSX.IntrinsicElements['div'];

const Container = ({ columns, display, ...props }: ContainerProps) => (
  <div
    {...props}
    className={styles[display || 'flex']}
    style={columns && { gridTemplateColumns: columns }}
  />
);

const withDecorators = (ctx: StoryContext) => (content: JSX.Element) =>
  decorators.reduce((final, next) => next(() => final, ctx), content);
