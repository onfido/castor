import { color } from '@onfido/castor';
import { html, Meta, omit, Story } from '../../../../../docs';
import { Asterisk } from '../asterisk/asterisk.story';
import { Field } from '../field/field.story';
import { HelperText } from '../helper-text/helper-text.story';
import { Input } from '../input/input.story';
import { Select } from '../select/select.story';
import { Textarea } from '../textarea/textarea.story';
import { FieldLabel, FieldLabelProps } from './field-label.story';

export default {
  title: 'Core/FieldLabel',
  component: FieldLabel,
  argTypes: omit('for'),
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
      children: [children, Asterisk()],
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
WithHelperText.argTypes = omit('children');
WithHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

interface FieldLabelWithInputProps extends FieldLabelProps {
  id: string;
  label: string;
}

export const WithInput: Story<FieldLabelWithInputProps> = ({
  id,
  label,
  ...props
}) =>
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
WithInput.argTypes = omit('children');
WithInput.args = {
  id: 'field-label-with-input',
  label: 'Label',
};

interface FieldLabelWithSelectProps extends FieldLabelProps {
  id: string;
  label: string;
}

export const WithSelect: Story<FieldLabelWithSelectProps> = ({
  id,
  label,
  ...props
}) =>
  Field({
    children: [
      FieldLabel({
        ...props,
        children: label,
        for: id,
      }),
      Select({
        children: [
          html('option', { children: '', selected: true }),
          html('option', { children: 'Value A', value: 'a' }),
          html('option', { children: 'Value B', value: 'b' }),
          html('option', { children: 'Value C', value: 'c' }),
        ],
        id,
      }),
    ],
  });
WithSelect.argTypes = omit('children');
WithSelect.args = {
  id: 'field-label-with-select',
  label: 'Label',
};

interface FieldLabelWithTextareaProps extends FieldLabelProps {
  id: string;
  label: string;
}

export const WithTextarea: Story<FieldLabelWithTextareaProps> = ({
  id,
  label,
  ...props
}) =>
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
WithTextarea.argTypes = omit('children');
WithTextarea.args = {
  id: 'field-label-with-textarea',
  label: 'Label',
};
