import { Combobox, ComboboxProps, Option } from '@onfido/castor-react';
import React from 'react';
import { Meta, reactMatrix, Story } from '../../../../../docs';

const disabled = [true, false] as const;

export default {
  title: 'React/Combobox',
  component: Combobox,
  argTypes: {
    children: {
      control: false,
      description: 'List of options using `Option`.',
    },
    disabled: {},
    empty: {
      control: { type: 'string' },
    },
  },
  args: {
    children: (
      <>
        <Option hidden value="">
          Select an option...
        </Option>
        <Option value={1}>Option</Option>
        <Option value={2} disabled>
          Disabled option
        </Option>
        <Option value="long">Longer option that is quite long</Option>
        <Option value="enormous">
          An enormously long option that we truncate when it gets too long
        </Option>
      </>
    ),
    disabled: false,
  },
  parameters: { display: 'flex' },
} as Meta<ComboboxProps>;

export const Playground: Story<ComboboxProps> = {};

export const Disabled = reactMatrix(Combobox, { disabled });

export const Keywords: Story<ComboboxProps> = {
  parameters: {
    docs: {
      description: {
        story: [
          'Options match by "textContent", "value", and specified "keywords".',
          'Click "Show code" to see what they can match to.',
        ].join('\n\n'),
      },
    },
  },
  args: {
    children: (
      <>
        <Option hidden value="">
          Select an option...
        </Option>
        <Option value="foo">Matches textContent and value</Option>
        <Option keywords="1" value="first">
          One
        </Option>
        <Option keywords={['2', '3']} value="second/third">
          Two or three
        </Option>
        <Option keywords value="always">
          Setting <code>keywords</code> to <code>true</code> will make this
          option always show, regardless of search term
        </Option>
      </>
    ),
  },
};

export const AllCombinations: Story<ComboboxProps> = {
  ...reactMatrix((props: ComboboxProps) => <Combobox {...props} />, {
    disabled,
  }),
  parameters: {
    display: 'grid',
    columns: 'repeat(3, 1fr)',
  },
};
