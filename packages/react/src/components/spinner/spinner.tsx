import { c, classy, m, SpinnerProps as BaseProps } from '@onfido/castor';
import React from 'react';

export const Spinner = ({
  size = 'large',
  children,
  className,
  ...restProps
}: SpinnerProps): JSX.Element => (
  <LabelWrapper>
    {{
      children,
      element: (
        <div
          {...restProps}
          className={classy(c('spinner'), m(size), className)}
        />
      ),
    }}
  </LabelWrapper>
);

export type SpinnerProps = BaseProps & DivElementProps;

const LabelWrapper = ({
  children: { element, children },
}: LabelWrapperProps): JSX.Element => {
  if (!children) return element;

  return (
    <div className={classy(c('spinner-container'))}>
      {element}
      {children && <div className={classy(c('spinner-label'))}>{children}</div>}
    </div>
  );
};

interface LabelWrapperProps {
  children: {
    children: DivElementProps['children'];
    element: JSX.Element;
  };
}

type DivElementProps = JSX.IntrinsicElements['div'];
