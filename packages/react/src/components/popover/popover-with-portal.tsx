import { c, classy, m } from '@onfido/castor';
import React, { ReactNode, RefObject, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  useIntersectionObserver,
  useNoScroll,
  useOnClickOutside,
  useResizeObserver,
} from '../../utils';
import { PopoverBase } from './popover-base';
import type { PopoverProps } from './popover-props';

export function PopoverWithPortal({
  onClose,
  overlay: allowOverlay,
  popover,
  target,
  ...props
}: PopoverProps & { popover: RefObject<HTMLDivElement> } & Required<
    Pick<PopoverProps, 'align' | 'position' | 'target'>
  >) {
  const domBody = useRef(document.body);
  const [anchor, setAnchor] = useState(at(target));

  useOnClickOutside(onClose, [target, popover]);

  useResizeObserver(() => setAnchor(at(target)), [domBody]);

  useIntersectionObserver(() => setAnchor(at(target)), [target]);

  const overlay = allowOverlay && screen.width < breakpoint('small');
  useNoScroll(overlay);

  return (
    <Portal>
      <div
        className={classy(c('popover-anchor'), m({ overlay }))}
        style={anchor}
      >
        <PopoverBase {...props} ref={popover} />
      </div>
    </Portal>
  );
}

const Portal = ({ children }: { children: ReactNode }) =>
  createPortal(children, document.body);

function at(anchor: RefObject<Element>) {
  if (!anchor.current) return;

  const anchorRect = anchor.current.getBoundingClientRect();
  let { left, top } = anchorRect;
  const { height, width } = anchorRect;

  if (document.scrollingElement) {
    const scroll = document.scrollingElement.getBoundingClientRect();

    if (scroll.top < 0) top -= scroll.top;
    if (scroll.left < 0) left -= scroll.left;
  }

  return { left, top, height, width };
}

const breakpoint = (_name: 'small') => 600;
