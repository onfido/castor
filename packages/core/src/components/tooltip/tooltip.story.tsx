import { c, classy, m, TooltipProps as BaseProps } from '@onfido/castor';
import { Popover } from '../popover/popover.story';

export interface TooltipProps extends BaseProps {
  children?: Children;
}

export const Tooltip = ({ show, ...props }: TooltipProps) =>
  Popover({
    ...props,
    class: classy(
      c('tooltip'),
      m(show === 'on-hover' ? show : { show: show === true })
    ),
  });

type Children = Node | Node[];
type Node = string | boolean | null | undefined;
