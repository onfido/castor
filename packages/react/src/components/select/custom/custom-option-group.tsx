import { c, classy } from '@onfido/castor';
import React from 'react';

export interface CustomOptionGroupProps extends JsxDiv {
  label: string;
}

export const CustomOptionGroup = ({
  children,
  className,
  label,
  ...restProps
}: CustomOptionGroupProps) => (
  <>
    <div {...restProps} className={classy(c('select-option-group'), className)}>
      {label}
    </div>
    {children}
  </>
);

type JsxDiv = JSX.IntrinsicElements['div'];
