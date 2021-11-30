import { htmlMatrix, Meta, Story } from '../../../../../docs';
import { Checkbox, CheckboxProps } from './checkbox.story';

const bordered = [true, false] as const;
const disabled = [true, false] as const;
const invalid = [true, false] as const;

export default {
  title: 'CSS/Checkbox',
  component: Checkbox,
  render: Checkbox as unknown,
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

export const Playground: Story<CheckboxProps> = {};

export const Bordered = htmlMatrix(Checkbox, { bordered });
export const Invalid = htmlMatrix(Checkbox, { invalid });
export const Disabled = htmlMatrix(Checkbox, { disabled });

export const AllCombinations: Story<CheckboxProps> = {
  ...htmlMatrix(
    (props: CheckboxProps) => Checkbox({ ...props, children: label(props) }),
    { bordered, disabled, invalid }
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
};

const label = ({ bordered, disabled, invalid }: CheckboxProps) =>
  [
    invalid ? 'invalid' : '',
    bordered ? 'bordered' : '',
    disabled ? 'disabled' : '',
  ].join(' ');
