import {
  Field,
  FieldLabel,
  HelperText,
  Textarea,
  TextareaProps,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

const disabled = [true, false] as const;
const invalid = [true, false] as const;

const resize: readonly TextareaProps['resize'][] = [
  'vertical',
  'horizontal',
  'both',
  'none',
];
resize.toString = () => resize.map((value) => `"${value}"`).join('|');

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
    label: {
      description: 'Optional label for an `<textarea>`.',
    },
    placeholder: {
      table: { type: { summary: 'string' } },
    },
    resize: {
      control: { type: 'radio', options: resize },
      table: {
        type: { summary: resize.toString() },
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
    label: 'Label',
    placeholder: 'Placeholder',
    resize: 'vertical',
    rows: 3,
  },
  parameters: { display: 'flex' },
} as Meta<TextareaProps>;

export const Playground: Story<TextareaProps> = (props: TextareaProps) => (
  <Textarea {...props} />
);

export const Resize = reactMatrix(Textarea, { resize });
Resize.argTypes = omit<TextareaProps>('resize');

export const Invalid = reactMatrix(Textarea, { invalid });
Invalid.argTypes = omit<TextareaProps>('invalid');

export const Disabled = reactMatrix(Textarea, { disabled });
Disabled.argTypes = omit<TextareaProps>('disabled');

export const WithoutLabel = (props: TextareaProps) => <Textarea {...props} />;
WithoutLabel.argTypes = omit<TextareaProps>('label');
WithoutLabel.args = {
  label: undefined,
};

interface TextareaWithHelperTextProps extends TextareaProps {
  helperText: string;
}

export const WithHelperText = ({
  label,
  helperText,
  ...restProps
}: TextareaWithHelperTextProps) => (
  <Field>
    <FieldLabel>
      {label}
      <HelperText>{helperText}</HelperText>
      <Textarea {...restProps} />
    </FieldLabel>
  </Field>
);
WithHelperText.args = {
  helperText: 'Helper text',
};

interface TextareaWithValidationProps extends TextareaProps {
  validation: string;
  withIcon: boolean;
}

export const WithValidation = ({
  validation,
  withIcon,
  ...restProps
}: TextareaWithValidationProps) => (
  <Field>
    <Textarea {...restProps} invalid={Boolean(validation)} />
    <Validation state="error" withIcon={withIcon}>
      {validation}
    </Validation>
  </Field>
);
WithValidation.argTypes = omit<TextareaWithValidationProps>(
  'invalid',
  'disabled'
);
WithValidation.args = {
  validation: 'This field is not valid',
  withIcon: true,
};

export const AllCombinations = reactMatrix(
  Textarea,
  { disabled, invalid },
  (props) => <Textarea {...props} value={value(props)} />
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const value = ({ disabled, invalid }: TextareaProps) =>
  `${invalid ? 'invalid' : 'valid'} ${disabled ? 'disabled' : ''}`;
