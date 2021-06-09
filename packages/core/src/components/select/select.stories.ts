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
  title: 'Core/Components/Form/Select',
  component: Select,
  argTypes: {
    ...omit<SelectProps>('class', 'id', 'value'),
    children: {
      description: [
        'List of options using `<option>`.',
        'For "empty" selection (placeholder) use `-empty` modifier on `<select>`.',
      ].join('\n\n'),
      control: false,
    },
  },
  args: {
    children: [
      html('option', { children: 'Select an option...', selected: true }),
      html('option', { children: 'Option 1' }),
      html('option', { children: 'Option 2' }),
      html('option', { children: 'Option 3' }),
    ],
    borderless: false,
    disabled: false,
    invalid: false,
  },
  parameters: { display: 'flex' },
} as Meta<SelectProps>;

export const Playground: Story<SelectProps> = (props) => Select(props);

export const Borderless = htmlMatrix(Select, { borderless });
Borderless.argTypes = omit<SelectProps>('borderless');

export const Invalid = htmlMatrix(Select, { invalid });
Invalid.argTypes = omit<SelectProps>('invalid');

export const Disabled = htmlMatrix(Select, { disabled });
Disabled.argTypes = omit<SelectProps>('disabled');

export const AsRequired: Story<SelectProps> = (props) =>
  Select({ ...props, required: true });
AsRequired.args = {
  children: [
    html('option', {
      children: 'Select an option...',
      disabled: true,
      selected: true,
    }),
    html('option', { children: 'Option 1' }),
    html('option', { children: 'Option 2' }),
    html('option', { children: 'Option 3' }),
  ],
};

export const WithEmptyModifier: Story<SelectProps> = (props) =>
  Select({ ...props, class: classy(m({ empty: true })) });
WithEmptyModifier.args = {
  children: [
    html('option', {
      children: 'Select an option...',
      disabled: true,
      selected: true,
    }),
  ],
};

interface SelectWithLabelAndHelperTextProps extends SelectProps {
  id: string;
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText = ({
  id,
  label,
  helperText,
  ...props
}: SelectWithLabelAndHelperTextProps) =>
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
AllCombinations.argTypes = omit<SelectProps>('children');
AllCombinations.args = {
  children: null,
};
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const children = ({ borderless, disabled, invalid }: SelectProps) => [
  html('option', {
    children: [
      invalid ? 'invalid' : 'valid',
      borderless ? 'borderless' : '',
      disabled ? 'disabled' : '',
    ].join(' '),
    selected: true,
  }),
];
