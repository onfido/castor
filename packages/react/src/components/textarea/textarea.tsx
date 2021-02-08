import { c, classy, m, TextareaProps as BaseProps } from '@onfido/castor';
import { FieldLabel } from '@onfido/castor-react';
import React, { Fragment } from 'react';
import { withRef } from '../../utils';

export const Textarea = withRef(
  (
    {
      resize = 'vertical',
      rows = 3,
      invalid,
      children,
      className,
      style,
      ...restProps
    }: TextareaProps,
    ref: TextareaProps['ref']
  ): JSX.Element => {
    const Wrapper = children ? FieldLabel : Fragment;

    return (
      <Wrapper>
        {children && <span>{children}</span>}
        <textarea
          {...restProps}
          ref={ref}
          rows={rows}
          className={classy(c('textarea'), m({ invalid }), className)}
          style={{ ...style, resize }}
        />
      </Wrapper>
    );
  }
);
Textarea.displayName = 'Textarea';

export type TextareaProps = BaseProps & JSX.IntrinsicElements['textarea'];
