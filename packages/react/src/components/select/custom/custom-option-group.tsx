import { c, classy } from '@onfido/castor';
import React from 'react';

export interface CustomOptionGroupProps extends JsxDiv {
  label: string;
}

export const CustomOptionGroup = ({
  children,
  className,
  label,
  ...props
}: CustomOptionGroupProps) => (
  <>
    <div {...props} className={classy(c('select-option-group'), className)}>
      {label}
    </div>
    {children}
  </>
);

type JsxDiv = JSX.IntrinsicElements['div'];
