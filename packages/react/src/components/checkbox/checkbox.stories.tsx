import {
  Checkbox,
  CheckboxProps,
  Field,
  Fieldset,
  FieldsetLegend,
  HelperText,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

const bordered = [true, false] as const;
const disabled = [true, false] as const;
const invalid = [true, false] as const;

export default {
  title: 'React/Checkbox',
  component: Checkbox,
  argTypes: {
    children: { description: 'Acts as a label for the `<input>`.' },
    bordered: { table: { type: { summary: 'boolean' } } },
    disabled: { table: { type: { summary: 'boolean' } } },
    invalid: { table: { type: { summary: 'boolean' } } },
  },
  args: {
    children: '',
    bordered: false,
    disabled: false,
    invalid: false,
  },
  parameters: { display: 'flex' },
} as Meta<CheckboxProps>;

export const Playground: Story<CheckboxProps> = {};

export const Bordered = reactMatrix(Checkbox, { bordered });
export const Invalid = reactMatrix(Checkbox, { invalid });
export const Disabled = reactMatrix(Checkbox, { disabled });

export const AsIndeterminate: Story<CheckboxProps> = {
  render: (props) => (
    <Checkbox
      {...props}
      onChange={(ev) =>
        (ev.currentTarget.indeterminate = ev.currentTarget.checked)
      }
    />
  ),
};

interface CheckboxesWithFieldsetLegendProps extends CheckboxProps {
  name: string;
}

export const WithFieldsetLegend: Story<CheckboxesWithFieldsetLegendProps> = {
  args: {
    name: 'checkboxes-with-fieldset-legend',
  },
  render: ({ ...restProps }) => (
    <Fieldset>
      <FieldsetLegend />
      <Field>
        <Checkbox {...restProps} value="1">
          one
        </Checkbox>
      </Field>
      <Field>
        <Checkbox {...restProps} value="2">
          two
        </Checkbox>
      </Field>
    </Fieldset>
  ),
};

interface CheckboxWithHelperTextProps extends CheckboxProps {
  helperText: string;
}

export const WithHelperText: Story<CheckboxWithHelperTextProps> = {
  args: {
    helperText: 'Helper text',
  },
  render: ({ children, helperText, ...restProps }) => (
    <Field>
      <Checkbox {...restProps}>
        {children}
        <HelperText>{helperText}</HelperText>
      </Checkbox>
    </Field>
  ),
};

interface CheckboxWithValidationProps extends CheckboxProps {
  validation: string;
  withIcon: boolean;
}

export const WithValidation: Story<CheckboxWithValidationProps> = {
  args: {
    validation: 'This field is not valid',
    withIcon: true,
  },
  argTypes: omit('disabled', 'invalid'),
  render: ({ validation, withIcon, ...restProps }) => (
    <Field>
      <Checkbox {...restProps} invalid={Boolean(validation)} />
      <Validation state="error" withIcon={withIcon}>
        {validation}
      </Validation>
    </Field>
  ),
};

export const AllCombinations: Story<CheckboxProps> = {
  ...reactMatrix(
    (props: CheckboxProps) => <Checkbox {...props}>{label(props)}</Checkbox>,
    { bordered, disabled, invalid }
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
};

const label = ({ bordered, disabled, invalid }: CheckboxProps) =>
  [
    invalid ? 'invalid' : 'valid',
    bordered ? 'bordered' : '',
    disabled ? 'disabled' : '',
  ].join(' ');
