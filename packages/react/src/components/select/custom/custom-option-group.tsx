import React from 'react';

export const CustomOptionGroup = ({
  children,
  label,
  ...props
}: CustomOptionGroupProps): JSX.Element => (
  <div {...props}>
    {label}
    {children}
  </div>
);

export type CustomOptionGroupProps = JSX.IntrinsicElements['div'] & {
  label?: string;
};
