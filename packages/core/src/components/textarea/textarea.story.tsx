import { TextareaProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy, m } from '../../utils';

export interface TextareaProps extends BaseProps {
  children?: string;
  id?: string;
  rows?: number;
}

export const Textarea = ({
  id,
  resize,
  rows,
  invalid,
  ...props
}: TextareaProps) =>
  html('textarea', {
    ...props,
    class: classy(c('textarea'), m({ invalid })),
    id,
    rows,
    style: resize && `resize: ${resize}`,
  });
