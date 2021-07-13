import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import { Icon, useField } from '@onfido/castor-react';
import React, { useEffect, useState } from 'react';
import { withRef } from '../../../utils';

let idCount = 0;

export const NativeSelect = withRef(
  (
    {
      id = `castor_native_select_${++idCount}`,
      borderless,
      invalid,
      children,
      className,
      onChange,
      ...restProps
    }: NativeSelectProps,
    ref: NativeSelectProps['ref']
  ): JSX.Element => {
    const { defaultValue, value } = restProps;
    const [empty, setEmpty] = useState(value != null ? !value : !defaultValue);
    const { disabled, touched } = useField();

    useEffect(() => setEmpty(!value), [value]);

    return (
      <div className={classy(c('select'), m({ borderless }))}>
        <select
          disabled={disabled} // will be overriden by props if set
          {...restProps}
          ref={ref}
          id={id}
          className={classy(
            c('select-native'),
            m({ borderless, empty, touched, invalid }),
            className
          )}
          onChange={(event) => {
            setEmpty(!event.currentTarget.value);
            onChange?.(event);
          }}
        >
          {children}
        </select>
        <Icon name="chevron-down" aria-hidden="true" />
      </div>
    );
  }
);
NativeSelect.displayName = 'Select';

export type NativeSelectProps = BaseProps & JSX.IntrinsicElements['select'];
