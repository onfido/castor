import {
  Field,
  Fieldset,
  FieldsetLegend,
  HelperText,
  Radio,
  RadioProps,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

const bordered = [true, false] as const;
const disabled = [true, false] as const;
const invalid = [true, false] as const;

export default {
  title: 'React/Radio',
  component: Radio,
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
} as Meta<RadioProps>;

export const Playground: Story<RadioProps> = {};

export const Bordered = reactMatrix(Radio, { bordered });
export const Invalid = reactMatrix(Radio, { invalid });
export const Disabled = reactMatrix(Radio, { disabled });

interface RadiosWithFieldsetLegendProps extends RadioProps {
  name: string;
  legend: string;
}

export const WithFieldsetLegend: Story<RadiosWithFieldsetLegendProps> = {
  args: {
    name: 'radios-with-fieldset-legend',
    legend: 'Legend',
  },
  argTypes: omit('children'),
  render: ({ legend, ...restProps }) => (
    <Fieldset>
      <FieldsetLegend>{legend}</FieldsetLegend>
      <Field>
        <Radio {...restProps} value="yes">
          yes
        </Radio>
      </Field>
      <Field>
        <Radio {...restProps} value="no">
          no
        </Radio>
      </Field>
    </Fieldset>
  ),
};

interface RadioWithHelperTextProps extends RadioProps {
  label: string;
  helperText: string;
}

export const WithHelperText: Story<RadioWithHelperTextProps> = {
  args: {
    label: 'Label',
    helperText: 'Helper text',
  },
  argTypes: omit('children'),
  render: ({ label, helperText, ...restProps }) => (
    <Field>
      <Radio {...restProps}>
        {label}
        <HelperText>{helperText}</HelperText>
      </Radio>
    </Field>
  ),
};

interface RadioWithValidationProps extends RadioProps {
  validation: string;
  withIcon: boolean;
}

export const WithValidation: Story<RadioWithValidationProps> = {
  args: {
    validation: 'This field is not valid',
    withIcon: true,
  },
  argTypes: omit('disabled', 'invalid'),
  render: ({ validation, withIcon, ...restProps }) => (
    <Field>
      <Radio {...restProps} invalid={Boolean(validation)} />
      <Validation state="error" withIcon={withIcon}>
        {validation}
      </Validation>
    </Field>
  ),
};

export const AllCombinations: Story<RadioProps> = {
  ...reactMatrix(
    (props: RadioProps) => <Radio {...props}>{label(props)}</Radio>,
    { bordered, disabled, invalid }
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
};

const label = ({ bordered, disabled, invalid }: RadioProps) =>
  [
    invalid ? 'invalid' : 'valid',
    bordered ? 'bordered' : '',
    disabled ? 'disabled' : '',
  ].join(' ');
