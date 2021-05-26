import { ArgType } from './story';

const hidden: ArgType<unknown> = {
  control: 'boolean',
  description: [
    'Indicates whether the element is exposed to an accessibility API.',
    'Either this or `aria-label` required for accessibility.',
  ].join('\n\n'),
  table: { type: { summary: `'true' | 'false'` } },
};

const label: ArgType<unknown> = {
  control: 'text',
  description: [
    'Defines a value that labels the current element.',
    'Either this or `aria-hidden` required for accessibility.',
  ].join('\n\n'),
  table: { type: { summary: 'string' } },
};

export const aria = {
  hidden,
  label,
};
