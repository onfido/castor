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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const native = [true, false] as any;

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
    },
  },
  args: {
    children: (
      <>
        <Option value="">Select an option...</Option>
        <Option value={1}>Option 1</Option>
        <Option value={2}>Option 2</Option>
        <Option value="long">Longer option that’s quite long</Option>
        <Option value="enormous">
          An enormously long option that we truncate when it gets too long for a
          flexible width box
        </Option>
      </>
    ),
    borderless: false,
    disabled: false,
    invalid: false,
    native: false,
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

export const Native = reactMatrix(Select, { native });
Native.argTypes = omit<SelectProps>('native');

export const AsRequired: Story<SelectProps> = (props: SelectProps) => (
  <Select {...props} defaultValue={''} />
);
AsRequired.argTypes = omit<SelectProps>('required');
AsRequired.args = {
  children: (
    <>
      <Option value="" disabled>
        Select an option...
      </Option>
      <Option value={1}>Option 1</Option>
      <Option value={2}>Option 2</Option>
      <Option value={3}>Option 3</Option>
    </>
  ),
  required: true,
};

type SelectWithLabelAndHelperTextProps = SelectProps & {
  id: string;
  label: string;
  helperText: string;
};

export const WithLabelAndHelperText = ({
  id,
  label,
  helperText,
  ...restProps
}: SelectWithLabelAndHelperTextProps) => (
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

type SelectWithValidationProps = SelectProps & {
  validation: string;
  withIcon: boolean;
};

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
  { borderless, disabled, invalid, native },
  (props) => <Select {...props}>{children(props)}</Select>
);
AllCombinations.argTypes = omit<SelectProps>(
  'children',
  'borderless',
  'disabled',
  'invalid',
  'native'
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const children = ({ borderless, disabled, invalid, native }: SelectProps) => {
  const variation = [
    native ? 'native' : 'custom',
    invalid ? 'invalid' : 'valid',
    borderless ? 'borderless' : '',
    disabled ? 'disabled' : '',
  ];
  return <Option value={variation.join('-')}>{variation.join(' ')}</Option>;
};
