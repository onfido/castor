import { IconSearch } from '@onfido/castor-icons';
import { Search, SearchProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, reactMatrix, Story } from '../../../../../docs';

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

export const Playground: Story<SearchProps> = {};

export const InlineIcon: Story<SearchProps> = {
  render: (props) => <Search {...props} icon={<IconSearch />} />,
  parameters: {
    docs: {
      source: {
        code: `
import { IconSearch } from '@onfido/castor-icons';

<Search icon={<IconSearch />} placeholder="Placeholder" />
`,
      },
    },
  },
};
IconSearch.displayName = 'IconSearch';

export const Disabled = reactMatrix(Search, { disabled });
