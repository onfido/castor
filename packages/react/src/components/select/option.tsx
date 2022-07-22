import React from 'react';
import {
  Option as CustomOption,
  OptionProps as CustomOptionProps,
} from '../option-list/option';
import { NativeOption, NativeOptionProps } from './native';
import { useSelect } from './useSelect';

export type OptionProps = NativeOptionProps | CustomOptionProps;

export function Option(props: OptionProps) {
  const { native } = useSelect();

  if (native) return <NativeOption {...(props as NativeOptionProps)} />;

  return <CustomOption {...(props as CustomOptionProps)} />;
}
