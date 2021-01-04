import { Search, SearchProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

export default {
  title: 'React/Search',
  component: Search,
  argTypes: {
    ...omit<SearchProps>('className', 'style'),
    placeholder: { control: 'text' },
    disabled: {
      table: { type: { summary: 'boolean' } },
    },
  },
  args: {
    placeholder: 'Placeholder',
    disabled: false,
  },
} as Meta<SearchProps>;

export const Playground: Story<SearchProps> = (props: SearchProps) => (
  <Search {...props} />
);

export const Disabled = storyOf(Search, 'disabled', [true, false], {
  labelMode: 'prop',
  labelProp: 'defaultValue',
});
Disabled.argTypes = omit<SearchProps>('disabled');
