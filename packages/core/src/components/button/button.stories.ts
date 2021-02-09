import { htmlMatrix, Meta, omit, Story } from '../../../../../docs';
import { Icon } from '../icon/icon.story';
import { Button, ButtonProps } from './button.story';

export default {
  title: 'Core/Button',
  component: Button,
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
} as Meta<ButtonProps>;

const disabled = [true, false] as const;
const kind = ['action', 'destructive'] as const;
const variant = ['primary', 'secondary', 'tertiary'] as const;

export const Playground: Story<ButtonProps> = (props) => Button(props);

export const Kind = htmlMatrix(Button, { kind });
Kind.argTypes = omit<ButtonProps>('kind', 'children');

export const Variant = htmlMatrix(Button, { variant });
Variant.argTypes = omit<ButtonProps>('variant', 'children');

export const Disabled = htmlMatrix(Button, { disabled });
Disabled.argTypes = omit<ButtonProps>('disabled', 'children');

export const AsAnchor: Story<ButtonProps> = (props) =>
  Button({ ...props, href: 'javascript:void 0' });

const icon = Icon({ name: 'alarm' });
export const WithIcon: Story<ButtonProps> = (props: ButtonProps) =>
  Button({ ...props, children: icon + 'Button' }) +
  Button({ ...props, children: 'Button' + icon });

export const AllCombinations = htmlMatrix(
  Button,
  { disabled, kind, variant },
  (props) => Button({ ...props, children: label(props) })
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(3, 1fr)',
};

const label = ({ disabled, kind, variant }: ButtonProps) =>
  `${kind} ${variant} ${disabled ? 'disabled' : ''}`;
