import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import { Icon, useField } from '@onfido/castor-react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { withRef } from '../../../utils';

let idCount = 0;

export const NativeSelect = withRef(
  (
    {
      id = `castor_native_select_${++idCount}`,
      defaultValue,
      value,
      borderless,
      invalid,
      children,
      className,
      onChange,
      ...restProps
    }: NativeSelectProps,
    ref: NativeSelectProps['ref']
  ): JSX.Element => {
    const [empty, setEmpty] = useState<boolean>(!value);
    const { disabled, touched } = useField();

    useEffect(() => {
      if (defaultValue != null) setEmpty(!defaultValue);
    }, []);

    useEffect(() => {
      setEmpty(!value);
    }, [value]);

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setEmpty(!event.currentTarget.value);
      onChange?.(event);
    };

    return (
      <div className={classy(c('select'), m({ borderless }))}>
        <select
          disabled={disabled} // will be overriden by props if set
          {...restProps}
          {...(defaultValue != null ? { defaultValue } : { value })}
          ref={ref}
          id={id}
          className={classy(
            c('select-native'),
            m({ borderless, empty, touched, invalid }),
            className
          )}
          onChange={handleChange}
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
