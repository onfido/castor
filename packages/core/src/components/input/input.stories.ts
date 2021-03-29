import { htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { FieldLabel } from '../field-label/field-label.story';
import { Field } from '../field/field.story';
import { HelperText } from '../helper-text/helper-text.story';
import { Input, InputProps } from './input.story';

const disabled = [true, false] as const;
const invalid = [true, false] as const;

const type = [
  'text',
  'number',
  'email',
  'password',
  'tel',
  'url',
  'search',
] as const;
type.toString = () => type.map((value) => `"${value}"`).join('|');

export default {
  title: 'Core/Input',
  component: Input,
  argTypes: {
    ...omit<InputProps>('id', 'value'),
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
    placeholder: {
      table: { type: { summary: 'string' } },
    },
    type: {
      control: { type: 'radio', options: type },
      table: { type: { summary: type.toString() } },
    },
  },
  args: {
    disabled: false,
    invalid: false,
    placeholder: 'Placeholder',
    type: 'text',
  },
  parameters: { display: 'flex' },
} as Meta<InputProps>;

export const Playground: Story<InputProps> = (props) => Input(props);

export const Invalid = htmlMatrix(Input, { invalid });
Invalid.argTypes = omit<InputProps>('invalid');

export const Disabled = htmlMatrix(Input, { disabled });
Disabled.argTypes = omit<InputProps>('disabled');

interface InputWithLabelAndHelperTextProps extends InputProps {
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText = ({
  label,
  helperText,
  ...props
}: InputWithLabelAndHelperTextProps) =>
  Field({
    children: [
      FieldLabel({
        children: [label, HelperText({ children: helperText }), Input(props)],
      }),
    ],
  });
WithLabelAndHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

export const AllCombinations = htmlMatrix(
  Input,
  { disabled, invalid },
  (props) => Input({ ...props, value: value(props) })
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const value = ({ disabled, invalid }: InputProps) =>
  `${invalid ? 'invalid' : 'valid'} ${disabled ? 'disabled' : ''}`;
