import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';
import { Textarea, TextareaProps } from './textarea.react';

export default {
  title: 'React/Textarea',
  component: Textarea,
  argTypes: {
    ...omit<TextareaProps>('className', 'style'),
    placeholder: { control: 'text' },
    rows: {
      control: 'number',
      table: { type: { summary: 'number' }, defaultValue: { summary: '3' } },
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
  },
  args: {
    placeholder: 'Placeholder',
    rows: 3,
    invalid: false,
    disabled: false,
  },
} as Meta<TextareaProps>;

export const Playground: Story<TextareaProps> = (props: TextareaProps) => (
  <Textarea {...props} />
);

export const Resize = storyOf(
  Textarea,
  'resize',
  ['vertical', 'horizontal', 'both', 'none'],
  {
    labelMode: 'prop',
    labelProp: 'defaultValue',
  }
);
Resize.argTypes = omit<TextareaProps>('resize');

export const Invalid = storyOf(Textarea, 'invalid', [true, false], {
  labelMode: 'prop',
  labelProp: 'defaultValue',
});
Invalid.argTypes = omit<TextareaProps>('invalid');

export const Disabled = storyOf(Textarea, 'disabled', [true, false], {
  labelMode: 'prop',
  labelProp: 'defaultValue',
});
Disabled.argTypes = omit<TextareaProps>('disabled');
