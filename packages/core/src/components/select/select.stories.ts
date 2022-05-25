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
  render: Select,
  argTypes: {
    ...omit('class', 'empty', 'id', 'required', 'value'),
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
        hidden: true,
        selected: true,
        value: '',
      }),
      html('option', { children: 'Option', value: 1 }),
      html('option', { children: 'Disabled option', value: 2, disabled: true }),
      html('option', {
        children: 'Longer option that is quite long',
        value: 'long',
      }),
      html('option', {
        children:
          'An enormously long option that we truncate when it gets too long',
        value: 'enormous',
      }),
    ],
    borderless: false,
    disabled: false,
    invalid: false,
  },
  parameters: { display: 'flex' },
} as Meta<SelectProps>;

export const Playground: Story<SelectProps> = {};

export const Borderless = htmlMatrix(Select, { borderless });
export const Invalid = htmlMatrix(Select, { invalid });
export const Disabled = htmlMatrix(Select, { disabled });

export const Required: Story<SelectProps> = {
  args: {
    required: true,
  },
};

export const WithEmptyModifier: Story<SelectProps> = {
  args: {
    children: [
      html('option', {
        children: 'Select an option...',
        disabled: true,
        selected: true,
        value: '',
      }),
    ],
    empty: true,
  },
};

interface SelectWithLabelAndHelperTextProps extends SelectProps {
  id: string;
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText: Story<SelectWithLabelAndHelperTextProps> =
  {
    args: {
      id: 'select-with-label-and-helper-text',
      label: 'Label',
      helperText: 'Helper text',
    },
    render: ({ id, label, helperText, ...props }) =>
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
      }),
  };

export const AllCombinations: Story<SelectProps> = {
  ...htmlMatrix(
    (props: SelectProps) => Select({ ...props, children: children(props) }),
    { borderless, disabled, invalid }
  ),
  args: {
    children: null,
  },
  argTypes: omit('children', 'borderless', 'disabled', 'invalid'),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
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
