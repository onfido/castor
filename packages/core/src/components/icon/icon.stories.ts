import { iconNames } from '@onfido/castor-icons';
import {
  aria,
  colors,
  htmlMatrix,
  Meta,
  omit,
  optionsToSummary,
  Story,
} from '../../../../../docs';
import { Icon, IconProps } from './icon.story';

const [firstIconName] = iconNames;

export default {
  title: 'Core/Icon',
  component: Icon,
  argTypes: {
    ...omit('aria-hidden'),
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
        type: { summary: optionsToSummary(iconNames) },
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

export const Playground: Story<IconProps> = (props) => Icon(props);
Playground.args = {
  'aria-label': 'A label for an icon',
};

export const Name = htmlMatrix(
  Icon,
  { name: iconNames },
  (props) => Icon(props) + props.name
);
Name.args = {
  'aria-hidden': 'true',
};
Name.parameters = {
  display: 'grid',
  columns: 'repeat(4, auto 1fr)',
};
