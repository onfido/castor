import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import { Icon, useField } from '@onfido/castor-react';
import React, { useEffect, useState } from 'react';
import { withRef } from '../../../utils';

export interface NativeSelectProps extends BaseProps, JsxSelect {
  notNative?: boolean;
  open?: boolean;
}

export const NativeSelect = withRef(function NativeSelect(
  {
    id = `castor_native_select_${++idCount}`,
    borderless,
    children,
    className,
    invalid,
    notNative,
    onChange,
    open,
    ...restProps
  }: NativeSelectProps,
  ref: NativeSelectProps['ref']
) {
  const { defaultValue, value } = restProps;
  const [empty, setEmpty] = useState(!(value ?? defaultValue));
  const { disabled, touched } = useField();

  useEffect(() => setEmpty(!value), [value]);

  return (
    <div
      className={classy(c('select'), m({ borderless, empty, open }), className)}
    >
      <select
        disabled={disabled} // will be overriden by props if set
        {...restProps}
        ref={ref}
        id={id}
        className={classy(
          c('select-native'),
          m({ absolute: notNative, invalid, touched })
        )}
        onChange={(event) => {
          setEmpty(!event.currentTarget.value);
          onChange?.(event);
        }}
      >
        {notNative ? <option hidden value={value}></option> : children}
      </select>
      {notNative && children}
      <Icon name="chevron-down" aria-hidden="true" />
    </div>
  );
});

let idCount = 0;

type JsxSelect = Omit<JSX.IntrinsicElements['select'], 'placeholder'>;
