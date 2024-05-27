import { c, classy, m, type SwitchProps as BaseProps } from '@onfido/castor';
import React, { type FC } from 'react';
import { Icon } from '../icon/icon';

let idCount = 0;

export const Switch: FC<SwitchProps> = ({
  id = `castor_switch_${++idCount}`,
  disabled,
  className,
  children,
  ...props
}) => (
  <label
    htmlFor={id}
    className={classy(className, c('switch-label'), m({ disabled }))}
  >
    {children && <span>{children}</span>}
    <input {...props} type="checkbox" id={id} disabled={disabled} />
    <span className={classy(c('switch-indicator'), m({ disabled }))}>
      <Icon name="check" aria-hidden="true" />
    </span>
  </label>
);

export type SwitchProps = BaseProps & Omit<SwitchElementProps, 'children'>;

type SwitchElementProps = JSX.IntrinsicElements['input'];
