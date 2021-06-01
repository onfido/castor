import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { Icon } from '../icon/icon.story';

export interface SelectProps extends BaseProps {
  children?: string | string[] | null;
  id?: string;
  placeholder?: string;
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
  placeholder,
  value,
  borderless,
  invalid,
  children,
  ...props
}: SelectProps) =>
  html('div', {
    class: classy(c('select'), m({ borderless })),
    children: [
      html('select', {
        ...props,
        class: classy(
          c('select-native'),
          m({
            borderless,
            invalid,
            ...(placeholder && (!value || value === '') && { empty: true }),
          })
        ),
        children: [
          placeholder &&
            html('option', {
              value: '',
              selected: !value || value === '',
              disabled: true,
              children: placeholder,
            }),
          ...(children ?? []),
        ],
        id,
      }),
      Icon({ name: 'chevron-down', ['aria-hidden']: 'true' }),
    ],
  });
