import { htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { Spinner, SpinnerProps } from './spinner.story';

const size = ['large', 'medium', 'small'] as const;
size.toString = () => size.map((value) => `"${value}"`).join('|');

export default {
  title: 'Core/Spinner',
  component: Spinner,
  argTypes: {
    children: {
      description: 'Optional label.',
    },
    size: {
      control: { type: 'radio', options: size },
      table: { type: { summary: size.toString() } },
    },
  },
  args: {
    children: 'Label',
    size: 'medium',
  },
  parameters: { display: 'flex' },
} as Meta<SpinnerProps>;

export const Playground: Story<SpinnerProps> = (props) => Spinner(props);

export const Size = htmlMatrix(Spinner, { size });
Size.argTypes = omit<SpinnerProps>('size');

export const WithoutLabel: Story<SpinnerProps> = (props) => Spinner(props);
WithoutLabel.argTypes = omit<SpinnerProps>('children');
WithoutLabel.args = {
  children: null,
};
