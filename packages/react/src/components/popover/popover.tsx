import {
  Alignment,
  c,
  classy,
  m,
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
  /**
   * Ref to an element which the Popover should target for placement.
   *
   * Will Portal the Popover into `document.body`.
   */
  target?: RefObject<Element>;
}

export const Popover = ({
  align = 'center',
  onClose,
  place = 'top',
  target,
  ...props
}: PopoverProps) =>
  target ? (
    <PopoverWithPortal
      {...props}
      align={align}
      onClose={onClose}
      place={place}
      target={target}
    />
  ) : (
    <PopoverBase {...props} align={align} place={place} />
  );

const PopoverBase = withRef(function Popover(
  {
    align,
    className,
    place,
    ...props
  }: BaseProps & Div & Required<Pick<PopoverProps, 'place' | 'align'>>,
  ref?: Div['ref']
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classy(c('popover'), m(`${place}--${align}`), className)}
    />
  );
});

function PopoverWithPortal({
  onClose,
  align,
  place,
  target,
  ...props
}: PopoverProps & Required<Pick<PopoverProps, 'target' | 'place' | 'align'>>) {
  const popover = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState([place, align] as const);
  const [anchor, setAnchor] = useState(at(target));

  useOnClickOutside(onClose, [target, popover]);

  useObserver(
    (entry) => {
      setAnchor(at(target));
      setPlacement((placement) => optimalPlacement(entry, placement));
    },
    [target, popover]
  );

  return (
    <Portal>
      <div className={classy(c('popover-anchor'))} style={anchor}>
        <PopoverBase
          {...props}
          ref={popover}
          align={placement[1]}
          place={placement[0]}
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
function optimalPlacement(
  _entry: IntersectionObserverEntry,
  [position, alignment]: readonly [Position, Alignment]
): [Position, Alignment] {
  return [position, alignment];
}

type Div = JSX.IntrinsicElements['div'];
