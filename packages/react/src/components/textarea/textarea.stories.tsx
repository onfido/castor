import {
  Field,
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
    children: {
      description: 'Acts as a label for a `<textarea>`.',
    },
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
        type: { summary: resize.toString() },
        defaultValue: { summary: 'text' },
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
    children: 'Label',
    disabled: false,
    invalid: false,
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
WithoutLabel.argTypes = omit<TextareaProps>('children');
WithoutLabel.args = {
  children: null,
};

interface TextareaWithHelperTextProps extends TextareaProps {
  label: string;
  helperText: string;
}

export const WithHelperText = ({
  label,
  helperText,
  ...restProps
}: TextareaWithHelperTextProps) => (
  <Field>
    <Textarea {...restProps}>
      {label}
      <HelperText>{helperText}</HelperText>
    </Textarea>
  </Field>
);
WithHelperText.argTypes = omit<TextareaWithHelperTextProps>('children');
WithHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

interface TextareaWithValidationProps extends TextareaProps {
  label: string;
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
