import React from 'react';
import { Color } from '@onfido/castor';
import { iconNames } from '@onfido/castor-icons';
import { Meta, Story, omit, storyOf, tokens } from '../../../../docs';
import { IconProps, Icon } from './icon.react';

const colors = Object.keys(tokens).reduce((accumulator, name) => {
  const [, color] = name.match(/^--color-([a-z0-9-]+)$/) ?? [];
  return color ? [...accumulator, color] : accumulator;
}, []) as Color[];

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
