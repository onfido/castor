import {
  Field,
  FieldLabel,
  HelperText,
  Option,
  OptionGroup,
  Select,
  SelectProps,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';
import { CustomSelectProps } from './custom';

const borderless = [true, false] as const;
const disabled = [true, false] as const;
const invalid = [true, false] as const;
const native = [true, false] as readonly true[];

export default {
  title: 'React/Select',
  component: Select,
  argTypes: {
    ...omit<CustomSelectProps>('open', 'onOpenChange', 'onSelectOption'),
    align: {
      control: 'inline-radio',
      table: { defaultValue: { summary: 'start' } },
    },
    borderless: {},
    children: {
      control: false,
      description: 'List of options using `Option`.',
    },
    disabled: {},
    invalid: {},
    native: {},
    position: {
      control: 'inline-radio',
      table: { defaultValue: { summary: 'bottom' } },
    },
  },
  args: {
    children: (
      <>
        <Option disabled value="">
          Select an option...
        </Option>
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

export const Playground: Story<SelectProps> = (props) => (
  <Select {...props} defaultValue={props.native ? '' : undefined} />
);

export const Borderless = reactMatrix(Select, { borderless });
Borderless.argTypes = omit('borderless');

export const Invalid = reactMatrix(Select, { invalid });
Invalid.argTypes = omit('invalid');

export const Disabled = reactMatrix(Select, { disabled });
Disabled.argTypes = omit('disabled');

export const Native = reactMatrix(Select, { native });
Native.argTypes = omit('native');

export const OptionGroups: Story<SelectProps> = (props) => (
  <Select {...props} />
);
OptionGroups.argTypes = omit('required');
OptionGroups.args = {
  children: (
    <>
      <Option disabled>Select an animal...</Option>
      <OptionGroup label="Birds">
        <Option value="chicken">Chicken</Option>
        <Option value="ostrich">Ostrich</Option>
      </OptionGroup>
      <OptionGroup label="Mammals">
        <Option value="monkey">Monkey</Option>
        <Option value="whale">Whale</Option>
      </OptionGroup>
    </>
  ),
  required: true,
};

export const AsRequired: Story<SelectProps> = (props) => <Select {...props} />;
AsRequired.argTypes = omit('required');
AsRequired.args = {
  required: true,
};

type SelectWithLabelAndHelperTextProps = SelectProps & {
  id: string;
  label: string;
  helperText: string;
};

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

type SelectWithValidationProps = SelectProps & {
  validation: string;
  withIcon: boolean;
};

export const WithValidation: Story<SelectWithValidationProps> = (props) => (
  <Field>
    <Select {...props} invalid />
    <Validation state="error" withIcon>
      Please select an option
    </Validation>
  </Field>
);
WithValidation.argTypes = omit('disabled', 'invalid');

export const AllCombinations = reactMatrix(
  Select,
  { borderless, disabled, invalid, native },
  (props) => <Select {...props}>{children(props)}</Select>
);
AllCombinations.args = {
  children: null,
};
AllCombinations.argTypes = omit(
  'borderless',
  'children',
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
    native && 'native',
    invalid && 'invalid',
    borderless && 'borderless',
    disabled && 'disabled',
  ]
    .filter(Boolean)
    .join(' ');
  return <Option value={variation}>{variation || 'default'}</Option>;
};
