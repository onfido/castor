import { ButtonProps as BaseProps, c, classy, m } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React, { ForwardedRef, HTMLAttributes } from 'react';
import { withRef } from '../../utils';

export const Button: ButtonComponent = withRef(function Button(
  {
    kind = 'action',
    variant = 'primary',
    className,
    ...restProps
  }: ButtonProps<'a'> | ButtonProps<'button'>,
  ref: AnchorRef | ButtonRef
) {
  const { disabled } = useField();

  const Element = (restProps as ButtonProps<'a'>).href ? 'a' : 'button';

  return (
    <Element
      {...(Element === 'button' && {
        disabled, // will be overriden by props if set
      })}
      {...(restProps as HTMLAttributes<HTMLElement>)}
      ref={ref as never} // ignore bivariance, we know it's right
      className={classy(c('button'), m(`${kind}--${variant}`), className)}
    />
  );
});

export type ButtonProps<T extends 'a' | 'button' = 'button'> = BaseProps &
  (T extends 'a'
    ? { href: string } & AnchorElementProps
    : { href?: never } & ButtonElementProps);

type ButtonComponent = {
  (props: ButtonProps<'a'>, ref: AnchorRef): JSX.Element;
  (props: ButtonProps<'button'>, ref: ButtonRef): JSX.Element;
};

type AnchorElementProps = JSX.IntrinsicElements['a'] & { ref?: AnchorRef };
type ButtonElementProps = JSX.IntrinsicElements['button'] & { ref?: ButtonRef };
type AnchorRef = ForwardedRef<HTMLAnchorElement>;
type ButtonRef = ForwardedRef<HTMLButtonElement>;
