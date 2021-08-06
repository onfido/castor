import {
  htmlMatrix,
  Meta,
  omit,
  optionsToSummary,
  Story,
} from '../../../../../docs';
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

export default {
  title: 'Core/Input',
  component: Input,
  argTypes: {
    ...omit('id', 'value'),
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
      table: { type: { summary: optionsToSummary(type) } },
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
Invalid.argTypes = omit('invalid');

export const Disabled = htmlMatrix(Input, { disabled });
Disabled.argTypes = omit('disabled');

interface InputWithLabelAndHelperTextProps extends InputProps {
  id: string;
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText: Story<InputWithLabelAndHelperTextProps> =
  ({ id, label, helperText, ...props }) =>
    Field({
      children: [
        FieldLabel({
          children: [
            label,
            HelperText({ children: helperText }),
            Input({ ...props, id }),
          ],
          for: id,
        }),
      ],
    });
WithLabelAndHelperText.args = {
  id: 'input-with-label-and-helper-text',
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
