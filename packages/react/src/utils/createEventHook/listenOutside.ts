import { listen } from './listen';
import { getNodes, noop, OnEvent, Target } from './shared';

/**
 * Listens to the specified `type` of events and calls `onEvent` when one fires
 * outside all of the `targets`.
 * @param type Types of events to listen to.
 * @param target Nodes or RefObjects of nodes to listen on.
 * @param onEvent Function to call when one of the events fires.
 * @param options EventListener options.
 */
export function listenOutside<K extends keyof HTMLElementEventMap>(
  type: K | readonly K[],
  target: Target | readonly Target[],
  onEvent: OnEvent<K>,
  options?: AddEventListenerOptions
) {
  const nodes = getNodes(target);

  if (!onEvent || !nodes.length) return noop;

  const handler = (ev: HTMLElementEventMap[K]) =>
    nodes.some((node) => node.contains(ev.target as Element)) || onEvent(ev);

  const ownerDocument = nodes.map((n) => n.ownerDocument).find(Boolean);

  return listen(type, ownerDocument || document, handler, options);
}
