import React from 'react';

export const NativeOption = (props: NativeOptionProps): JSX.Element => (
  <option {...props} />
);

export type NativeOptionProps = JSX.IntrinsicElements['option'];
