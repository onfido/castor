import { HelperText, Radio, RadioProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

export default {
  title: 'React/Radio',
  component: Radio,
  argTypes: {
    ...omit<RadioProps>('className', 'style'),
    children: { control: 'text' },
    bordered: {
      table: { type: { summary: 'boolean' } },
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
  },
  args: {
    bordered: false,
    invalid: false,
    disabled: false,
  },
} as Meta<RadioProps>;

export const Playground: Story<RadioProps> = (props: RadioProps) => (
  <Radio {...props} />
);

export const Bordered = storyOf(Radio, 'bordered', [true, false], {
  labelMode: 'children',
});
Bordered.argTypes = omit<RadioProps>('bordered');
Bordered.args = { name: 'bordered-playground' };

export const Invalid = storyOf(Radio, 'invalid', [true, false], {
  labelMode: 'children',
});
Invalid.argTypes = omit<RadioProps>('invalid');
Invalid.args = { name: 'invalid-playground' };

export const Disabled = storyOf(Radio, 'disabled', [true, false], {
  labelMode: 'children',
});
Disabled.argTypes = omit<RadioProps>('disabled');
Disabled.args = { name: 'disabled-playground' };

interface RadioWithHelperTextProps extends RadioProps {
  label: string;
  helperText: string;
}

export const WithHelperText = ({
  label,
  helperText,
  ...restRadioProps
}: RadioWithHelperTextProps) => (
  <Radio {...restRadioProps}>
    {label}
    <HelperText>{helperText}</HelperText>
  </Radio>
);
WithHelperText.argTypes = omit<RadioWithHelperTextProps>('children');
WithHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};
