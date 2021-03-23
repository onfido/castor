import { TextareaProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy, m } from '../../utils';

export interface TextareaProps extends BaseProps {
  children: string;
  rows?: number;
}

export const Textarea = ({ resize, rows, invalid, ...props }: TextareaProps) =>
  html('textarea', {
    ...props,
    class: classy(c('textarea'), m({ invalid })),
    rows,
    style: `resize: ${resize}`,
  });
