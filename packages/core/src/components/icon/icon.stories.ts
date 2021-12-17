import { IconProps } from '@onfido/castor';
import { iconNames } from '@onfido/castor-icons';
import {
  aria,
  colors,
  htmlMatrix,
  Meta,
  optionsToSummary,
  Story,
} from '../../../../../docs';
import { Icon } from './icon.story';

const [firstIconName] = iconNames;

export default {
  title: 'CSS/Icon',
  component: Icon,
  render: Icon,
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
  args: { 'aria-label': 'A label for an icon' },
};

export const Name: Story<IconProps> = {
  ...htmlMatrix((props: IconProps) => Icon(props) + props.name, {
    name: iconNames,
  }),
  args: {
    'aria-hidden': 'true',
  },
  parameters: {
    display: 'grid',
    columns: 'repeat(4, auto 1fr)',
  },
};
