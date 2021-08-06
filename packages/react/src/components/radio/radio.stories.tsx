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

export const Playground: Story<RadioProps> = (props) => <Radio {...props} />;

export const Bordered = reactMatrix(Radio, { bordered });
Bordered.argTypes = omit('bordered');

export const Invalid = reactMatrix(Radio, { invalid });
Invalid.argTypes = omit('invalid');

export const Disabled = reactMatrix(Radio, { disabled });
Disabled.argTypes = omit('disabled');

interface RadiosWithFieldsetLegendProps extends RadioProps {
  name: string;
  legend: string;
}

export const WithFieldsetLegend: Story<RadiosWithFieldsetLegendProps> = ({
  legend,
  ...restProps
}) => (
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
);
WithFieldsetLegend.argTypes = omit('children');
WithFieldsetLegend.args = {
  name: 'radios-with-fieldset-legend',
  legend: 'Legend',
};

interface RadioWithHelperTextProps extends RadioProps {
  label: string;
  helperText: string;
}

export const WithHelperText: Story<RadioWithHelperTextProps> = ({
  label,
  helperText,
  ...restProps
}) => (
  <Field>
    <Radio {...restProps}>
      {label}
      <HelperText>{helperText}</HelperText>
    </Radio>
  </Field>
);
WithHelperText.argTypes = omit('children');
WithHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

interface RadioWithValidationProps extends RadioProps {
  validation: string;
  withIcon: boolean;
}

export const WithValidation: Story<RadioWithValidationProps> = ({
  validation,
  withIcon,
  ...restProps
}) => (
  <Field>
    <Radio {...restProps} invalid={Boolean(validation)} />
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
  Radio,
  { bordered, disabled, invalid },
  (props) => <Radio {...props}>{label(props)}</Radio>
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const label = ({ bordered, disabled, invalid }: RadioProps) =>
  [
    invalid ? 'invalid' : 'valid',
    bordered ? 'bordered' : '',
    disabled ? 'disabled' : '',
  ].join(' ');
