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

export const Popover = ({
  align = 'center',
  onClose,
  position = 'top',
  target,
  ...props
}: PopoverProps) =>
  target ? (
    <PopoverWithPortal
      {...props}
      align={align}
      onClose={onClose}
      position={position}
      target={target}
    />
  ) : (
    <PopoverBase {...props} align={align} position={position} />
  );

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
  align,
  onClose,
  position,
  target,
  ...props
}: PopoverProps &
  Required<Pick<PopoverProps, 'align' | 'position' | 'target'>>) {
  const domBody = useRef(document.body);
  const popover = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState([position, align] as const);
  const [anchor, setAnchor] = useState(at(target));

  useOnClickOutside(onClose, [target, popover]);

  useResizeObserver(() => setAnchor(at(target)), [domBody]);

  useIntersectionObserver(
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
          position={placement[0]}
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
