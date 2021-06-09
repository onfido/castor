import { iconNames } from '@onfido/castor-icons';
import { Icon, IconProps } from '@onfido/castor-react';
import React from 'react';
import { colors, Meta, omit, reactMatrix, Story } from '../../../../../docs';

const [firstIconName] = iconNames;

export default {
  title: 'React/Components/Icon',
  component: Icon,
  argTypes: {
    color: {
      control: { type: 'select', options: colors },
      table: {
        type: { summary: colors.map((value) => `"${value}"`).join('|') },
      },
    },
  },
  args: {
    name: firstIconName,
  },
} as Meta<IconProps>;

export const Playground: Story<IconProps> = (props) => <Icon {...props} />;

export const Name = reactMatrix(Icon, { name: iconNames }, (props) => (
  <>
    <Icon {...props} /> {props.name}
  </>
));
Name.argTypes = omit<IconProps>('name');
Name.parameters = {
  display: 'grid',
  columns: 'repeat(4, auto 1fr)',
};
