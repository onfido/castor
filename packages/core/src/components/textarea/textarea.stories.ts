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
import { Textarea, TextareaProps } from './textarea.story';

const disabled = [true, false] as const;
const invalid = [true, false] as const;
const resize = ['vertical', 'horizontal', 'both', 'none'] as const;

export default {
  title: 'CSS/Textarea',
  component: Textarea,
  render: Textarea,
  argTypes: {
    ...omit('id'),
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
      table: { type: { summary: optionsToSummary(resize) } },
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

export const Playground: Story<TextareaProps> = {};

export const Resize = htmlMatrix(Textarea, { resize });
export const Invalid = htmlMatrix(Textarea, { invalid });
export const Disabled = htmlMatrix(Textarea, { disabled });

interface TextareaWithLabelAndHelperTextProps extends TextareaProps {
  id: string;
  label: string;
  helperText: string;
}

export const WithLabelAndHelperText: Story<TextareaWithLabelAndHelperTextProps> =
  {
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
              Textarea({ ...props, id }),
            ],
            for: id,
          }),
        ],
      }),
  };

export const AllCombinations: Story<TextareaProps> = {
  ...htmlMatrix(
    (props: TextareaProps) => Textarea({ ...props, children: value(props) }),
    { disabled, invalid }
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
};

const value = ({ disabled, invalid }: TextareaProps) =>
  `${invalid ? 'invalid' : 'valid'} ${disabled ? 'disabled' : ''}`;
