import { c, classy, m, ProgressProps } from '@onfido/castor';
import { html } from '../../../../../docs';

export const Progress = ({
  size,
  value,
  max = 100,
  hideLabel,
  children,
  ...props
}: ProgressProps) =>
  html('div', {
    ...props,
    class: classy(c('progress'), m(size)),
    role: 'progressbar',
    'aria-valuenow': String(value),
    'aria-valuemin': String(0),
    'aria-valuemax': String(max),
    'aria-valuetext': !hideLabel && children ? children : undefined,
    children: [
      html('div', {
        class: classy(c('progress-background'), m(size)),
        children: [
          html('div', {
            class: classy(c('progress-indicator')),
            style: `width: ${Math.round((value / max) * 100)}%`,
          }),
        ],
      }),
      !hideLabel
        ? html('div', {
            class: classy(c('progress-label'), m(size)),
            children: children || `${Math.round((value / max) * 100)}%`,
          })
        : undefined,
    ],
  });
