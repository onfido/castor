import { c, classy } from '@onfido/castor';
import { html } from '../../../../../docs';
import { m } from '../../utils';
import { PopoverProps as BaseProps } from './popover';

export interface PopoverProps extends BaseProps {
  children?: Children;
}

export const Popover = ({
  align = 'center',
  position = 'top',
  ...props
}: PopoverProps) =>
  html('div', {
    ...props,
    class: classy(c('popover'), m(`${position}--${align}`)),
  });

type Children = Node | Node[];
type Node = string | boolean | null | undefined;
