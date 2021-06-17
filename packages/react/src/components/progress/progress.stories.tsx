import { Progress, ProgressProps } from '@onfido/castor-react';
import React, { useEffect, useState } from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

const size = ['regular', 'large'] as const;
const hideLabel = [false, true] as const;
const children = ['', 'Custom l'] as const;

export default {
  title: 'React/Progress',
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

export const Playground: Story<ProgressProps> = (props: ProgressProps) => (
  <Progress {...props} />
);

export const Size = reactMatrix(Progress, { size });
Size.argTypes = omit<ProgressProps>('size');

export const CustomLabel = (props: ProgressProps) => <Progress {...props} />;
CustomLabel.argTypes = omit<ProgressProps>('children');
CustomLabel.args = {
  children: 'Progress: 25%',
};

export const WithoutLabel = (props: ProgressProps) => <Progress {...props} />;
WithoutLabel.argTypes = omit<ProgressProps>('children');
WithoutLabel.args = {
  children: null,
  hideLabel: true,
};

export const AllCombinations = reactMatrix(
  Progress,
  { size, hideLabel, children },
  (props) => <Progress {...props} />
);
AllCombinations.parameters = {
  display: 'grid',
  columns: '1fr',
};

export const Example = (props: ProgressProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setTimeout(setValue, 1000, value === 100 ? 0 : value + 10);
  }, [value]);
  return (
    <div aria-busy={value !== 100} style={{ width: '100%' }}>
      <Progress {...props} value={value} />
    </div>
  );
};
