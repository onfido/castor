import { color } from '@onfido/castor';
import { html, Meta, omit, Story } from '../../../../../docs';
import { Asterisk } from '../asterisk/asterisk.story';
import { Field } from '../field/field.story';
import { HelperText } from '../helper-text/helper-text.story';
import { Input } from '../input/input.story';
import { Textarea } from '../textarea/textarea.story';
import { FieldLabel, FieldLabelProps } from './field-label.story';

export default {
  title: 'Core/FieldLabel',
  component: FieldLabel,
  argTypes: omit<FieldLabelProps>('for'),
  args: {
    children: 'Label',
  },
} as Meta<FieldLabelProps>;

export const Playground: Story<FieldLabelProps> = (props) => FieldLabel(props);

export const AsOptional: Story<FieldLabelProps> = ({ children, ...props }) =>
  FieldLabel({
    ...props,
    children: html('span', {
      children: [
        children,
        html('span', {
          style: `color: ${color('content-secondary')}`,
          children: '(optional)',
        }),
      ],
    }),
  });

export const AsRequired: Story<FieldLabelProps> = ({ children, ...props }) =>
  FieldLabel({
    ...props,
    children: html('span', {
      children: [children, Asterisk({ 'aria-label': 'required' })],
    }),
  });

interface FieldLabelWithHelperTextProps extends FieldLabelProps {
  label: string;
  helperText: string;
}

export const WithHelperText: Story<FieldLabelWithHelperTextProps> = ({
  label,
  helperText,
  ...props
}) =>
  FieldLabel({
    ...props,
    children: [label, HelperText({ children: helperText })],
  });
WithHelperText.argTypes = omit<FieldLabelWithHelperTextProps>('children');
WithHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

interface FieldLabelWithInputProps extends FieldLabelProps {
  id: string;
  label: string;
}

export const WithInput = ({ id, label, ...props }: FieldLabelWithInputProps) =>
  Field({
    children: [
      FieldLabel({
        ...props,
        children: label,
        for: id,
      }),
      Input({ id }),
    ],
  });
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
  ...props
}: FieldLabelWithTextareaProps) =>
  Field({
    children: [
      FieldLabel({
        ...props,
        children: label,
        for: id,
      }),
      Textarea({ id }),
    ],
  });
WithTextarea.argTypes = omit<FieldLabelWithTextareaProps>('children');
WithTextarea.args = {
  id: 'field-label-with-textarea',
  label: 'Label',
};
