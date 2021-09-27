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
export const Select = withRef(function Select(
  {
    id = `castor_select_${++idCount}`,
    defaultValue,
    value,
    borderless,
    invalid,
    children,
    className,
    onChange,
    ...restProps
  }: SelectProps,
  ref?: SelectProps['ref']
) {
  const [empty, setEmpty] = useState(!(defaultValue ?? value));
  const { disabled, touched } = useField();

  return (
    <div className={classy(c('select'), m({ borderless }))}>
      <select
        disabled={disabled} // will be overriden by props if set
        {...restProps}
        ref={ref}
        id={id}
        defaultValue={defaultValue}
        value={value}
        className={classy(
          c('select-native'),
          m({ borderless, empty, invalid, touched }),
          className
        )}
        onChange={(ev) => {
          setEmpty(!(value ?? ev.currentTarget.value));
          onChange?.(ev);
        }}
      >
        {children}
      </select>
      <Icon name="chevron-down" />
    </div>
  );
});

export type SelectProps = BaseProps &
  JSX.IntrinsicElements['select'] & {
    native: true;
  };

export const Option = (props: OptionProps) => <option {...props} />;

export type OptionProps = JSX.IntrinsicElements['option'];
