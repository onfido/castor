import { htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { Spinner, SpinnerProps } from './spinner.story';

const size = ['large', 'medium', 'small'] as const;

export default {
  title: 'Core/Spinner',
  component: Spinner,
  argTypes: {
    children: {
      description: 'Optional label.',
    },
  },
  args: {
    children: 'Label',
  },
  parameters: { display: 'flex' },
} as Meta<SpinnerProps>;

export const Playground: Story<SpinnerProps> = (props) => Spinner(props);

export const Size = htmlMatrix(Spinner, { size });
Size.argTypes = omit<SpinnerProps>('size');

export const WithoutLabel: Story<SpinnerProps> = (props) => Spinner(props);
Size.argTypes = omit<SpinnerProps>('children');
