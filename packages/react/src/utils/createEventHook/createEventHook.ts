import { useEffect } from 'react';
import { listen } from './listen';
import { listenOutside } from './listenOutside';
import { OnEvent, Target } from './shared';

/**
 * Creates a hook for listening to the specified types of events.
 * @param type Types of events to listen to.
 * @param options EventListener options.
 * @example
 * const useClickOutside = createEventHook('click', { outside: true });
 * const useInteract = createEventHook(['focus', 'mouseenter', 'touchstart']);
 */
export function createEventHook<K extends keyof HTMLElementEventMap>(
  type: K | readonly K[],
  { outside = false, ...options }: Options = {}
) {
  const listenFn = outside ? listenOutside : listen;

  /**
   * Listens to the specified events and calls `onEvent` when one fires.
   * @param onEvent Function to call when one of the events fires.
   * @param target Nodes or RefObjects of nodes to listen on.
   */
  return (onEvent: OnEvent<K>, targets: readonly Target[]) =>
    useEffect(() => listenFn(type, targets, onEvent, options), targets);
}

interface Options extends AddEventListenerOptions {
  /**
   * If `true` will fire `onEvent` when `event.target` is outside the specified
   * `targets` rather than within them.
   */
  outside?: boolean;
}
