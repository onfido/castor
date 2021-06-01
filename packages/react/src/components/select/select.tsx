import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import { Icon, useField } from '@onfido/castor-react';
import React, { useState } from 'react';
import { withRef } from '../../utils';

let idCount = 0;

/**
 * `Select` uses an `Icon` that requires `Icons` (SVG sprite) to be included in
 * your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 */
export const Select = withRef(
  (
    {
      id = `castor_select_${++idCount}`,
      placeholder,
      defaultValue,
      value,
      borderless,
      invalid,
      children,
      className,
      onChange,
      ...restProps
    }: SelectProps,
    ref: SelectProps['ref']
  ): JSX.Element => {
    const [empty, setEmpty] = useState(!!placeholder);
    const { disabled, touched } = useField();

    return (
      <div className={classy(c('select'), m({ borderless }))}>
        <select
          disabled={disabled} // will be overriden by props if set
          {...restProps}
          ref={ref}
          id={id}
          defaultValue={
            defaultValue || value != null ? undefined : placeholder && ''
          }
          value={value}
          className={classy(
            c('select-native'),
            m({ empty, borderless, invalid, touched }),
            className
          )}
          onChange={(ev) => {
            setEmpty(value != null ? !value : !ev.currentTarget.value);
            onChange?.(ev);
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <Icon name="chevron-down" />
      </div>
    );
  }
);
Select.displayName = 'Select';

export type SelectProps = BaseProps & JSX.IntrinsicElements['select'];
