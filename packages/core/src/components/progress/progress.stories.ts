import { htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { Progress, ProgressProps } from './progress.story';

const size = ['regular', 'large'] as const;
const hideLabel = [false, true] as const;
const children = ['', 'Custom label'] as const;

export default {
  title: 'Core/Progress',
  component: Progress,
  argTypes: {
    ...omit<ProgressProps>('aria-valuetext'),
    children: {
      description: 'Optional label.',
    },
    value: {
      table: {
        defaultValue: { summary: '0' },
      },
    },
    min: {
      table: {
        defaultValue: { summary: '0' },
      },
    },
    max: {
      table: {
        defaultValue: { summary: '100' },
      },
    },
    size: {
      control: { type: 'radio', options: size },
      table: {
        type: { summary: size.toString() },
        defaultValue: { summary: 'text' },
      },
    },
    hideLabel: {
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    children: '',
    value: 25,
  },
  parameters: { display: 'flex' },
} as Meta<ProgressProps>;

export const Playground: Story<ProgressProps> = (props) => Progress(props);

export const Size = htmlMatrix(Progress, { size });
Size.argTypes = omit<ProgressProps>('size');

export const CustomLabel: Story<ProgressProps> = (props) => Progress(props);
CustomLabel.argTypes = omit<ProgressProps>('children');
CustomLabel.args = {
  children: 'Progress: 25%',
};

export const WithoutLabel: Story<ProgressProps> = (props) => Progress(props);
WithoutLabel.argTypes = omit<ProgressProps>('children');
WithoutLabel.args = {
  children: undefined,
  hideLabel: true,
};

export const AllCombinations = htmlMatrix(Progress, {
  size,
  hideLabel,
  children,
});
AllCombinations.parameters = {
  display: 'grid',
  columns: '1fr',
};
