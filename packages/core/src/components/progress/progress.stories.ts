import { htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { Progress, ProgressProps } from './progress.story';

const size = ['regular', 'large'] as const;
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
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    size: {
      control: { type: 'radio', options: size },
      table: {
        type: { summary: size.toString() },
        defaultValue: { summary: 'regular' },
      },
    },
    value: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
  },
  args: {
    children: '',
    hideLabel: false,
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
