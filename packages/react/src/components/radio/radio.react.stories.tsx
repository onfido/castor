import { Description, Radio, RadioProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

export default {
  title: 'React/Radio',
  component: Radio,
  argTypes: {
    children: { control: 'text' },
    bordered: {
      table: { type: { summary: 'boolean' } },
    },
    checked: {
      description: 'When `undefined` fallsback to internal control.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
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
    checked: undefined,
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

interface RadioWithDescriptionProps extends RadioProps {
  label: string;
  description: string;
}

export const WithDescription = ({
  label,
  description,
  disabled,
  ...restRadioProps
}: RadioWithDescriptionProps) => (
  <Radio {...{ ...restRadioProps, disabled }}>
    {label}
    <Description {...{ disabled }}>{description}</Description>
  </Radio>
);
WithDescription.argTypes = omit<RadioWithDescriptionProps>('children');
WithDescription.args = {
  label: 'Label',
  description: 'Description',
};
