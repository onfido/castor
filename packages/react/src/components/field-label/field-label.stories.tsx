import { color } from '@onfido/castor';
import {
  Asterisk,
  Field,
  FieldLabel,
  FieldLabelProps,
  HelperText,
  Input,
  Textarea,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story } from '../../../../../docs';

export default {
  title: 'React/FieldLabel',
  component: FieldLabel,
  args: {
    children: 'Label',
  },
} as Meta<FieldLabelProps>;

export const Playground: Story<FieldLabelProps> = (props: FieldLabelProps) => (
  <FieldLabel {...props} />
);

export const AsOptional: Story<FieldLabelProps> = ({
  children,
  ...restProps
}: FieldLabelProps) => (
  <FieldLabel {...restProps}>
    <span>
      {children}{' '}
      <span style={{ color: color('content-secondary') }}>(optional)</span>
    </span>
  </FieldLabel>
);

export const AsRequired: Story<FieldLabelProps> = ({
  children,
  ...restProps
}: FieldLabelProps) => (
  <FieldLabel {...restProps}>
    <span>
      {children}
      <Asterisk />
    </span>
  </FieldLabel>
);

interface FieldLabelWithHelperTextProps extends FieldLabelProps {
  label: string;
  helperText: string;
}

export const WithHelperText = ({
  label,
  helperText,
  ...restProps
}: FieldLabelWithHelperTextProps) => (
  <FieldLabel {...restProps}>
    {label}
    <HelperText>{helperText}</HelperText>
  </FieldLabel>
);
WithHelperText.argTypes = omit<FieldLabelWithHelperTextProps>('children');
WithHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

interface FieldLabelWithInputProps extends FieldLabelProps {
  id: string;
  label: string;
}

export const WithInput = ({
  id,
  label,
  ...restProps
}: FieldLabelWithInputProps) => (
  <Field>
    <FieldLabel {...restProps} htmlFor={id}>
      {label}
    </FieldLabel>
    <Input id={id} />
  </Field>
);
WithInput.argTypes = omit<FieldLabelWithInputProps>('children');
WithInput.args = {
  id: 'field-label-with-input',
  label: 'Label',
};

interface FieldLabelWithTextareaProps extends FieldLabelProps {
  id: string;
  label: string;
}

export const WithTextarea = ({
  id,
  label,
  ...restProps
}: FieldLabelWithTextareaProps) => (
  <Field>
    <FieldLabel {...restProps} htmlFor={id}>
      {label}
    </FieldLabel>
    <Textarea id={id} />
  </Field>
);
WithTextarea.argTypes = omit<FieldLabelWithTextareaProps>('children');
WithTextarea.args = {
  id: 'field-label-with-textarea',
  label: 'Label',
};
