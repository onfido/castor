import { htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { Checkbox, CheckboxProps } from './checkbox.story';

const bordered = [true, false] as const;
const disabled = [true, false] as const;
const invalid = [true, false] as const;

export default {
  title: 'CSS/Checkbox',
  component: Checkbox,
  argTypes: {
    children: { description: 'Acts as a label for the `<input>`.' },
  },
  args: {
    children: '',
    bordered: false,
    disabled: false,
    invalid: false,
  },
  parameters: { display: 'flex' },
} as Meta<CheckboxProps>;

export const Playground: Story<CheckboxProps> = (props) => Checkbox(props);

export const Bordered = htmlMatrix(Checkbox, { bordered });
Bordered.argTypes = omit('bordered');

export const Invalid = htmlMatrix(Checkbox, { invalid });
Invalid.argTypes = omit('invalid');

export const Disabled = htmlMatrix(Checkbox, { disabled });
Disabled.argTypes = omit('disabled');

export const AllCombinations = htmlMatrix(
  Checkbox,
  { bordered, disabled, invalid },
  (props) => Checkbox({ ...props, children: label(props) })
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};

const label = ({ bordered, disabled, invalid }: CheckboxProps) =>
  [
    invalid ? 'invalid' : '',
    bordered ? 'bordered' : '',
    disabled ? 'disabled' : '',
  ].join(' ');
