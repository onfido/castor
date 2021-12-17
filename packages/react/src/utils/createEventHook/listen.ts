import { getNodes, noop, OnEvent, Target } from './shared';

/**
 * Listens to the specified `type` of events and calls `onEvent` when one fires
 * within one of the `targets`.
 * @param type Types of events to listen to.
 * @param target Nodes or RefObjects of nodes to listen on.
 * @param onEvent Function to call when one of the events fires.
 * @param options EventListener options.
 */
export function listen<K extends keyof HTMLElementEventMap>(
  type: K | readonly K[],
  target: Target | readonly Target[],
  onEvent: OnEvent<K>,
  options?: AddEventListenerOptions
) {
  const types = [type].flat() as K[];
  const nodes = getNodes(target);

  if (!onEvent || !types.length || !nodes.length) return noop;

  const listening = nodes.flatMap((node) =>
    types.map((type) => on(type, node, onEvent, options))
  );
  return () => listening.forEach(stop);
}

const on = <K extends keyof HTMLElementEventMap>(
  type: K,
  node: Node,
  onEvent: (ev: HTMLElementEventMap[K]) => unknown,
  options?: AddEventListenerOptions
) => {
  const element = node as HTMLElement;
  element.addEventListener(type, onEvent, options);
  return () => element.removeEventListener(type, onEvent, options);
};

const stop = (fn: () => void) => fn();
