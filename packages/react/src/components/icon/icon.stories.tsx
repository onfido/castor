import { iconNames } from '@onfido/castor-icons';
import { Icon, IconProps } from '@onfido/castor-react';
import React from 'react';
import {
  aria,
  colors,
  Meta,
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
      control: { type: 'select', options: iconNames },
      table: {
        required: true,
        type: { summary: optionsToSummary(iconNames) },
      },
      type: { name: 'string', required: true },
    },
    'aria-hidden': aria.hidden,
    'aria-label': aria.label,
  },
  args: {
    name: firstIconName,
  },
} as Meta<IconProps>;

export const Playground: Story<IconProps> = {
  args: {
    'aria-label': 'A label for an icon',
  },
};

export const Name: Story<IconProps> = {
  ...reactMatrix(
    (props: IconProps) => (
      <>
        <Icon {...props} /> {props.name}
      </>
    ),
    { name: iconNames }
  ),
  args: {
    'aria-hidden': 'true',
  },
  parameters: {
    display: 'grid',
    columns: 'repeat(4, auto 1fr)',
  },
};
