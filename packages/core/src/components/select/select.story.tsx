import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { Icon } from '../icon/icon.story';

export interface SelectProps extends BaseProps {
  children?: string | string[] | null;
  class?: string;
  empty?: boolean;
  id?: string;
  required?: boolean;
  value?: string;
}

/**
 * This example uses an icon that requires Castor's SVG sprite to be included in
 * your app:
 *
 * https://github.com/onfido/castor-icons
 *
 * You may also use any other SVG, but using Castor iconography is recommended.
 *
 * Regardless, make sure your icon has the `ods-icon` class.
 */
export const Select = ({
  id,
  borderless,
  empty,
  invalid,
  children,
  class: className,
  ...props
}: SelectProps) =>
  html('div', {
    class: classy(c('select'), m({ borderless, empty })),
    children: [
      html('select', {
        ...props,
        class: classy(c('select-native'), m({ invalid }), className),
        children,
        id,
      }),
      Icon({ name: 'chevron-down', ['aria-hidden']: 'true' }),
    ],
  });
