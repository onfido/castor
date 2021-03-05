import { TextareaProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy, m } from '../../utils';

export interface TextareaProps extends BaseProps {
  rows?: number;
  value?: string;
}

export const Textarea = ({
  resize = 'vertical',
  rows = 3,
  invalid,
  ...props
}: TextareaProps) =>
  html('textarea', {
    ...props,
    class: classy(c('textarea'), m({ invalid })),
    rows,
    style: `resize: ${resize}`,
  });
