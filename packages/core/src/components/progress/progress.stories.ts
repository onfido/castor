import { ProgressProps } from '@onfido/castor-react';
import { htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { Progress } from './progress.story';

const size = ['regular', 'large'] as const;

export default {
  title: 'Core/Progress',
  component: Progress,
  argTypes: {
    children: {
      description: 'Optional label.',
    },
    value: {
      description: 'Current value',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    min: {
      description: 'Optional minimum value',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    max: {
      description: 'Optional maximum value',
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
      description: 'Hide label',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    children: '',
    hideLabel: false,
    max: 100,
    size: 'regular',
    value: 25,
  },
  parameters: { display: 'flex' },
} as Meta<ProgressProps>;

export const Playground: Story<ProgressProps> = (props) => Progress(props);

export const Size = htmlMatrix(Progress, { size });
Size.argTypes = omit<ProgressProps>('size');

export const WithoutLabel: Story<ProgressProps> = (props) => Progress(props);
WithoutLabel.argTypes = omit<ProgressProps>('children');
WithoutLabel.args = {
  children: undefined,
  hideLabel: true,
};

export const CustomLabel: Story<ProgressProps> = (props) => Progress(props);
CustomLabel.argTypes = omit<ProgressProps>('children');
CustomLabel.args = {
  children: 'Progress: 25%',
};
