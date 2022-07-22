import { c, classy, m, SelectProps } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React from 'react';
import { withRef } from '../../../utils';

export const NativeSelect = withRef(function NativeSelect(
  { className, invalid, ...restProps }: NativeSelectProps,
  ref: NativeSelectProps['ref']
) {
  const { disabled, touched } = useField();

  return (
    <select
      disabled={disabled} // will be overriden by props if set
      {...restProps}
      ref={ref}
      className={classy(c('select-native'), m({ invalid, touched }), className)}
    />
  );
});

export type NativeSelectProps = Omit<SelectProps, 'borderless'> & JsxSelect;

type JsxSelect = Omit<JSX.IntrinsicElements['select'], 'placeholder'>;
