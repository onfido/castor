import { Meta, omit, Story } from '../../../../../docs';
import {
  Option,
  OptionGroup,
  OptionList,
  OptionListProps,
} from './option-list.story';

export default {
  title: 'CSS/OptionList',
  component: OptionList,
  render: OptionList,
  argTypes: {
    ...omit('class', 'name', 'value'),
    children: {
      control: false,
      description: 'List of `.ods-option`.',
    },
    name: {
      control: false,
      description: 'Must be unique per OptionList.',
    },
  },
  args: {},
  parameters: { display: 'flex' },
} as Meta<OptionListProps>;

export const Playground: Story<OptionListProps> = {
  args: {
    children: children('playground'),
  },
};

export const OptionGroups: Story<OptionListProps> = {
  args: {
    children: [
      OptionGroup({ children: 'Birds' }),
      Option({ children: '🦜 Finch', name: 'option-groups', value: 'finch' }),
      Option({
        children: '🐧 Penguin',
        name: 'option-groups',
        value: 'penguin',
      }),
      OptionGroup({ children: 'Insects' }),
      Option({ children: '🐝 Bee', name: 'option-groups', value: 'bee' }),
      OptionGroup({ children: 'Mammals' }),
      Option({ children: '🐒 Monkey', name: 'option-groups', value: 'monkey' }),
      Option({ children: '🦁 Lion', name: 'option-groups', value: 'lion' }),
    ],
  },
};

export const AllCombinations: Story<OptionListProps> = {
  args: {
    children: children('all-combinations'),
  },
};

function children(name: string) {
  return [
    Option({ children: 'Option', name, value: 1 }),
    Option({ children: 'Disabled option', disabled: true, name, value: 2 }),
    Option({
      children: 'Longer option that is quite long',
      name,
      value: 'long',
    }),
    Option({
      children: 'An enormously long option that spans over two lines',
      name,
      value: 'enormous',
    }),
  ];
}
