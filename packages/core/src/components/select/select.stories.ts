import { classy, m } from '@onfido/castor';
import { html, htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { FieldLabel } from '../field-label/field-label.story';
import { Field } from '../field/field.story';
import { HelperText } from '../helper-text/helper-text.story';
import { Select, SelectProps } from './select.story';

const borderless = [true, false] as const;
const disabled = [true, false] as const;
const invalid = [true, false] as const;

export default {
  title: 'CSS/Select',
  component: Select,
  argTypes: {
    ...omit('class', 'id', 'required', 'value'),
    children: {
      description: [
        'List of options using `<option>`.',
        'For "empty" selection (placeholder) use `-empty` modifier on `<select>`.',
      ].join('\n\n'),
      control: false,
    },
    borderless: {
      table: { type: { summary: 'boolean' } },
    },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
  },
  args: {
    children: [
      html('option', {
        children: 'Select an option...',
        disabled: true,
        selected: true,
        value: '',
      }),
      html('option', { children: 'Option 1', value: 1 }),
      html('option', { children: 'Option 2', value: 2 }),
      html('option', { children: 'Option 3', value: 3 }),
    ],
    borderless: false,
    disabled: false,
    invalid: false,
  },
  parameters: { display: 'flex' },
} as Meta<SelectProps>;

export const Playground: Story<SelectProps> = (props) => Select(props);

export const Borderless = htmlMatrix(Select, { borderless });
Borderless.argTypes = omit('borderless');

export const Invalid = htmlMatrix(Select, { invalid });
Invalid.argTypes = omit('invalid');

export const Disabled = htmlMatrix(Select, { disabled });
Disabled.argTypes = omit('disabled');

export const AsRequired: Story<SelectProps> = (props) =>
  Select({ ...props, required: true });
AsRequired.args = {
  children: [
    html('option', {
      children: 'Select an option...',
      disabled: true,
      selected: true,
      value: '',
    }),
    html('option', { children: 'Option 1', value: 1 }),
    html('option', { children: 'Option 2', value: 2 }),
    html('option', { children: 'Option 3', value: 3 }),
  ],
};

export const WithEmptyModifier: Story<SelectProps> = (props) =>
  Select({ ...props, class: classy(m('empty')) });
WithEmptyModifier.args = {
  children: [
    html('option', {
      children: 'Select an option...',
      disabled: true,
      selected: true,
      value: '',
    }),
  ],
};

interface SelectWithLabelAndHelperTextProps extends SelectProps {
  id: string;
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText: Story<SelectWithLabelAndHelperTextProps> =
  ({ id, label, helperText, ...props }) =>
    Field({
      children: [
        FieldLabel({
          children: [
            label,
            HelperText({ children: helperText }),
            Select({ ...props, id }),
          ],
          for: id,
        }),
      ],
    });
WithLabelAndHelperText.args = {
  id: 'select-with-label-and-helper-text',
  label: 'Label',
  helperText: 'Helper text',
};

export const AllCombinations = htmlMatrix(
  Select,
  { borderless, disabled, invalid },
  (props) => Select({ ...props, children: children(props) })
);
AllCombinations.argTypes = omit(
  'children',
  'borderless',
  'disabled',
  'invalid'
);
AllCombinations.args = {
  children: null,
};
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const children = ({ borderless, disabled, invalid }: SelectProps) => {
  const variation = [
    invalid ? 'invalid' : 'valid',
    borderless ? 'borderless' : '',
    disabled ? 'disabled' : '',
  ];
  return [
    html('option', {
      children: variation.join(' '),
      selected: true,
      value: variation.join('-'),
    }),
  ];
};
