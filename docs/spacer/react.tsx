import React, { FC, ReactNode } from 'react';

export const Spacer = ({ children }: { children: ReactNode }) => (
  <div style={{ margin: 32 }}>{children}</div>
);

export function withSpacer(storyFn: () => JSX.Element): JSX.Element {
  const story = storyFn();

  return hasSpacer(story as Node) ? story : <Spacer>{story}</Spacer>;
}

interface Node {
  props?: { children?: NodeChildren };
  type?: { displayName: string };
}

type NodeChildren = string | Node | Node[];

function hasSpacer(node: Node): boolean {
  if (node.type?.displayName === (Spacer as FC).displayName) return true;

  const children = node.props?.children;

  if (!children || typeof children === 'string') return false;

  if (Array.isArray(children)) return children.some(hasSpacer);

  return hasSpacer(children);
}
