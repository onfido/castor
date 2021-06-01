import { html, htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { FieldLabel } from '../field-label/field-label.story';
import { Field } from '../field/field.story';
import { HelperText } from '../helper-text/helper-text.story';
import { Select, SelectProps } from './select.story';

const borderless = [true, false] as const;
const disabled = [true, false] as const;
const invalid = [true, false] as const;

export default {
  title: 'Core/Select',
  component: Select,
  argTypes: {
    ...omit<SelectProps>('id', 'placeholder', 'value'),
    children: {
      description: 'List of options using `<option>`.',
      control: false,
    },
  },
  args: {
    children: [
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

export const WithPlaceholder = ({ placeholder, ...props }: SelectProps) =>
  Select({ ...props, placeholder });
WithPlaceholder.args = {
  placeholder: 'Placeholder',
  children: null,
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
  (props) => Select({ ...props, placeholder: placeholder(props) })
);
AllCombinations.argTypes = omit<SelectProps>('children');
AllCombinations.args = {
  children: null,
};
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const placeholder = ({ borderless, disabled, invalid }: SelectProps) =>
  [
    invalid ? 'invalid' : 'valid',
    borderless ? 'borderless' : '',
    disabled ? 'disabled' : '',
  ].join(' ');
