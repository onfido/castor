import { Textarea, TextareaProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

const resizes: readonly TextareaProps['resize'][] = [
  'vertical',
  'horizontal',
  'both',
  'none',
];
resizes.toString = () => resizes.map((value) => `"${value}"`).join('|');

export default {
  title: 'React/Textarea',
  component: Textarea,
  argTypes: {
    ...omit<TextareaProps>('className', 'style'),
    placeholder: { control: 'text' },
    resize: {
      table: {
        type: {
          summary: resizes.toString(),
        },
        defaultValue: { summary: 'vertical' },
      },
      control: {
        type: 'radio',
        options: resizes,
      },
    },
    rows: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
      control: 'number',
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
    resize: 'vertical',
    rows: 3,
    invalid: false,
    disabled: false,
  },
} as Meta<TextareaProps>;

export const Playground: Story<TextareaProps> = (props: TextareaProps) => (
  <Textarea {...props} />
);

export const Resize = storyOf(Textarea, 'resize', resizes, {
  labelMode: 'prop',
  labelProp: 'defaultValue',
});
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
