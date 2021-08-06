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
    children: {
      description: 'Acts as a label for an `<input>`.',
    },
    bordered: {
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
  },
  args: {
    children: '',
    bordered: false,
    disabled: false,
    invalid: false,
  },
  parameters: { display: 'flex' },
} as Meta<CheckboxProps>;

export const Playground: Story<CheckboxProps> = (props) => (
  <Checkbox {...props} />
);

export const Bordered = reactMatrix(Checkbox, { bordered });
Bordered.argTypes = omit('bordered');

export const Invalid = reactMatrix(Checkbox, { invalid });
Invalid.argTypes = omit('invalid');

export const Disabled = reactMatrix(Checkbox, { disabled });
Disabled.argTypes = omit('disabled');

export const AsIndeterminate: Story<CheckboxProps> = (props) => (
  <Checkbox
    {...props}
    onChange={(ev) =>
      (ev.currentTarget.indeterminate = ev.currentTarget.checked)
    }
  />
);

interface CheckboxesWithFieldsetLegendProps extends CheckboxProps {
  name: string;
  legend: string;
}

export const WithFieldsetLegend: Story<CheckboxesWithFieldsetLegendProps> = ({
  legend,
  ...restProps
}) => (
  <Fieldset>
    <FieldsetLegend>{legend}</FieldsetLegend>
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
);
WithFieldsetLegend.argTypes = omit('children');
WithFieldsetLegend.args = {
  name: 'checkboxes-with-fieldset-legend',
  legend: 'Legend',
};

interface CheckboxWithHelperTextProps extends CheckboxProps {
  label: string;
  helperText: string;
}

export const WithHelperText: Story<CheckboxWithHelperTextProps> = ({
  label,
  helperText,
  ...restProps
}) => (
  <Field>
    <Checkbox {...restProps}>
      {label}
      <HelperText>{helperText}</HelperText>
    </Checkbox>
  </Field>
);
WithHelperText.argTypes = omit('children');
WithHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

interface CheckboxWithValidationProps extends CheckboxProps {
  label: string;
  validation: string;
  withIcon: boolean;
}

export const WithValidation: Story<CheckboxWithValidationProps> = ({
  validation,
  withIcon,
  ...restProps
}) => (
  <Field>
    <Checkbox {...restProps} invalid={Boolean(validation)} />
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
  Checkbox,
  { bordered, disabled, invalid },
  (props) => <Checkbox {...props}>{label(props)}</Checkbox>
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const label = ({ bordered, disabled, invalid }: CheckboxProps) =>
  [
    invalid ? 'invalid' : 'valid',
    bordered ? 'bordered' : '',
    disabled ? 'disabled' : '',
  ].join(' ');
