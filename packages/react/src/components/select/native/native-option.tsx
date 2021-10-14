import React from 'react';

export type NativeOptionProps = JSX.IntrinsicElements['option'];

export const NativeOption = (props: NativeOptionProps) => <option {...props} />;
