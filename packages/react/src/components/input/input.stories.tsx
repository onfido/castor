import {
  Field,
  FieldLabel,
  HelperText,
  Input,
  InputProps,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

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
type.toString = () => type.map((value) => `"${value}"`).join('|');

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
    label: {
      description: 'Optional label for an `<input>`.',
    },
    placeholder: {
      table: { type: { summary: 'string' } },
    },
    type: {
      control: { type: 'radio', options: type },
      table: {
        type: { summary: type.toString() },
        defaultValue: { summary: 'text' },
      },
    },
  },
  args: {
    disabled: false,
    invalid: false,
    label: 'Label',
    placeholder: 'Placeholder',
    type: 'text',
  },
  parameters: { display: 'flex' },
} as Meta<InputProps>;

export const Playground: Story<InputProps> = (props: InputProps) => (
  <Input {...props} />
);

export const Invalid = reactMatrix(Input, { invalid });
Invalid.argTypes = omit<InputProps>('invalid');

export const Disabled = reactMatrix(Input, { disabled });
Disabled.argTypes = omit<InputProps>('disabled');

export const WithoutLabel = (props: InputProps) => <Input {...props} />;
WithoutLabel.argTypes = omit<InputProps>('label');
WithoutLabel.args = {
  label: undefined,
};

interface InputWithHelperTextProps extends InputProps {
  helperText: string;
}

export const WithHelperText = ({
  label,
  helperText,
  ...restProps
}: InputWithHelperTextProps) => (
  <Field>
    <FieldLabel>
      {label}
      <HelperText>{helperText}</HelperText>
      <Input {...restProps} />
    </FieldLabel>
  </Field>
);
WithHelperText.args = {
  helperText: 'Helper text',
};

interface InputWithValidationProps extends InputProps {
  validation: string;
  withIcon: boolean;
}

export const WithValidation = ({
  validation,
  withIcon,
  ...restProps
}: InputWithValidationProps) => (
  <Field>
    <Input {...restProps} invalid={Boolean(validation)} />
    <Validation state="error" withIcon={withIcon}>
      {validation}
    </Validation>
  </Field>
);
WithValidation.argTypes = omit<InputWithValidationProps>('invalid', 'disabled');
WithValidation.args = {
  validation: 'This field is not valid',
  withIcon: true,
};

export const AllCombinations = reactMatrix(
  Input,
  { disabled, invalid },
  (props) => <Input {...props} value={value(props)} />
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const value = ({ disabled, invalid }: InputProps) =>
  `${invalid ? 'invalid' : 'valid'} ${disabled ? 'disabled' : ''}`;
