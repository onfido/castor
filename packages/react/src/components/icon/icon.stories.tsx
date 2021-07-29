import { iconNames } from '@onfido/castor-icons';
import { Icon, IconProps } from '@onfido/castor-react';
import React from 'react';
import {
  colors,
  Meta,
  omit,
  optionsToSummary,
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
        type: { summary: optionsToSummary(colors) },
      },
    },
    name: {
      type: { required: true },
      control: { type: 'select', options: iconNames },
      table: {
        required: true,
        type: { summary: optionsToSummary(iconNames) },
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
