import { PopoverProps } from '../popover/popover';

export interface TooltipProps extends PopoverProps {
  /**
   * `boolean`: show or hide the Tooltip.
   *
   * `'on-hover'`: show when the previous sibling matches `:hover` or `:focus`.
   */
  show?: boolean | 'on-hover';
}
