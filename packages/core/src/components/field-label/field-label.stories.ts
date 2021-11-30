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
  title: 'CSS/FieldLabel',
  component: FieldLabel,
  render: FieldLabel as unknown,
  argTypes: omit('for'),
  args: {
    children: 'Label',
  },
} as Meta<FieldLabelProps>;

export const Playground: Story<FieldLabelProps> = {};

export const AsOptional: Story<FieldLabelProps> = {
  render: ({ children, ...props }) =>
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
    }),
};

export const AsRequired: Story<FieldLabelProps> = {
  render: ({ children, ...props }) =>
    FieldLabel({
      ...props,
      children: html('span', {
        children: [children, Asterisk()],
      }),
    }),
};

interface FieldLabelWithHelperTextProps extends FieldLabelProps {
  children: string;
  helperText: string;
}

export const WithHelperText: Story<FieldLabelWithHelperTextProps> = {
  args: {
    helperText: 'Helper text',
  },
  render: ({ children, helperText, ...props }) =>
    FieldLabel({
      ...props,
      children: [children, HelperText({ children: helperText })],
    }),
};

interface FieldLabelWithInputProps extends FieldLabelProps {
  id: string;
}

export const WithInput: Story<FieldLabelWithInputProps> = {
  args: {
    id: 'field-label-with-input',
  },
  render: ({ id, ...props }) =>
    Field({
      children: [FieldLabel({ ...props, for: id }), Input({ id })],
    }),
};

interface FieldLabelWithSelectProps extends FieldLabelProps {
  children: string;
  id: string;
}

export const WithSelect: Story<FieldLabelWithSelectProps> = {
  args: {
    id: 'field-label-with-select',
  },
  render: ({ id, ...props }) =>
    Field({
      children: [
        FieldLabel({ ...props, for: id }),
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
    }),
};

interface FieldLabelWithTextareaProps extends FieldLabelProps {
  children: string;
  id: string;
}

export const WithTextarea: Story<FieldLabelWithTextareaProps> = {
  args: {
    id: 'field-label-with-textarea',
  },
  render: ({ id, ...props }) =>
    Field({
      children: [FieldLabel({ ...props, for: id }), Textarea({ id })],
    }),
};
