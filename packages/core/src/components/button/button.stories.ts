import { iconNames } from '@onfido/castor-icons';
import { htmlMatrix, Meta, Story } from '../../../../../docs';
import { Icon } from '../icon/icon.story';
import { Button, ButtonProps } from './button.story';

const disabled = [true, false] as const;
const kind = ['action', 'destructive'] as const;
const variant = ['primary', 'secondary', 'tertiary'] as const;

export default {
  title: 'CSS/Button',
  component: Button,
  render: Button,
  argTypes: {
    children: {},
    disabled: {
      description: 'Only available in `<button>` element.',
    },
    href: {
      description: 'Use with `<a>` element instead of `<button>`.',
    },
  },
  args: {
    children: 'Button',
    disabled: false,
    kind: 'action',
    variant: 'primary',
  },
  parameters: { display: 'flex' },
} as Meta<ButtonProps>;

export const Playground: Story<ButtonProps> = {};

export const Kind = htmlMatrix(Button, { kind });
export const Variant = htmlMatrix(Button, { variant });
export const Disabled = htmlMatrix(Button, { disabled });

export const AsAnchor: Story<ButtonProps> = {
  args: { href: 'javascript:void 0' },
};

const [firstIconName] = iconNames;
const icon = Icon({ name: firstIconName, ['aria-hidden']: 'true' });
export const WithIcon: Story<ButtonProps> = {
  render: ({ children, ...props }) =>
    Button({ ...props, children: icon + children }) +
    Button({ ...props, children: children + icon }),
};

export const AllCombinations: Story<ButtonProps> = {
  ...htmlMatrix(
    (props: ButtonProps) => Button({ ...props, children: label(props) }),
    { disabled, kind, variant }
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(3, 1fr)',
  },
};

const label = ({ disabled, kind, variant }: ButtonProps) =>
  `${kind} ${variant} ${disabled ? 'disabled' : ''}`;
