import { c, classy } from '@onfido/castor';
import React from 'react';

export interface OptionGroupProps extends JsxDiv {
  label: string;
}

export const OptionGroup = ({
  children,
  className,
  label,
  ...restProps
}: OptionGroupProps) => (
  <>
    <div {...restProps} className={classy(c('option-group'), className)}>
      {label}
    </div>
    {children}
  </>
);

type JsxDiv = JSX.IntrinsicElements['div'];
