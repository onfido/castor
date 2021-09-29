import { c, classy, m, TooltipProps as BaseProps } from '@onfido/castor';
import React, { ReactNode, RefObject, useEffect, useState } from 'react';
import { Popover } from '../popover/popover';

export interface TooltipProps extends BaseProps, Span {
  children?: ReactNode;
  /**
   * Ref to an element which the Tooltip should target for placement.
   *
   * Will Portal the Tooltip into `document.body`.
   *
   * `target` behaves as the "previous sibling" for `show="on-hover"`.
   */
  target?: RefObject<HTMLElement>;
}

export function Tooltip({ className, show, target, ...props }: TooltipProps) {
  const [hover, setHover] = useState(false);

  // `onHover` can't be CSS only inside a Portal because the target is no longer
  // a sibling, so we listen to events instead
  useEffect(() => {
    const element = target?.current;
    if (!element) return;

    const watching = eventsThatChangeHoverOrFocus.map((type) =>
      on(element, type, () => setHover(element.matches(':hover, :focus')))
    );
    return () => watching.forEach((stop) => stop());
  }, []);

  const showModifier =
    show === 'on-hover'
      ? target
        ? { show: hover }
        : show
      : { show: show === true };

  return (
    <Popover
      {...props}
      className={classy(c('tooltip'), m(showModifier), className)}
      target={target}
    />
  );
}

const eventsThatChangeHoverOrFocus = [
  'focus',
  'blur',
  'mouseenter',
  'mouseleave',
  'touchstart',
  'touchend',
] as const;

const on = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  listener: (ev: HTMLElementEventMap[K]) => unknown,
  options?: boolean | AddEventListenerOptions
) => {
  element.addEventListener(type, listener, options);
  return () => element.removeEventListener(type, listener, options);
};

type Span = JSX.IntrinsicElements['span'];
