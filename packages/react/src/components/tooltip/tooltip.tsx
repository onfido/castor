import { c, classy, m, TooltipProps as BaseProps } from '@onfido/castor';
import React, { ReactNode, RefObject, useState } from 'react';
import { createEventHook } from '../../utils';
import { Popover, PopoverProps } from '../popover/popover';

export interface TooltipProps extends BaseProps, PopoverProps {
  children?: ReactNode;
  /**
   * Ref to an element which the Tooltip should target for placement.
   *
   * When defined will Portal the Tooltip into `document.body`.
   *
   * `target` behaves as the "previous sibling" for `show="on-hover"`.
   */
  target?: RefObject<HTMLElement>;
}

export function Tooltip({ className, show, target, ...props }: TooltipProps) {
  const [hover, setHover] = useState(false);

  // `show="on-hover"` can't be CSS only inside a Portal because the target is
  // no longer a sibling, so we listen to events on `target` instead
  useOnInteract(() => {
    setHover(!!target?.current?.matches(':hover, :focus'));
  }, [target]);

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

const useOnInteract = createEventHook([
  'focus',
  'blur',
  'mouseenter',
  'mouseleave',
  'touchstart',
  'touchend',
]);
