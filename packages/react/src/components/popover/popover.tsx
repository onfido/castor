import {
  Alignment,
  c,
  classy,
  m,
  Placement,
  PopoverProps as BaseProps,
  Position,
} from '@onfido/castor';
import React, { ReactNode, RefObject, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { withRef } from '../../utils';
import { useObserver } from './useObserver';
import { useOnClickOutside } from './useOnClickOutside';

export interface PopoverProps extends BaseProps, Omit<Div, 'ref'> {
  children?: ReactNode;
  onClose?: () => void;
  target?: RefObject<Element>;
}

export const Popover = ({
  onClose,
  placement = 'top-start',
  target,
  ...props
}: PopoverProps) =>
  target ? (
    <PopoverWithPortal
      {...props}
      onClose={onClose}
      placement={placement}
      target={target}
    />
  ) : (
    <PopoverBase {...props} placement={placement} />
  );

const PopoverBase = withRef(function Popover(
  { className, placement, ...props }: BaseProps & Div,
  ref?: Div['ref']
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classy(c('popover'), m(placement), className)}
    />
  );
});

function PopoverWithPortal({
  onClose,
  placement: preferredPlacement,
  target,
  ...props
}: PopoverProps & Required<Pick<PopoverProps, 'target' | 'placement'>>) {
  const popover = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState(
    () => preferredPlacement.split('-') as [Position, Alignment]
  );
  const [anchor, setAnchor] = useState(at(target));

  useOnClickOutside(onClose, [target, popover]);

  useObserver(() => setAnchor(at(target)), [target]);

  useObserver(
    (entry) => setPlacement((position) => optimalPosition(entry, position)),
    [popover]
  );

  return (
    <Portal>
      <div className={classy(c('popover-anchor'))} style={anchor}>
        <PopoverBase
          {...props}
          ref={popover}
          placement={placement.join('-') as Placement}
        />
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

// TODO
function optimalPosition(
  _entry: IntersectionObserverEntry,
  [position, alignment]: [Position, Alignment]
): [Position, Alignment] {
  return [position, alignment];
}

type Div = JSX.IntrinsicElements['div'];
