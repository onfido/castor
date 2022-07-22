import {
  c,
  classy,
  OptionListProps as BaseOptionListProps,
  OptionProps as BaseOptionProps,
} from '@onfido/castor';
import { html } from '../../../../../docs';
import { Icon } from '../icon/icon.story';

export interface OptionListProps extends BaseOptionListProps {
  children?: string | string[] | null;
  class?: string;
}

export const OptionList = ({ class: className, ...props }: OptionListProps) =>
  html('div', {
    ...props,
    class: classy(c('option-list'), className),
  });

export interface OptionProps extends BaseOptionProps {
  children?: string | string[] | null;
  class?: string;
  name?: string;
}

export const Option = ({
  class: className,
  children,
  disabled,
  name,
  selected,
  value,
  ...props
}: OptionProps) =>
  html('label', {
    ...props,
    class: classy(c('option'), className),
    children: [
      html('input', {
        class: classy(c('option-input')),
        disabled,
        name,
        selected,
        type: 'radio',
        value,
      }),
      html('span', { class: classy(c('option-content')), children }),
      Icon({ 'aria-hidden': 'true', name: 'check' }),
    ],
  });

export interface OptionGroupProps {
  children?: string | string[] | null;
  class?: string;
}

export const OptionGroup = ({ class: className, ...props }: OptionGroupProps) =>
  html('div', {
    ...props,
    class: classy(c('option-group'), className),
  });
