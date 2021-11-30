import {
  Field,
  FieldLabel,
  HelperText,
  Input,
  InputProps,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import {
  Meta,
  omit,
  optionsToSummary,
  reactMatrix,
  Story,
} from '../../../../../docs';

const disabled = [true, false] as const;
const invalid = [true, false] as const;

const type = [
  'text',
  'number',
  'email',
  'password',
  'tel',
  'url',
  'search',
] as const;

export default {
  title: 'React/Input',
  component: Input,
  argTypes: {
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
    placeholder: {
      table: { type: { summary: 'string' } },
    },
    type: {
      control: { type: 'radio', options: type },
      table: {
        type: { summary: optionsToSummary(type) },
        defaultValue: { summary: 'text' },
      },
    },
  },
  args: {
    disabled: false,
    invalid: false,
    placeholder: 'Placeholder',
    type: 'text',
  },
  parameters: { display: 'flex' },
} as Meta<InputProps>;

export const Playground: Story<InputProps> = {};

export const Invalid = reactMatrix(Input, { invalid });
export const Disabled = reactMatrix(Input, { disabled });

interface InputWithLabelAndHelperTextProps extends InputProps {
  id: string;
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText: Story<InputWithLabelAndHelperTextProps> = {
  args: {
    id: 'input-with-label-and-helper-text',
    label: 'Label',
    helperText: 'Helper text',
  },
  render: ({ id, label, helperText, ...restProps }) => (
    <Field>
      <FieldLabel htmlFor={id}>
        {label}
        <HelperText>{helperText}</HelperText>
        <Input {...restProps} id={id} />
      </FieldLabel>
    </Field>
  ),
};

interface InputWithValidationProps extends InputProps {
  validation: string;
  withIcon: boolean;
}

export const WithValidation: Story<InputWithValidationProps> = {
  args: {
    validation: 'This field is not valid',
    withIcon: true,
  },
  argTypes: omit('disabled', 'invalid'),
  render: ({ validation, withIcon, ...restProps }) => (
    <Field>
      <Input {...restProps} invalid={Boolean(validation)} />
      <Validation state="error" withIcon={withIcon}>
        {validation}
      </Validation>
    </Field>
  ),
};

export const AllCombinations: Story<InputProps> = {
  ...reactMatrix(
    (props: InputProps) => <Input {...props} defaultValue={value(props)} />,
    { disabled, invalid }
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
};

const value = ({ disabled, invalid }: InputProps) =>
  `${invalid ? 'invalid' : 'valid'} ${disabled ? 'disabled' : ''}`;
