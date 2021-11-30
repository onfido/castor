import {
  Field,
  FieldLabel,
  HelperText,
  Textarea,
  TextareaProps,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import {
  Meta,
  omit,
  optionsToSummary,
  reactMatrix,
  Story,
} from '../../../../../docs';

const disabled = [true, false] as const;
const invalid = [true, false] as const;
const resize = ['vertical', 'horizontal', 'both', 'none'] as const;

export default {
  title: 'React/Textarea',
  component: Textarea,
  argTypes: {
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
    placeholder: {
      table: { type: { summary: 'string' } },
    },
    resize: {
      control: { type: 'radio', options: resize },
      table: {
        type: { summary: optionsToSummary(resize) },
        defaultValue: { summary: 'vertical' },
      },
    },
    rows: {
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
  },
  args: {
    disabled: false,
    invalid: false,
    placeholder: 'Placeholder',
    resize: 'vertical',
    rows: 3,
  },
  parameters: { display: 'flex' },
} as Meta<TextareaProps>;

export const Playground: Story<TextareaProps> = {};

export const Resize = reactMatrix(Textarea, { resize });
export const Invalid = reactMatrix(Textarea, { invalid });
export const Disabled = reactMatrix(Textarea, { disabled });

interface TextareaWithLabelAndHelperTextProps extends TextareaProps {
  id: string;
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText: Story<TextareaWithLabelAndHelperTextProps> =
  {
    args: {
      id: 'textarea-with-label-and-helper-text',
      label: 'Label',
      helperText: 'Helper text',
    },
    render: ({ id, label, helperText, ...restProps }) => (
      <Field>
        <FieldLabel htmlFor={id}>
          {label}
          <HelperText>{helperText}</HelperText>
          <Textarea {...restProps} id={id} />
        </FieldLabel>
      </Field>
    ),
  };

interface TextareaWithValidationProps extends TextareaProps {
  validation: string;
  withIcon: boolean;
}

export const WithValidation: Story<TextareaWithValidationProps> = {
  args: {
    validation: 'This field is not valid',
    withIcon: true,
  },
  argTypes: omit('disabled', 'invalid'),
  render: ({ validation, withIcon, ...restProps }) => (
    <Field>
      <Textarea {...restProps} invalid={Boolean(validation)} />
      <Validation state="error" withIcon={withIcon}>
        {validation}
      </Validation>
    </Field>
  ),
};

export const AllCombinations: Story<TextareaProps> = {
  ...reactMatrix(
    (props: TextareaProps) => <Textarea {...props} value={value(props)} />,
    { disabled, invalid }
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
};

const value = ({ disabled, invalid }: TextareaProps) =>
  `${invalid ? 'invalid' : 'valid'} ${disabled ? 'disabled' : ''}`;
