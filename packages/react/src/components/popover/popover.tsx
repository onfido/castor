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
import {
  useIntersectionObserver,
  useOnClickOutside,
  useResizeObserver,
  withRef,
} from '../../utils';

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

export function Popover({
  align = 'center',
  onClose,
  position = 'top',
  target,
  ...props
}: PopoverProps) {
  const popover = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState([position, align] as const);

  useIntersectionObserver(
    (entry) => setPlacement((placement) => optimalPlacement(entry, placement)),
    [popover]
  );

  const [optimalPosition, optimalAlignment] = placement;

  return target ? (
    <PopoverWithPortal
      {...props}
      align={optimalAlignment}
      onClose={onClose}
      popover={popover}
      position={optimalPosition}
      target={target}
    />
  ) : (
    <PopoverBase
      {...props}
      ref={popover}
      align={optimalAlignment}
      position={optimalPosition}
    />
  );
}

const PopoverBase = withRef(function Popover(
  {
    align,
    className,
    position,
    ...props
  }: BaseProps & Div & Required<Pick<PopoverProps, 'align' | 'position'>>,
  ref?: Div['ref']
) {
  return (
    <div
      {...props}
      ref={ref}
      className={classy(c('popover'), m(`${position}--${align}`), className)}
    />
  );
});

function PopoverWithPortal({
  onClose,
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

  return (
    <Portal>
      <div className={classy(c('popover-anchor'))} style={anchor}>
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

function optimalPlacement(
  entry: IntersectionObserverEntry,
  currentPlacement: readonly [Position, Alignment]
): readonly [Position, Alignment] {
  const [position, alignment] = currentPlacement;
  const popover = entry.boundingClientRect;
  const intersection = entry.intersectionRect;

  const isClipping = (side: Position) =>
    Math.abs(popover[side] - intersection[side]) >= 1;

  // check for intersections
  const clipping = {
    top: isClipping(sides.top),
    left: isClipping(sides.left),
    bottom: isClipping(sides.bottom),
    right: isClipping(sides.right),
  };

  // if both edges of the same axis intersect, there is nothing we can do
  if (clipping.bottom && clipping.top) return currentPlacement;
  if (clipping.left && clipping.right) return currentPlacement;

  // adjust to the clipping side, if any
  const newPlacement =
    check(sides.top) ||
    check(sides.bottom) ||
    check(sides.left) ||
    check(sides.right);

  // default is no change
  return newPlacement || currentPlacement;

  /**
   * Checks whether `side` is clipping and gets its adjusted placement.
   * @param side Edge to check for clipping.
   * @returns New placement if possible to adjust, or undefined if not.
   */
  function check(side: Position): readonly [Position, Alignment] | undefined {
    const target = opposite[side];

    // if not clipping, nothing to do
    if (!clipping[side]) return;
    // if already positioned on target, nothing to do
    if (position === target) return;

    // if positioned on opposite side of the same axis, position on target
    if (position === opposite[target]) return [target, alignment];
    // if already optimally aligned, position on target and align on position
    if (alignment === align[target]) return [target, align[position]];
    // if different axis, align on target
    return [position, align[target]];
  }
}

const sides = {
  top: 'top',
  left: 'left',
  bottom: 'bottom',
  right: 'right',
  start: 'start',
  end: 'end',
} as const;

const opposite = {
  top: sides.bottom,
  left: sides.right,
  bottom: sides.top,
  right: sides.left,
} as const;

const align = {
  top: sides.start,
  left: sides.start,
  bottom: sides.end,
  right: sides.end,
} as const;

type Div = JSX.IntrinsicElements['div'];
