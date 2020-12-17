import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../docs';
import { Search, SearchProps } from './search.react';

export default {
  title: 'React/Search',
  component: Search,
  argTypes: {
    ...omit<HTMLInputElement>('type'),
    disabled: { table: { type: { summary: 'boolean' } } },
    placeholder: { control: 'text' },
  },
  args: {
    disabled: false,
    placeholder: 'Placeholder',
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
