import { SpinnerProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';
import { c, classy, m } from '../../utils';

export interface SpinnerProps extends BaseProps {
  children: string;
}

export const Spinner = ({ size = 'large', children, ...props }: SpinnerProps) =>
  LabelWrapper({
    children,
    element: html('div', {
      ...props,
      class: classy(c('spinner'), m(size)),
    }),
  });

const LabelWrapper = ({ element, children }: LabelWrapperProps) => {
  if (!children) return element;

  return html('div', {
    class: classy(c('spinner-container')),
    children: [
      element,
      html('div', {
        class: classy(c('spinner-label')),
        children,
      }),
    ].join('\n'),
  });
};

interface LabelWrapperProps {
  children: string;
  element: string;
}
