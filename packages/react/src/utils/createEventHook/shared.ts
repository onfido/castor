import { RefObject } from 'react';

export const getNodes = (target: Target | readonly Target[]) =>
  [target].flat().map(node).filter(Boolean) as Node[];

const node = (target: Target) =>
  target instanceof Node ? target : target?.current;

export const noop = () => void 0;

export type OnEvent<K extends keyof HTMLElementEventMap> =
  | ((ev: HTMLElementEventMap[K]) => unknown)
  | undefined;

export type Target = Node | RefObject<Node> | null | undefined;
