import { IconChevronDown } from '@onfido/castor-icons';
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
    ...omit<CustomSelectProps>('open', 'onOpenChange'),
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
        <Option hidden value="">
          Select an option...
        </Option>
        <Option value={1}>Option 1</Option>
        <Option value={2}>Option 2</Option>
        <Option value="long">Longer option that is quite long</Option>
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

export const Playground: Story<SelectProps> = {};

export const InlineIcon: Story<SelectProps> = {
  render: (props) => <Select {...props} icon={<IconChevronDown />} />,
  parameters: {
    docs: {
      source: {
        code: `
import { IconChevronDown } from '@onfido/castor-icons';

<Select icon={<IconChevronDown />}>
  {/* options */}
</Select>
`,
      },
    },
  },
};
IconChevronDown.displayName = 'IconChevronDown';

export const Borderless = reactMatrix(Select, { borderless });
export const Invalid = reactMatrix(Select, { invalid });
export const Disabled = reactMatrix(Select, { disabled });
export const Native = reactMatrix(Select, { native });

export const OptionGroups: Story<SelectProps> = {
  args: {
    children: (
      <>
        <Option hidden value="">
          Select an animal...
        </Option>
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
  },
};

export const AsRequired: Story<SelectProps> = {
  args: {
    required: true,
  },
  argTypes: omit('required'),
};

type SelectWithLabelAndHelperTextProps = SelectProps & {
  id: string;
  label: string;
  helperText: string;
};

export const WithLabelAndHelperText: Story<SelectWithLabelAndHelperTextProps> =
  {
    args: {
      id: 'select-with-label-and-helper-text',
      label: 'Label',
      helperText: 'Helper text',
    },
    render: ({ id, label, helperText, ...restProps }) => (
      <Field>
        <FieldLabel htmlFor={id}>
          {label}
          <HelperText>{helperText}</HelperText>
          <Select {...restProps} id={id} />
        </FieldLabel>
      </Field>
    ),
  };

type SelectWithValidationProps = SelectProps & {
  validation: string;
  withIcon: boolean;
};

export const WithValidation: Story<SelectWithValidationProps> = {
  argTypes: omit('disabled', 'invalid'),
  render: (props) => (
    <Field>
      <Select {...props} invalid />
      <Validation state="error" withIcon>
        Please select an option
      </Validation>
    </Field>
  ),
};

export const AllCombinations: Story<SelectProps> = {
  ...reactMatrix(
    (props: SelectProps) => <Select {...props}>{children(props)}</Select>,
    { borderless, disabled, invalid, native }
  ),
  argTypes: omit('borderless', 'children', 'disabled', 'invalid', 'native'),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
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
