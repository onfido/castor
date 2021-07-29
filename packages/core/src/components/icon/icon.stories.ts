import { iconNames } from '@onfido/castor-icons';
import { colors, htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { Icon, IconProps } from './icon.story';

const [firstIconName] = iconNames;

export default {
  title: 'Core/Icon',
  component: Icon,
  argTypes: {
    ...omit<IconProps>('aria-hidden'),
    color: {
      control: { type: 'select', options: colors },
      table: {
        type: { summary: colors.map((value) => `"${value}"`).join('|') },
      },
    },
    name: {
      type: { required: true },
      control: { type: 'select', options: iconNames },
      table: {
        type: { summary: iconNames.map((value) => `"${value}"`).join('|') },
      },
    },
  },
  args: {
    name: firstIconName,
  },
} as Meta<IconProps>;

export const Playground: Story<IconProps> = (props) => Icon(props);

export const Name = htmlMatrix(
  Icon,
  { name: iconNames },
  (props) => Icon(props) + props.name
);
Name.parameters = {
  display: 'grid',
  columns: 'repeat(4, auto 1fr)',
};
