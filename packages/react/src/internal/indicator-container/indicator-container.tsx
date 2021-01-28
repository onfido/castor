import { c, classy, m } from '@onfido/castor';
import { IndicatorContainerProps as BaseProps } from '@onfido/castor/src/internal';
import React from 'react';

/**
 * Container for `Checkbox` and `Radio` input components, adding custom
 * indicator within <label> element.
 */
export const IndicatorContainer = ({
  bordered,
  children: { input, children },
  className,
  ...restProps
}: IndicatorContainerProps): JSX.Element => (
  <label
    {...restProps}
    className={classy(c('input-label'), m({ bordered }), className)}
  >
    {input}
    <span className={classy(c('input-indicator'))} aria-hidden="true" />
    {children && <span>{children}</span>}
  </label>
);

export type IndicatorContainerProps = BaseProps &
  Omit<LabelElementProps, 'children'> & {
    children: {
      children: LabelElementProps['children'];
      input: JSX.IntrinsicElements['input'];
    };
  };

type LabelElementProps = JSX.IntrinsicElements['label'];
