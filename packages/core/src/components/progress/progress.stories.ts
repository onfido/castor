import { htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { Progress, ProgressProps } from './progress.story';

const size = ['regular', 'large'] as const;
size.toString = () => size.map((value) => `"${value}"`).join('|');

const hideLabel = [false, true] as const;

export default {
  title: 'Core/Progress',
  component: Progress,
  argTypes: {
    ...omit<ProgressProps>('aria-valuetext'),
    children: {
      description: 'Optional label.',
    },
    hideLabel: {
      table: { type: { summary: 'boolean' } },
    },
    min: {
      control: { type: 'number' },
      table: { type: { summary: 'number' } },
    },
    max: {
      control: { type: 'number' },
      table: { type: { summary: 'number' } },
    },
    size: {
      control: { type: 'radio', options: size },
      table: { type: { summary: size.toString() } },
    },
    value: {
      type: { required: true },
      table: { type: { summary: 'number' } },
    },
  },
  args: {
    children: '',
    hideLabel: false,
    min: 0,
    max: 100,
    size: 'regular',
    value: 25,
  },
  parameters: { display: 'flex' },
} as Meta<ProgressProps>;

export const Playground: Story<ProgressProps> = (props) => Progress(props);

export const Size = htmlMatrix(Progress, { size });
Size.argTypes = omit<ProgressProps>('size');

export const HideLabel = htmlMatrix(Progress, { hideLabel });
HideLabel.argTypes = omit<ProgressProps>('hideLabel');

export const WithCustomLabel: Story<ProgressProps> = (props) => Progress(props);
WithCustomLabel.argTypes = omit<ProgressProps>('children', 'hideLabel');
WithCustomLabel.args = {
  children: 'Progress: 25%',
  hideLabel: false,
};

export const AllCombinations = htmlMatrix(Progress, { hideLabel, size });
AllCombinations.argTypes = omit<ProgressProps>('hideLabel', 'size');
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(2, 1fr)',
};
