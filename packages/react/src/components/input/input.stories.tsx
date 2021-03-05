import {
  Field,
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
    children: {
      description: 'Acts as a label for an `<input>`.',
    },
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
        type: { summary: type.toString() },
        defaultValue: { summary: 'text' },
      },
    },
  },
  args: {
    children: 'Label',
    disabled: false,
    invalid: false,
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
WithoutLabel.argTypes = omit<InputProps>('children');
WithoutLabel.args = {
  children: null,
};

interface InputWithHelperTextProps extends InputProps {
  label: string;
  helperText: string;
}

export const WithHelperText = ({
  label,
  helperText,
  ...restProps
}: InputWithHelperTextProps) => (
  <Field>
    <Input {...restProps}>
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
WithValidation.argTypes = omit<InputWithHelperTextProps>('invalid', 'disabled');
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
