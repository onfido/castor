import { Spinner, SpinnerProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

const size = ['large', 'medium', 'small'] as const;
size.toString = () => size.map((value) => `"${value}"`).join('|');

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
        type: { summary: size.toString() },
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

export const Playground: Story<SpinnerProps> = (props: SpinnerProps) => (
  <Spinner {...props} />
);

export const Size = reactMatrix(Spinner, { size });
Size.argTypes = omit<SpinnerProps>('size');

export const WithoutLabel = (props: SpinnerProps) => <Spinner {...props} />;
WithoutLabel.argTypes = omit<SpinnerProps>('children');
WithoutLabel.args = {
  children: null,
};
