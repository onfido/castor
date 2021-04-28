import { c, classy, m, TextareaProps as BaseProps } from '@onfido/castor';
import { useField } from '@onfido/castor-react';
import React, { ReactNode, useState } from 'react';
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
      label: externalLabel,
      children,
      className,
      style,
      ...restProps
    }: TextareaProps,
    ref: TextareaProps['ref']
  ): JSX.Element => {
    const { disabled, touched } = useField();
    const label = externalLabel || children;
    const [autoId] = useState(() => `${idPrefix}_${++idCount}`);
    const id = externalId || (label ? autoId : undefined);

    return (
      <FieldLabelWrapper id={id}>
        {{
          label,
          element: (
            <textarea
              disabled={disabled} // will be overriden by props if set
              {...restProps}
              ref={ref}
              id={id}
              rows={rows}
              className={classy(
                c('textarea'),
                m({ invalid, touched }),
                className
              )}
              style={{ ...style, resize }}
            />
          ),
        }}
      </FieldLabelWrapper>
    );
  }
);
Textarea.displayName = 'Textarea';

export type TextareaProps = BaseProps &
  Omit<TextareaElementProps, 'children'> & {
    /** @deprecated Use `label` prop instead */
    children?: TextareaElementProps['children'];
    label?: ReactNode;
  };

type TextareaElementProps = JSX.IntrinsicElements['textarea'];
