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
  title: 'CSS/Input',
  component: Input,
  render: Input,
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

export const Playground: Story<InputProps> = {};

export const Invalid = htmlMatrix(Input, { invalid });
export const Disabled = htmlMatrix(Input, { disabled });

interface InputWithLabelAndHelperTextProps extends InputProps {
  id: string;
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText: Story<InputWithLabelAndHelperTextProps> = {
  args: {
    id: 'input-with-label-and-helper-text',
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
            Input({ ...props, id }),
          ],
          for: id,
        }),
      ],
    }),
};

export const AllCombinations: Story<InputProps> = {
  ...htmlMatrix(
    (props: InputProps) => Input({ ...props, value: value(props) }),
    { disabled, invalid }
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
};

const value = ({ disabled, invalid }: InputProps) =>
  `${invalid ? 'invalid' : 'valid'} ${disabled ? 'disabled' : ''}`;
