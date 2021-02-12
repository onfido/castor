import {
  Field,
  HelperText,
  Input,
  InputProps,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

export default {
  title: 'React/Input',
  component: Input,
  argTypes: {
    ...omit<InputProps>('className', 'style'),
    children: {
      description: 'Acts as a label for an `<input>`.',
      control: 'text',
    },
    placeholder: { control: 'text' },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
  },
  args: {
    children: 'Label',
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

interface InputWithHelperTextProps extends InputProps {
  label: string;
  helperText: string;
}

export const WithHelperText = ({
  label,
  helperText,
  ...restInputProps
}: InputWithHelperTextProps) => (
  <Field>
    <Input {...restInputProps}>
      {label}
      <HelperText>{helperText}</HelperText>
    </Input>
  </Field>
);
WithHelperText.argTypes = omit<InputWithHelperTextProps>('children');
WithHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

interface InputWithValidationProps extends InputProps {
  label: string;
  validation: string;
  withIcon: boolean;
}

export const WithValidation = ({
  label,
  validation,
  withIcon,
  ...restInputProps
}: InputWithValidationProps) => (
  <Field>
    <Input {...restInputProps} invalid={Boolean(validation)}>
      {label}
    </Input>
    <Validation withIcon={withIcon}>{validation}</Validation>
  </Field>
);
WithValidation.argTypes = omit<InputWithHelperTextProps>(
  'children',
  'invalid',
  'disabled'
);
WithValidation.args = {
  label: 'Label',
  validation: 'This field is not valid',
  withIcon: true,
};
