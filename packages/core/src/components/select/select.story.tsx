import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { Icon } from '../icon/icon.story';

export interface SelectProps extends BaseProps {
  children?: string | string[] | null;
  class?: string;
  id?: string;
  required?: boolean;
  value?: string;
}

/**
 * `.ods-select` uses an `.ods-icon` that requires SVG sprite to be included in
 * your app.
 *
 * https://github.com/onfido/castor-icons
 */
export const Select = ({
  id,
  borderless,
  invalid,
  children,
  class: className,
  ...props
}: SelectProps) =>
  html('div', {
    class: classy(c('select'), m({ borderless })),
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
