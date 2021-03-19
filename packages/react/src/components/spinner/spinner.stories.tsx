import { Spinner, SpinnerProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

const size = ['large', 'medium', 'small'] as const;

export default {
  title: 'React/Spinner',
  component: Spinner,
  argTypes: {
    children: {
      description: 'Optional label.',
    },
  },
  args: {
    children: 'Label',
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
