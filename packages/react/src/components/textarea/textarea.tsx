import { c, classy, m, TextareaProps as BaseProps } from '@onfido/castor';
import React, { useEffect, useState } from 'react';
import { FieldLabelWrapper } from '../../internal';
import { withRef } from '../../utils';

const idPrefix = 'castor_textarea';
let idCount = 0;

export const Textarea = withRef(
  (
    {
      id: externalId,
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
    const [id, setId] = useState<string | undefined>(externalId);

    useEffect(() => {
      if (externalId || children)
        setId(externalId || `${idPrefix}_${++idCount}`);
    }, [externalId]);

    return (
      <FieldLabelWrapper id={id}>
        {{
          children,
          element: (
            <textarea
              {...restProps}
              ref={ref}
              id={id}
              rows={rows}
              className={classy(c('textarea'), m({ invalid }), className)}
              style={{ ...style, resize }}
            />
          ),
        }}
      </FieldLabelWrapper>
    );
  }
);
Textarea.displayName = 'Textarea';

export type TextareaProps = BaseProps & JSX.IntrinsicElements['textarea'];
