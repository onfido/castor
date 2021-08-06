import { Spinner, SpinnerProps } from '@onfido/castor-react';
import React from 'react';
import {
  Meta,
  omit,
  optionsToSummary,
  reactMatrix,
  Story,
} from '../../../../../docs';

const size = ['large', 'medium', 'small'] as const;

export default {
  title: 'React/Spinner',
  component: Spinner,
  argTypes: {
    children: {
      description: 'Optional label.',
    },
    size: {
      control: { type: 'radio', options: size },
      table: {
        type: { summary: optionsToSummary(size) },
        defaultValue: { summary: 'medium' },
      },
    },
  },
  args: {
    children: 'Label',
    size: 'medium',
  },
  parameters: { display: 'flex' },
} as Meta<SpinnerProps>;

export const Playground: Story<SpinnerProps> = (props) => (
  <Spinner {...props} />
);

export const Size = reactMatrix(Spinner, { size });
Size.argTypes = omit('size');

export const WithoutLabel: Story<SpinnerProps> = (props) => (
  <Spinner {...props} />
);
WithoutLabel.argTypes = omit('children');
WithoutLabel.args = {
  children: null,
};
