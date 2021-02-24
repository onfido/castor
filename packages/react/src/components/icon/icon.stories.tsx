import { iconNames } from '@onfido/castor-icons';
import { Icon, IconProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';
import { colors } from '../../../../../docs/colors';

const [firstIconName] = iconNames;

export default {
  title: 'React/Icon',
  component: Icon,
  argTypes: {
    ...omit<IconProps>('className', 'style'),
    name: { control: { type: 'select', options: iconNames } },
    color: { control: { type: 'select', options: colors } },
  },
  args: {
    name: firstIconName,
  },
} as Meta<IconProps>;

export const Playground: Story<IconProps> = (props: IconProps) => (
  <Icon {...props} />
);

export const Name = storyOf(Icon, 'name', iconNames, {
  display: 'grid',
  labelMode: 'after',
});
Name.argTypes = omit<IconProps>('name');
