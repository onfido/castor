import { iconNames } from '@onfido/castor-icons';
import { Icon, IconProps } from '@onfido/castor-react';
import React from 'react';
import {
  aria,
  colors,
  Meta,
  omit,
  reactMatrix,
  Story,
} from '../../../../../docs';

const [firstIconName] = iconNames;

export default {
  title: 'React/Icon',
  component: Icon,
  argTypes: {
    color: {
      control: { type: 'select', options: colors },
      table: {
        type: { summary: colors.map((value) => `"${value}"`).join('|') },
      },
    },
    name: {}, // just reorders in the table
    'aria-hidden': aria.hidden,
    'aria-label': aria.label,
  },
  args: {
    name: firstIconName,
  },
} as Meta<IconProps>;

export const Playground: Story<IconProps> = (props) => <Icon {...props} />;
Playground.args = {
  'aria-label': 'A label for an icon',
};

export const Name = reactMatrix(Icon, { name: iconNames }, (props) => (
  <>
    <Icon {...props} /> {props.name}
  </>
));
Name.argTypes = omit<IconProps>('name');
Name.args = {
  'aria-hidden': 'true',
};
Name.parameters = {
  display: 'grid',
  columns: 'repeat(4, auto 1fr)',
};
