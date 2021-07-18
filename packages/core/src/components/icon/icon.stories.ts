import { IconProps } from '@onfido/castor';
import { iconNames } from '@onfido/castor-icons';
import { colors, htmlMatrix, Meta, Story } from '../../../../../docs';
import { Icon } from './icon.story';

const [firstIconName] = iconNames;

export default {
  title: 'Core/Components/Icon',
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
