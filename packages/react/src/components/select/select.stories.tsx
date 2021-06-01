import {
  Field,
  FieldLabel,
  HelperText,
  Select,
  SelectProps,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

const borderless = [true, false] as const;
const disabled = [true, false] as const;
const invalid = [true, false] as const;

export default {
  title: 'React/Select',
  component: Select,
  argTypes: {
    children: {
      description: 'List of options using `<option>`.',
      control: false,
    },
    borderless: {
      table: { type: { summary: 'boolean' } },
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
  },
  args: {
    children: (
      <>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </>
    ),
    borderless: false,
    disabled: false,
    invalid: false,
    placeholder: 'Placeholder',
  },
  parameters: { display: 'flex' },
} as Meta<SelectProps>;

export const Playground: Story<SelectProps> = (props: SelectProps) => (
  <Select {...props} />
);

export const Borderless = reactMatrix(Select, { borderless });
Borderless.argTypes = omit<SelectProps>('borderless');

export const Invalid = reactMatrix(Select, { invalid });
Invalid.argTypes = omit<SelectProps>('invalid');

export const Disabled = reactMatrix(Select, { disabled });
Disabled.argTypes = omit<SelectProps>('disabled');

interface SelectWithLabelAndHelperTextProps extends SelectProps {
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText = ({
  label,
  helperText,
  ...restProps
}: SelectWithLabelAndHelperTextProps) => (
  <Field>
    <FieldLabel>
      {label}
      <HelperText>{helperText}</HelperText>
      <Select {...restProps} />
    </FieldLabel>
  </Field>
);
WithLabelAndHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

interface SelectWithValidationProps extends SelectProps {
  validation: string;
  withIcon: boolean;
}

export const WithValidation = ({
  validation,
  withIcon,
  ...restProps
}: SelectWithValidationProps) => (
  <Field>
    <Select {...restProps} invalid={Boolean(validation)} />
    <Validation state="error" withIcon={withIcon}>
      {validation}
    </Validation>
  </Field>
);
WithValidation.argTypes = omit<SelectWithValidationProps>(
  'invalid',
  'disabled'
);
WithValidation.args = {
  validation: 'This field is not valid',
  withIcon: true,
};

export const AllCombinations = reactMatrix(
  Select,
  { borderless, disabled, invalid },
  (props) => <Select {...props} placeholder={placeholder(props)} />
);
AllCombinations.argTypes = omit<SelectProps>('children');
AllCombinations.args = {
  children: null,
};
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const placeholder = ({ borderless, disabled, invalid }: SelectProps) =>
  [
    invalid ? 'invalid' : 'valid',
    borderless ? 'borderless' : '',
    disabled ? 'disabled' : '',
  ].join(' ');
