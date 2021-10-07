import React from 'react';

export interface NativeOptionGroupProps extends JsxOptGroup {
  label: string;
}

export const NativeOptionGroup = (props: NativeOptionGroupProps) => (
  <optgroup {...props} />
);

type JsxOptGroup = JSX.IntrinsicElements['optgroup'];
