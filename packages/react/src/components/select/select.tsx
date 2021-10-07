import React from 'react';
import { CustomSelect, CustomSelectProps } from './custom';
import { NativeSelect, NativeSelectProps } from './native';
import { SelectProvider } from './useSelect';

export type SelectProps =
  | ({ native: true } & Omit<NativeSelectProps, 'notNative'>)
  | ({ native?: false } & CustomSelectProps);

/**
 * `Select` uses an `Icon` that requires `Icons` (SVG sprite) to be included in
 * your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 */
export const Select = ({ native, ...restProps }: SelectProps) => (
  <SelectProvider value={{ native }}>
    {native ? (
      <NativeSelect {...(restProps as NativeSelectProps)} />
    ) : (
      <CustomSelect {...(restProps as CustomSelectProps)} />
    )}
  </SelectProvider>
);
