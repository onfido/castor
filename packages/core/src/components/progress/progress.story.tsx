import { c, classy, m, ProgressProps as BaseProps } from '@onfido/castor';
import { html } from '../../../../../docs';

export interface ProgressProps extends BaseProps {
  children?: string | null;
  'aria-valuetext'?: string;
}

export const Progress = ({
  value,
  min = 0,
  max = 100,
  size,
  hideLabel,
  children,
  'aria-valuetext': ariaValuetext,
  ...props
}: ProgressProps) => {
  const percentValue = `${Math.round(((value - min) * 100) / (max - min))}%`;
  return html('div', {
    ...props,
    class: classy(c('progress'), m(size)),
    role: 'progressbar',
    'aria-valuenow': String(value),
    'aria-valuemin': String(min),
    'aria-valuemax': String(max),
    'aria-valuetext':
      ariaValuetext || (typeof children === 'string' ? children : undefined),
    style: `--percent-value: ${percentValue}`,
    children: [!hideLabel ? children || percentValue : undefined],
  });
};
