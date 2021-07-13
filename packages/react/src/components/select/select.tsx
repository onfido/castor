import React from 'react';
import {
  CustomOption,
  CustomOptionGroup,
  CustomOptionGroupProps,
  CustomOptionProps,
  CustomSelect,
  CustomSelectProps,
} from './custom';
import {
  NativeOption,
  NativeOptionGroup,
  NativeOptionGroupProps,
  NativeOptionProps,
  NativeSelect,
  NativeSelectProps,
} from './native';
import { SelectProvider, useSelect } from './useSelect';

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

export type SelectProps = SelectAsNativeProps | SelectAsCustomProps;

type SelectAsNativeProps = {
  native: true;
} & NativeSelectProps;

type SelectAsCustomProps = {
  native?: false;
} & CustomSelectProps;

export function Option(props: OptionProps): JSX.Element {
  const { native } = useSelect();

  if (native) return <NativeOption {...(props as NativeOptionProps)} />;

  return <CustomOption {...(props as CustomOptionProps)} />;
}

export type OptionProps = NativeOptionProps | CustomOptionProps;

export function OptionGroup(props: OptionProps): JSX.Element {
  const { native } = useSelect();

  if (native)
    return <NativeOptionGroup {...(props as NativeOptionGroupProps)} />;

  return <CustomOptionGroup {...(props as CustomOptionGroupProps)} />;
}

export type OptionGroupProps = NativeOptionGroupProps | CustomOptionGroupProps;
