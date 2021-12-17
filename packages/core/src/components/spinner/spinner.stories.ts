import {
  htmlMatrix,
  Meta,
  omit,
  optionsToSummary,
  Story,
} from '../../../../../docs';
import { Spinner, SpinnerProps } from './spinner.story';

const size = ['large', 'medium', 'small'] as const;

export default {
  title: 'CSS/Spinner',
  component: Spinner,
  render: Spinner,
  argTypes: {
    children: {
      description: 'Optional label.',
    },
    size: {
      control: { type: 'radio', options: size },
      table: { type: { summary: optionsToSummary(size) } },
    },
  },
  args: {
    children: 'Label',
    size: 'medium',
  },
  parameters: { display: 'flex' },
} as Meta<SpinnerProps>;

export const Playground: Story<SpinnerProps> = {};

export const Size = htmlMatrix(Spinner, { size });

export const WithoutLabel: Story<SpinnerProps> = {
  args: {
    children: null,
  },
  argTypes: omit('children'),
};
