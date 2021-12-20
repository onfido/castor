import { Alignment, Position } from '@onfido/castor';
import React, { useEffect, useRef, useState } from 'react';
import { createEventHook, useIntersectionObserver } from '../../utils';
import { PopoverBase } from './popover-base';
import type { PopoverProps } from './popover-props';
import { PopoverWithPortal } from './popover-with-portal';

export { PopoverProps };

export function Popover({
  align: preferredAlign = 'center',
  onClose,
  onRender,
  overlay,
  position: preferredPosition = 'top',
  target,
  ...props
}: PopoverProps) {
  const preferredPlacement = [preferredPosition, preferredAlign] as const;
  const popover = useRef<HTMLDivElement>(null);
  const [[position, alignment], setPlacement] = useState(preferredPlacement);

  useEffect(() => onRender?.(popover.current), []);

  // try the preferred placement again when the target is interacted with
  // (previous sibling if not using Portal)
  useHoverOrFocus(
    () => setPlacement(preferredPlacement),
    [target?.current || popover.current?.previousElementSibling]
  );

  useIntersectionObserver(
    (entry) => setPlacement((placement) => optimalPlacement(entry, placement)),
    [popover]
  );

  return target ? (
    <PopoverWithPortal
      {...props}
      align={alignment}
      overlay={overlay}
      onClose={onClose}
      popover={popover}
      position={position}
      target={target}
    />
  ) : (
    <PopoverBase
      {...props}
      ref={popover}
      align={alignment}
      position={position}
    />
  );
}

const useHoverOrFocus = createEventHook(['focus', 'mouseenter', 'touchstart']);

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

  // adjust each side to avoid clipping, if possible
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
