import { c, classy, m, TextareaProps as BaseProps } from '@onfido/castor';
import { FieldLabel } from '@onfido/castor-react';
import React, { Fragment } from 'react';
import { withRef } from '../../utils';

export const Textarea = withRef(
  (
    {
      id = `${autoIdPrefix}${autoId++}`,
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
    const hasLabel = Boolean(children);
    const Wrapper = hasLabel ? FieldLabel : Fragment;

    return (
      <Wrapper {...{ ...(hasLabel && { htmlFor: id }) }}>
        {hasLabel && <span>{children}</span>}
        <textarea
          {...restProps}
          ref={ref}
          id={id}
          rows={rows}
          className={classy(c('textarea'), m({ invalid }), className)}
          style={{ ...style, resize }}
        />
      </Wrapper>
    );
  }
);
Textarea.displayName = 'Textarea';

const autoIdPrefix = 'castor_textarea_';
let autoId = 0;

export type TextareaProps = BaseProps & JSX.IntrinsicElements['textarea'];
