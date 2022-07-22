import { color } from '@onfido/castor';
import {
  Asterisk,
  Field,
  FieldLabel,
  FieldLabelProps,
  HelperText,
  Input,
  Option,
  Select,
  Textarea,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, Story } from '../../../../../docs';

export default {
  title: 'React/FieldLabel',
  component: FieldLabel,
  args: {
    children: 'Label',
  },
} as Meta<FieldLabelProps>;

export const Playground: Story<FieldLabelProps> = {};

export const AsOptional: Story<FieldLabelProps> = {
  render: ({ children, ...restProps }) => (
    <FieldLabel {...restProps}>
      <span>
        {children}{' '}
        <span style={{ color: color('content-secondary') }}>(optional)</span>
      </span>
    </FieldLabel>
  ),
};

export const AsRequired: Story<FieldLabelProps> = {
  render: ({ children, ...restProps }) => (
    <FieldLabel {...restProps}>
      <span>
        {children}
        <Asterisk />
      </span>
    </FieldLabel>
  ),
};

interface FieldLabelWithHelperTextProps extends FieldLabelProps {
  helperText: string;
}

export const WithHelperText: Story<FieldLabelWithHelperTextProps> = {
  args: {
    helperText: 'Helper text',
  },
  render: ({ children, helperText, ...restProps }) => (
    <FieldLabel {...restProps}>
      {children}
      <HelperText>{helperText}</HelperText>
    </FieldLabel>
  ),
};

interface FieldLabelWithInputProps extends FieldLabelProps {
  id: string;
}

export const WithInput: Story<FieldLabelWithInputProps> = {
  args: {
    id: 'field-label-with-input',
  },
  render: ({ id, ...restProps }) => (
    <Field>
      <FieldLabel {...restProps} htmlFor={id} />
      <Input id={id} />
    </Field>
  ),
};

interface FieldLabelWithSelectProps extends FieldLabelProps {
  id: string;
}

export const WithSelect: Story<FieldLabelWithSelectProps> = {
  args: {
    id: 'field-label-with-select',
  },
  render: ({ id, ...restProps }) => (
    <Field>
      <FieldLabel {...restProps} htmlFor={id} />
      <Select id={id}>
        <Option hidden>Select an option...</Option>
        <Option value={1}>Option</Option>
        <Option value={2} disabled>
          Disabled option
        </Option>
        <Option value="long">Longer option that is quite long</Option>
        <Option value="enormous">
          An enormously long option that we truncate when it gets too long
        </Option>
      </Select>
    </Field>
  ),
};

interface FieldLabelWithTextareaProps extends FieldLabelProps {
  id: string;
}

export const WithTextarea: Story<FieldLabelWithTextareaProps> = {
  args: {
    id: 'field-label-with-textarea',
  },
  render: ({ id, ...restProps }) => (
    <Field>
      <FieldLabel {...restProps} htmlFor={id} />
      <Textarea id={id} />
    </Field>
  ),
};
