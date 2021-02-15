import { color } from '@onfido/castor';
import {
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

export const AsOptional: Story<FieldLabelProps> = ({
  children,
  ...restProps
}: FieldLabelProps) => (
  <FieldLabel {...restProps}>
    <span>
      {children}{' '}
      <abbr style={{ color: color('content-secondary') }}>(optional)</abbr>
    </span>
  </FieldLabel>
);

export const AsRequired: Story<FieldLabelProps> = ({
  children,
  ...restProps
}: FieldLabelProps) => (
  <FieldLabel {...restProps}>
    <span>
      {children}{' '}
      <abbr aria-label="required" style={{ color: color('content-negative') }}>
        *
      </abbr>
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

interface FieldLabelWithInputProps extends FieldLabelProps {
  id: string;
  label: string;
}

export const WithInput = ({
  id,
  label,
  ...restFieldLabelProps
}: FieldLabelWithInputProps) => (
  <>
    <FieldLabel {...restFieldLabelProps} htmlFor={id}>
      {label}
    </FieldLabel>
    <Input id={id} />
  </>
);
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
  ...restFieldLabelProps
}: FieldLabelWithTextareaProps) => (
  <>
    <FieldLabel {...restFieldLabelProps} htmlFor={id}>
      {label}
    </FieldLabel>
    <Textarea id={id} />
  </>
);
WithTextarea.args = {
  id: 'field-label-with-textarea',
  label: 'Label',
};
