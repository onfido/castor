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
    ...omit('className', 'style'),
    children: { control: 'text' },
  },
  args: {
    children: 'Legend',
  },
} as Meta<FieldsetLegendProps>;

export const Playground: Story<FieldsetLegendProps> = {
  render: (props) => (
    <Fieldset>
      <FieldsetLegend {...props} />
    </Fieldset>
  ),
};

export const AsOptional: Story<FieldsetLegendProps> = {
  render: ({ children, ...restProps }) => (
    <Fieldset>
      <FieldsetLegend {...restProps}>
        <span>
          {children}{' '}
          <span style={{ color: color('content-secondary') }}>(optional)</span>
        </span>
      </FieldsetLegend>
    </Fieldset>
  ),
};

export const AsRequired: Story<FieldsetLegendProps> = {
  render: ({ children, ...restProps }) => (
    <Fieldset>
      <FieldsetLegend {...restProps}>
        <span>
          {children}
          <Asterisk />
        </span>
      </FieldsetLegend>
    </Fieldset>
  ),
};

interface FieldsetLegendWithHelperTextProps extends FieldsetLegendProps {
  helperText: string;
}

export const WithHelperText: Story<FieldsetLegendWithHelperTextProps> = {
  args: {
    helperText: 'Helper text',
  },
  render: ({ children, helperText, ...restFieldsetLegendProps }) => (
    <Fieldset>
      <FieldsetLegend {...restFieldsetLegendProps}>
        {children}
        <HelperText>{helperText}</HelperText>
      </FieldsetLegend>
    </Fieldset>
  ),
};

interface FieldsetLegendWithCheckboxesProps extends FieldsetLegendProps {
  name: string;
}

export const WithCheckboxes: Story<FieldsetLegendWithCheckboxesProps> = {
  args: {
    name: 'fieldset-legend-with-checkboxes',
  },
  render: ({ name, ...restProps }) => (
    <Fieldset>
      <FieldsetLegend {...restProps} />
      <Checkbox name={name} value="1">
        one
      </Checkbox>
      <Checkbox name={name} value="2">
        two
      </Checkbox>
    </Fieldset>
  ),
};

interface FieldsetLegendWithRadiosProps extends FieldsetLegendProps {
  name: string;
}

export const WithRadios: Story<FieldsetLegendWithRadiosProps> = {
  args: {
    name: 'fieldset-legend-with-radios',
  },
  render: ({ name, ...restProps }) => (
    <Fieldset>
      <FieldsetLegend {...restProps} />
      <Radio name={name} value="yes">
        yes
      </Radio>
      <Radio name={name} value="no">
        no
      </Radio>
    </Fieldset>
  ),
};
