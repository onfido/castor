import {
  Checkbox,
  CheckboxProps,
  Fieldset,
  FieldsetLegend,
  HelperText,
  Validation,
} from '@onfido/castor-react';
import React, { ChangeEvent, useRef } from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

export default {
  title: 'React/Checkbox',
  component: Checkbox,
  argTypes: {
    ...omit<CheckboxProps>('className', 'style'),
    children: {
      description: 'Acts as a label for an `<input>`.',
      control: 'text',
    },
    bordered: {
      table: { type: { summary: 'boolean' } },
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
  },
  args: {
    children: '',
    bordered: false,
    invalid: false,
    disabled: false,
  },
} as Meta<CheckboxProps>;

export const Playground: Story<CheckboxProps> = (props: CheckboxProps) => (
  <Checkbox {...props} />
);

export const Bordered = storyOf(Checkbox, 'bordered', [true, false], {
  labelMode: 'children',
});
Bordered.argTypes = omit<CheckboxProps>('bordered');

export const Invalid = storyOf(Checkbox, 'invalid', [true, false], {
  labelMode: 'children',
});
Invalid.argTypes = omit<CheckboxProps>('invalid');

export const Disabled = storyOf(Checkbox, 'disabled', [true, false], {
  labelMode: 'children',
});
Disabled.argTypes = omit<CheckboxProps>('disabled');

export const AsIndeterminate = (props: CheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const handleChange = ({
    target: { checked: indeterminate },
  }: ChangeEvent<HTMLInputElement>) => {
    if (checkboxRef.current) checkboxRef.current.indeterminate = indeterminate;
  };

  return <Checkbox {...props} ref={checkboxRef} onChange={handleChange} />;
};

interface CheckboxesWithFieldsetLegendProps extends CheckboxProps {
  name: string;
  legend: string;
}

export const WithFieldsetLegend = ({
  name,
  legend,
  ...restCheckboxProps
}: CheckboxesWithFieldsetLegendProps) => (
  <Fieldset>
    <FieldsetLegend>{legend}</FieldsetLegend>
    <Checkbox {...restCheckboxProps} name={name} value="1">
      one
    </Checkbox>
    <Checkbox {...restCheckboxProps} name={name} value="2">
      two
    </Checkbox>
  </Fieldset>
);
WithFieldsetLegend.argTypes = omit<CheckboxesWithFieldsetLegendProps>(
  'children'
);
WithFieldsetLegend.args = {
  name: 'checkboxes-with-fieldset-legend',
  legend: 'Legend',
};

interface CheckboxWithHelperTextProps extends CheckboxProps {
  label: string;
  helperText: string;
}

export const WithHelperText = ({
  label,
  helperText,
  ...restCheckboxProps
}: CheckboxWithHelperTextProps) => (
  <Checkbox {...restCheckboxProps}>
    {label}
    <HelperText>{helperText}</HelperText>
  </Checkbox>
);
WithHelperText.argTypes = omit<CheckboxWithHelperTextProps>('children');
WithHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

interface CheckboxWithValidationProps extends CheckboxProps {
  label: string;
  validation: string;
  withIcon: boolean;
}

export const WithValidation = ({
  label,
  validation,
  withIcon,
  ...restCheckboxProps
}: CheckboxWithValidationProps) => (
  <>
    <Checkbox {...restCheckboxProps} invalid={Boolean(validation)}>
      {label}
    </Checkbox>
    <Validation state="error" withIcon={withIcon}>
      {validation}
    </Validation>
  </>
);
WithValidation.argTypes = omit<CheckboxWithHelperTextProps>(
  'children',
  'invalid',
  'disabled'
);
WithValidation.args = {
  label: 'Label',
  validation: 'This field is not valid',
  withIcon: true,
};
