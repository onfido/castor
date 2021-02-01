import { iconNames } from '@onfido/castor-icons';
import { htmlMatrix, Meta, Story } from '../../../../../docs';
import { IconProps } from './icon';
import { Icon } from './icon.story';

export default {
  title: 'Core/Icon',
  component: Icon,
  args: {
    name: 'alarm',
  },
} as Meta<IconProps>;

export const Playground: Story<IconProps> = (props) => Icon(props);

export const VisualRegressionTests = htmlMatrix(
  Icon,
  { name: iconNames },
  (props) => Icon(props) + props.name
);
VisualRegressionTests.parameters = {
  display: 'grid',
  columns: 'repeat(4, auto 1fr)',
};
