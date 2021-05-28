import { ButtonProps as BaseProps, c, classy, m } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React, { HTMLAttributes } from 'react';

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
      {...(Element === 'button' && {
        disabled, // will be overriden by props if set
      })}
      {...(restProps as HTMLAttributes<HTMLElement>)}
      className={classy(c('button'), m(`${kind}--${variant}`), className)}
    />
  );
};

export type ButtonProps<T extends 'a' | 'button' = 'button'> = BaseProps &
  (T extends 'a' ? AnchorElementProps : ButtonElementProps);

type ButtonComponent = {
  (props: BaseProps & AnchorElementProps): JSX.Element;
  (props: BaseProps & ButtonElementProps): JSX.Element;
};

type AnchorElementProps = JSX.IntrinsicElements['a'];
type ButtonElementProps = JSX.IntrinsicElements['button'];
