import { htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { FieldLabel } from '../field-label/field-label.story';
import { Field } from '../field/field.story';
import { HelperText } from '../helper-text/helper-text.story';
import { Textarea, TextareaProps } from './textarea.story';

const disabled = [true, false] as const;
const invalid = [true, false] as const;

const resize: readonly TextareaProps['resize'][] = [
  'vertical',
  'horizontal',
  'both',
  'none',
];
resize.toString = () => resize.map((value) => `"${value}"`).join('|');

export default {
  title: 'Core/Textarea',
  component: Textarea,
  argTypes: {
    ...omit<TextareaProps>('id'),
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
    invalid: {
      table: { type: { summary: 'boolean' } },
    },
    placeholder: {
      table: { type: { summary: 'string' } },
    },
    resize: {
      control: { type: 'radio', options: resize },
      table: { type: { summary: resize.toString() } },
    },
    rows: {
      control: 'number',
      table: { type: { summary: 'number' } },
    },
  },
  args: {
    disabled: false,
    invalid: false,
    placeholder: 'Placeholder',
    resize: 'vertical',
    rows: 3,
  },
  parameters: { display: 'flex' },
} as Meta<TextareaProps>;

export const Playground: Story<TextareaProps> = (props) => Textarea(props);

export const Resize = htmlMatrix(Textarea, { resize });
Resize.argTypes = omit<TextareaProps>('resize');

export const Invalid = htmlMatrix(Textarea, { invalid });
Invalid.argTypes = omit<TextareaProps>('invalid');

export const Disabled = htmlMatrix(Textarea, { disabled });
Disabled.argTypes = omit<TextareaProps>('disabled');

interface TextareaWithLabelAndHelperTextProps extends TextareaProps {
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText = ({
  label,
  helperText,
  ...props
}: TextareaWithLabelAndHelperTextProps) =>
  Field({
    children: [
      FieldLabel({
        children: [
          label,
          HelperText({ children: helperText }),
          Textarea(props),
        ],
      }),
    ],
  });
WithLabelAndHelperText.args = {
  label: 'Label',
  helperText: 'Helper text',
};

export const AllCombinations = htmlMatrix(
  Textarea,
  { disabled, invalid },
  (props) => Textarea({ ...props, children: value(props) })
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const value = ({ disabled, invalid }: TextareaProps) =>
  `${invalid ? 'invalid' : 'valid'} ${disabled ? 'disabled' : ''}`;
