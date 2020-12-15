import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../docs';
import { Input, InputProps } from './input.react';

export default {
  title: 'React/Input',
  component: Input,
  argTypes: {
    ...omit<InputProps>('className', 'style'),
    placeholder: { control: 'text' },
    maxLength: {
      control: 'number',
      table: { type: { summary: 'number' } },
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
    invalid: false,
    disabled: false,
  },
} as Meta<InputProps>;

export const Playground: Story<InputProps> = (props: InputProps) => (
  <Input {...props} />
);

export const Invalid = storyOf(Input, 'invalid', [true, false], {
  labelMode: 'prop',
  labelProp: 'defaultValue',
});
Invalid.argTypes = omit<InputProps>('invalid');

export const Disabled = storyOf(Input, 'disabled', [true, false], {
  labelMode: 'prop',
  labelProp: 'defaultValue',
});
Disabled.argTypes = omit<InputProps>('disabled');
