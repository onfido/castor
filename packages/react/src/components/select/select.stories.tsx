import {
  Field,
  FieldLabel,
  HelperText,
  Option,
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
      description: [
        'List of options using `Option`.',
        'Set value as `""` to style selection as "empty" (for placeholder).',
      ].join('\n\n'),
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
    native: {
      table: { type: { summary: 'boolean' } },
      control: false,
    },
  },
  args: {
    children: (
      <>
        <Option value="">Select an option...</Option>
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
      </>
    ),
    borderless: false,
    disabled: false,
    invalid: false,
    native: true,
  },
  parameters: { display: 'flex' },
} as Meta<SelectProps>;

export const Playground: Story<SelectProps> = (props) => <Select {...props} />;

export const Borderless = reactMatrix(Select, { borderless });
Borderless.argTypes = omit('borderless');

export const Invalid = reactMatrix(Select, { invalid });
Invalid.argTypes = omit('invalid');

export const Disabled = reactMatrix(Select, { disabled });
Disabled.argTypes = omit('disabled');

export const AsRequired: Story<SelectProps> = (props) => (
  <Select {...props} defaultValue={''} />
);
AsRequired.args = {
  children: (
    <>
      <Option value="" disabled>
        Select an option...
      </Option>
      <Option>Option 1</Option>
      <Option>Option 2</Option>
      <Option>Option 3</Option>
    </>
  ),
  required: true,
};

interface SelectWithLabelAndHelperTextProps extends SelectProps {
  id: string;
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText: Story<SelectWithLabelAndHelperTextProps> =
  ({ id, label, helperText, ...restProps }) => (
    <Field>
      <FieldLabel htmlFor={id}>
        {label}
        <HelperText>{helperText}</HelperText>
        <Select {...restProps} id={id} />
      </FieldLabel>
    </Field>
  );
WithLabelAndHelperText.args = {
  id: 'select-with-label-and-helper-text',
  label: 'Label',
  helperText: 'Helper text',
};

interface SelectWithValidationProps extends SelectProps {
  validation: string;
  withIcon: boolean;
}

export const WithValidation: Story<SelectWithValidationProps> = ({
  validation,
  withIcon,
  ...restProps
}) => (
  <Field>
    <Select {...restProps} invalid={Boolean(validation)} />
    <Validation state="error" withIcon={withIcon}>
      {validation}
    </Validation>
  </Field>
);
WithValidation.argTypes = omit('disabled', 'invalid');
WithValidation.args = {
  validation: 'This field is not valid',
  withIcon: true,
};

export const AllCombinations = reactMatrix(
  Select,
  { borderless, disabled, invalid },
  (props) => <Select {...props}>{children(props)}</Select>
);
AllCombinations.argTypes = omit('children');
AllCombinations.args = {
  children: null,
};
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const children = ({ borderless, disabled, invalid }: SelectProps) => (
  <Option>
    {[
      invalid ? 'invalid' : 'valid',
      borderless ? 'borderless' : '',
      disabled ? 'disabled' : '',
    ].join(' ')}
  </Option>
);
