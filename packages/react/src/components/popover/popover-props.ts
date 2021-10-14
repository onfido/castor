import { PopoverProps as BaseProps } from '@onfido/castor';
import { ReactNode, RefObject } from 'react';

export interface PopoverProps extends BaseProps, Omit<Div, 'ref'> {
  children?: ReactNode;
  /**
   * Whether the Popover should paint an overlay and centralize when the
   * screen is too small.
   */
  overlay?: boolean;
  /**
   * An event that notifies the intention to close the Popover, usually from an
   * outside click.
   *
   * Only triggers when target is specified.
   */
  onClose?: () => void;
  /**
   * An event that notifies the initial rendering of the Popover has completed,
   * provides the Popover element as argument.
   */
  onRender?: (popover: HTMLDivElement | null) => void;
  /**
   * Ref to an element which the Popover should target for placement.
   *
   * Will Portal the Popover into `document.body`.
   */
  target?: RefObject<Element>;
}

type Div = JSX.IntrinsicElements['div'];
