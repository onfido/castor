import React from 'react';

export const NativeOptionGroup = (
  props: NativeOptionGroupProps
): JSX.Element => <optgroup {...props} />;

export type NativeOptionGroupProps = JSX.IntrinsicElements['optgroup'];
