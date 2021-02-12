import {
  Field,
  HelperText,
  Textarea,
  TextareaProps,
  Validation,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

const resizes: readonly TextareaProps['resize'][] = [
  'vertical',
  'horizontal',
  'both',
  'none',
];
resizes.toString = () => resizes.map((value) => `"${value}"`).join('|');

export default {
  title: 'React/Textarea',
  component: Textarea,
  argTypes: {
    ...omit<TextareaProps>('className', 'style'),
    children: {
      description: 'Acts as a label for a `<textarea>`.',
      control: 'text',
    },
    placeholder: { control: 'text' },
    resize: {
      table: {
        type: {
          summary: resizes.toString(),
        },
        defaultValue: { summary: 'vertical' },
      },
      control: {
        type: 'radio',
        options: resizes,
      },
    },
    rows: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
      control: 'number',
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
  },
  args: {
    children: 'Label',
    placeholder: 'Placeholder',
    resize: 'vertical',
    rows: 3,
    invalid: false,
    disabled: false,
  },
} as Meta<TextareaProps>;

export const Playground: Story<TextareaProps> = (props: TextareaProps) => (
  <Textarea {...props} />
);

export const Resize = storyOf(Textarea, 'resize', resizes, {
  labelMode: 'prop',
  labelProp: 'defaultValue',
});
Resize.argTypes = omit<TextareaProps>('resize');

export const Invalid = storyOf(Textarea, 'invalid', [true, false], {
  labelMode: 'prop',
  labelProp: 'defaultValue',
});
Invalid.argTypes = omit<TextareaProps>('invalid');

export const Disabled = storyOf(Textarea, 'disabled', [true, false], {
  labelMode: 'prop',
  labelProp: 'defaultValue',
});
Disabled.argTypes = omit<TextareaProps>('disabled');

interface TextareaWithHelperTextProps extends TextareaProps {
  label: string;
  helperText: string;
}

export const WithHelperText = ({
  label,
  helperText,
  ...restTextareaProps
}: TextareaWithHelperTextProps) => (
  <Field>
    <Textarea {...restTextareaProps}>
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
  label,
  validation,
  withIcon,
  ...restTextareaProps
}: TextareaWithValidationProps) => (
  <Field>
    <Textarea {...restTextareaProps} invalid={Boolean(validation)}>
      {label}
    </Textarea>
    <Validation withIcon={withIcon}>{validation}</Validation>
  </Field>
);
WithValidation.argTypes = omit<TextareaWithValidationProps>(
  'children',
  'invalid',
  'disabled'
);
WithValidation.args = {
  label: 'Label',
  validation: 'This field is not valid',
  withIcon: true,
};
