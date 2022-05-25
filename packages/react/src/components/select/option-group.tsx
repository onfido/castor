import React from 'react';
import {
  OptionGroup as CustomOptionGroup,
  OptionGroupProps as CustomOptionGroupProps,
} from '../option-list/option-group';
import { NativeOptionGroup, NativeOptionGroupProps } from './native';
import { useSelect } from './useSelect';

export type OptionGroupProps = NativeOptionGroupProps | CustomOptionGroupProps;

export function OptionGroup(props: OptionGroupProps) {
  const { native } = useSelect();

  if (native)
    return <NativeOptionGroup {...(props as NativeOptionGroupProps)} />;

  return <CustomOptionGroup {...(props as CustomOptionGroupProps)} />;
}
