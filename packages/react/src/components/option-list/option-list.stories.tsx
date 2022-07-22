import { IconCheck } from '@onfido/castor-icons';
import {
  Option,
  OptionGroup,
  OptionList,
  OptionListProps,
} from '@onfido/castor-react';
import React from 'react';
import { Meta, Story } from '../../../../../docs';

export default {
  title: 'React/OptionList',
  component: OptionList,
  argTypes: {
    children: {
      control: false,
      description: 'List of options using `Option`.',
    },
  },
  args: {
    children: (
      <>
        <Option hidden value="">
          I am hidden!
        </Option>
        <Option value={1}>Option</Option>
        <Option value={2} disabled>
          Disabled option
        </Option>
        <Option value="long">Longer option that is quite long</Option>
        <Option value="enormous">
          An enormously long option that spans over two lines
        </Option>
      </>
    ),
  },
  parameters: { display: 'flex' },
} as Meta<OptionListProps>;

export const Playground: Story<OptionListProps> = {};

export const InlineIcon: Story<OptionListProps> = {
  render: (props) => <OptionList {...props} icon={<IconCheck />} />,
  parameters: {
    docs: {
      source: {
        code: `
import { IconCheck } from '@onfido/castor-icons';

<OptionList icon={<IconCheck />}>
  {/* options */}
</OptionList>
`,
      },
    },
  },
};
IconCheck.displayName = 'IconCheck';

export const OptionGroups: Story<OptionListProps> = {
  args: {
    children: (
      <>
        <Option hidden value="">
          Select an animal...
        </Option>
        <OptionGroup label="Birds">
          <Option value="finch">🦜 Finch</Option>
          <Option value="penguin">🐧 Penguin</Option>
        </OptionGroup>
        <OptionGroup label="Insects">
          <Option value="bee">🐝 Bee</Option>
        </OptionGroup>
        <OptionGroup label="Mammals">
          <Option value="lion">🦁 Lion</Option>
          <Option value="monkey">🐒 Monkey</Option>
        </OptionGroup>
      </>
    ),
  },
};

export const AllCombinations: Story<OptionListProps> = {
  render: (props) => (
    <OptionList {...props} defaultValue="enormous">
      <Option hidden value="">
        I am hidden!
      </Option>
      <Option value={1}>Option</Option>
      <Option value={2} disabled>
        Disabled option
      </Option>
      <Option value="long">Longer option that is quite long</Option>
      <Option value="enormous">
        An enormously long option that spans over two lines
      </Option>
    </OptionList>
  ),
};
