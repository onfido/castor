import { c, classy } from '@onfido/castor';
import { Properties } from 'csstype';
import { html } from '../../../../../docs';
import { m } from '../../utils';
import { PopoverProps as BaseProps } from './popover';

export interface PopoverProps extends BaseProps {
  children?: Children;
}

export const Popover = ({
  align = 'center',
  place = 'top',
  ...props
}: PopoverProps) =>
  html('div', {
    ...props,
    class: classy(c('popover'), m(`${place}--${align}`)),
  });

export interface PopoverAnchorProps {
  children?: Children;
  style?: Properties;
}

export const PopoverAnchor = (props: PopoverAnchorProps) =>
  html('div', {
    ...props,
    class: classy(c('popover-anchor')),
  });

type Children = Node | Node[];
type Node = string | boolean | null | undefined;
