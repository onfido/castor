import { c, classy, m, SelectProps } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';
import { withRef } from '../../../utils';

export type NativeSelectProps = Omit<SelectProps, 'borderless'> & JsxSelect;

export const NativeSelect = withRef(function NativeSelect(
  {
    id = `castor-native-select-${++idCount}`,
    className,
    invalid,
    ...restProps
  }: NativeSelectProps,
  ref: NativeSelectProps['ref']
) {
  const { disabled, touched } = useField();

  return (
    <select
      disabled={disabled} // will be overriden by props if set
      {...restProps}
      ref={ref}
      id={id}
      className={classy(c('select-native'), m({ invalid, touched }), className)}
    />
  );
});

let idCount = 0;

type JsxSelect = Omit<JSX.IntrinsicElements['select'], 'placeholder'>;
