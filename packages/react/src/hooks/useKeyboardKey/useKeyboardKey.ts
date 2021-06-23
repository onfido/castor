import React, { RefObject, useCallback, useEffect } from 'react';

/**
 * Uses `ref` object to listen to keyboard events, executes callback function by
 * providing a key pressed alongside method to stop an event.
 *
 * @param ref Element `ref` object, where keyboard events should be listened to.
 * @param callback Callback function, executed with keyboard event args.
 */
export const useKeyboardKey = (
  ref: RefObject<Element>,
  callback: (
    key: React.KeyboardEvent<Element>['key'],
    stopEvent: () => void
  ) => void
): void => {
  const handleKeyDown = useCallback(
    (event) => {
      if (!(event instanceof KeyboardEvent)) return;

      const stopEvent = () => {
        event.preventDefault();
        event.stopPropagation();
      };

      callback(event.key, stopEvent);
    },
    [ref, callback]
  );

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    element.addEventListener('keydown', handleKeyDown);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, handleKeyDown]);
};
