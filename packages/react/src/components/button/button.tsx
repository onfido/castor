import { ButtonProps as BaseProps, c, classy, m } from '@onfido/castor';
import React, { HTMLAttributes } from 'react';
import { useField } from '../field/useField';

export const Button: ButtonComponent = ({
  kind = 'action',
  variant = 'primary',
  className,
  ...restProps
}: ButtonProps<'a'> | ButtonProps<'button'>) => {
  const { disabled } = useField();

  const Element = (restProps as ButtonProps<'a'>).href ? 'a' : 'button';

  return (
    <Element
      // will be overriden by props if set
      {...(Element === 'button' && { disabled })}
      //
      {...(restProps as HTMLAttributes<HTMLElement>)}
      {...(Element === 'a' && { role: 'button' })}
      className={classy(c('button'), m(`${kind}--${variant}`), className)}
    />
  );
};

export type ButtonProps<T extends 'a' | 'button' = 'button'> = BaseProps &
  (T extends 'a' ? Omit<AnchorElementProps, 'role'> : ButtonElementProps);

type ButtonComponent = {
  (props: BaseProps & AnchorElementProps): JSX.Element;
  (props: BaseProps & ButtonElementProps): JSX.Element;
};

type AnchorElementProps = JSX.IntrinsicElements['a'];
type ButtonElementProps = JSX.IntrinsicElements['button'];
