import {
  htmlMatrix,
  Meta,
  omit,
  optionsToSummary,
  Story,
} from '../../../../../docs';
import { Progress, ProgressProps } from './progress.story';

const size = ['regular', 'large'] as const;
const hideLabel = [false, true] as const;

export default {
  title: 'CSS/Progress',
  component: Progress,
  render: Progress as unknown,
  argTypes: {
    ...omit('aria-valuetext'),
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
      table: { type: { summary: optionsToSummary(size) } },
    },
    value: {
      type: { name: 'number', required: true },
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

export const Playground: Story<ProgressProps> = {};

export const Size = htmlMatrix(Progress, { size });
export const HideLabel = htmlMatrix(Progress, { hideLabel });

export const WithCustomLabel: Story<ProgressProps> = {
  args: {
    children: 'Progress: 25%',
    hideLabel: false,
  },
  argTypes: omit('children', 'hideLabel'),
};

export const AllCombinations: Story<ProgressProps> = {
  ...htmlMatrix(Progress, { hideLabel, size }),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
};
