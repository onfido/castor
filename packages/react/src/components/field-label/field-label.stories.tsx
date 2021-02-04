import { FieldLabel, FieldLabelProps, HelperText } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story } from '../../../../../docs';

export default {
  title: 'React/FieldLabel',
  component: FieldLabel,
  argTypes: {
    ...omit<FieldLabelProps>('className', 'style'),
    children: { control: 'text' },
  },
  args: {
    children: 'Label',
  },
} as Meta<FieldLabelProps>;

export const Playground: Story<FieldLabelProps> = (props: FieldLabelProps) => (
  <FieldLabel {...props} />
);

interface FieldLabelWithHelperTextProps extends FieldLabelProps {
  label: string;
  helperText: string;
}

export const WithHelperText = ({
  label,
  helperText,
  ...restFieldLabelProps
}: FieldLabelWithHelperTextProps) => (
  <FieldLabel {...restFieldLabelProps}>
    {label}
    <HelperText>{helperText}</HelperText>
  </FieldLabel>
);
WithHelperText.argTypes = omit<FieldLabelWithHelperTextProps>('children');
WithHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};
