import { Search, SearchProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

const disabled = [true, false] as const;

export default {
  title: 'React/Search',
  component: Search,
  argTypes: {
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
    placeholder: {
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    disabled: false,
    placeholder: 'Placeholder',
  },
  parameters: { display: 'flex' },
} as Meta<SearchProps>;

export const Playground: Story<SearchProps> = (props: SearchProps) => (
  <Search {...props} />
);

export const Disabled = reactMatrix(Search, { disabled });
Disabled.argTypes = omit<SearchProps>('disabled');
