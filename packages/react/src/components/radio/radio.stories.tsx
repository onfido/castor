import {
  HelperText,
  Radio,
  RadioProps,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

export default {
  title: 'React/Radio',
  component: Radio,
  argTypes: {
    ...omit<RadioProps>('className', 'style'),
    children: {
      description: 'Acts as a label for an `<input>`.',
      control: 'text',
    },
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
    children: '',
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

interface RadioWithValidationProps extends RadioProps {
  label: string;
  validation: string;
  showIcon: boolean;
}

export const WithValidation = ({
  label,
  validation,
  showIcon,
  ...restRadioProps
}: RadioWithValidationProps) => (
  <>
    <Radio {...restRadioProps} invalid={Boolean(validation)}>
      {label}
    </Radio>
    <Validation showIcon={showIcon}>{validation}</Validation>
  </>
);
WithValidation.argTypes = omit<RadioWithHelperTextProps>(
  'children',
  'invalid',
  'disabled'
);
WithValidation.args = {
  label: 'Label',
  validation: 'This field is not valid',
  showIcon: true,
};
