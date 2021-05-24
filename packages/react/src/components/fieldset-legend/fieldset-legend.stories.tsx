import { color } from '@onfido/castor';
import {
  Asterisk,
  Checkbox,
  Fieldset,
  FieldsetLegend,
  FieldsetLegendProps,
  HelperText,
  Radio,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story } from '../../../../../docs';

export default {
  title: 'React/FieldsetLegend',
  component: FieldsetLegend,
  argTypes: {
    ...omit<FieldsetLegendProps>('className', 'style'),
    children: { control: 'text' },
  },
  args: {
    children: 'Legend',
  },
} as Meta<FieldsetLegendProps>;

export const Playground: Story<FieldsetLegendProps> = (
  props: FieldsetLegendProps
) => (
  <Fieldset>
    <FieldsetLegend {...props} />
  </Fieldset>
);

export const AsOptional: Story<FieldsetLegendProps> = ({
  children,
  ...restProps
}: FieldsetLegendProps) => (
  <Fieldset>
    <FieldsetLegend {...restProps}>
      <span>
        {children}{' '}
        <span style={{ color: color('content-secondary') }}>(optional)</span>
      </span>
    </FieldsetLegend>
  </Fieldset>
);

export const AsRequired: Story<FieldsetLegendProps> = ({
  children,
  ...restProps
}: FieldsetLegendProps) => (
  <Fieldset>
    <FieldsetLegend {...restProps}>
      <span>
        {children}
        <Asterisk />
      </span>
    </FieldsetLegend>
  </Fieldset>
);

interface FieldsetLegendWithHelperTextProps extends FieldsetLegendProps {
  legend: string;
  helperText: string;
}

export const WithHelperText = ({
  legend,
  helperText,
  ...restFieldsetLegendProps
}: FieldsetLegendWithHelperTextProps) => (
  <Fieldset>
    <FieldsetLegend {...restFieldsetLegendProps}>
      {legend}
      <HelperText>{helperText}</HelperText>
    </FieldsetLegend>
  </Fieldset>
);
WithHelperText.argTypes = omit<FieldsetLegendWithHelperTextProps>('children');
WithHelperText.args = {
  legend: 'Legend',
  helperText: 'Helper text',
};

interface FieldsetLegendWithCheckboxesProps extends FieldsetLegendProps {
  name: string;
  legend: string;
}

export const WithCheckboxes = ({
  name,
  legend,
  ...restFieldsetLegendProps
}: FieldsetLegendWithCheckboxesProps) => (
  <Fieldset>
    <FieldsetLegend {...restFieldsetLegendProps}>{legend}</FieldsetLegend>
    <Checkbox name={name} value="1">
      one
    </Checkbox>
    <Checkbox name={name} value="2">
      two
    </Checkbox>
  </Fieldset>
);
WithCheckboxes.argTypes = omit<FieldsetLegendWithCheckboxesProps>('children');
WithCheckboxes.args = {
  name: 'fieldset-legend-with-checkboxes',
  legend: 'Legend',
};

interface FieldsetLegendWithRadiosProps extends FieldsetLegendProps {
  name: string;
  legend: string;
}

export const WithRadios = ({
  name,
  legend,
  ...restFieldsetLegendProps
}: FieldsetLegendWithRadiosProps) => (
  <Fieldset>
    <FieldsetLegend {...restFieldsetLegendProps}>{legend}</FieldsetLegend>
    <Radio name={name} value="yes">
      yes
    </Radio>
    <Radio name={name} value="no">
      no
    </Radio>
  </Fieldset>
);
WithRadios.argTypes = omit<FieldsetLegendWithRadiosProps>('children');
WithRadios.args = {
  name: 'fieldset-legend-with-radios',
  legend: 'Legend',
};
