import { c, classy, m, ValidationProps as BaseProps } from '@onfido/castor';
import { Icon, useField } from '@onfido/castor-react';
import React from 'react';
import { withRef } from '../../utils';

/**
 * Intended to be used alongside field components.
 *
 * `Validation` when `withIcon` prop is enabled uses an `Icon` component that
 * requires `Icons` (SVG sprite) to be included in your app.
 *
 * https://github.com/onfido/castor-icons#use-with-plain-code
 */
export const Validation = withRef(function Validation(
  {
    if: key,
    state,
    withIcon,
    children,
    className,
    ...restProps
  }: ValidationProps,
  ref: ValidationProps['ref']
) {
  const { disabled, touched, validity } = useField();

  if (key)
    if (
      disabled ||
      !touched ||
      validity.valid ||
      (key === 'invalid') === validity[key as keyof ValidityState]
    )
      return null;

  return (
    <div
      {...restProps}
      ref={ref}
      className={classy(c('validation'), m(state), className)}
    >
      {withIcon && <Icon name="error" aria-hidden="true" />}
      {children}
    </div>
  );
});

export type ValidationProps = BaseProps & JSX.IntrinsicElements['div'];
