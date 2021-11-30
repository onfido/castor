import { Progress, ProgressProps } from '@onfido/castor-react';
import React, { useEffect, useState } from 'react';
import {
  Meta,
  omit,
  optionsToSummary,
  reactMatrix,
  Story,
} from '../../../../../docs';

const size = ['regular', 'large'] as const;

const hideLabel = [false, true] as const;

export default {
  title: 'React/Progress',
  component: Progress,
  argTypes: {
    children: {
      description: 'Optional label.',
    },
    hideLabel: {
      table: { type: { summary: 'boolean' } },
    },
    min: {
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    size: {
      control: { type: 'radio', options: size },
      table: {
        type: { summary: optionsToSummary(size) },
        defaultValue: { summary: 'regular' },
      },
    },
    value: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
      type: { name: 'number', required: true },
    },
  },
  args: {
    children: '',
    hideLabel: false,
    size: 'regular',
    value: 25,
  },
  parameters: { display: 'flex' },
} as Meta<ProgressProps>;

export const Playground: Story<ProgressProps> = {};

export const Size = reactMatrix(Progress, { size });
export const HideLabel = reactMatrix(Progress, { hideLabel });

export const WithCustomLabel: Story<ProgressProps> = {
  args: {
    children: 'Progress: 25%',
    hideLabel: false,
  },
  argTypes: omit('children', 'hideLabel'),
};

export const ValueLoop: Story<ProgressProps> = {
  argTypes: omit('max', 'min', 'value'),
  render: (props) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      setTimeout(setValue, 1000, value === 100 ? 0 : value + 10);
    }, [value]);

    return (
      <div aria-busy={value !== 100} style={{ width: '100%' }}>
        <Progress {...props} value={value} />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
export function ValueLoop() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setTimeout(setValue, 1000, value === 100 ? 0 : value + 10);
  }, [value]);

  return (
    <div aria-busy={value !== 100} style={{ width: '100%' }}>
      <Progress value={value} />
    </div>
  );
};
`,
      },
    },
  },
};

export const AllCombinations: Story<ProgressProps> = {
  ...reactMatrix(Progress, { hideLabel, size }),
  argTypes: omit('hideLabel', 'size'),
  parameters: {
    display: 'grid',
    columns: 'repeat(2, 1fr)',
  },
};
