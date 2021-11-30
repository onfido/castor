import { IconName, iconNames } from '@onfido/castor-icons';
import { Button, ButtonProps, Icon } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

const disabled = [true, false] as const;
const kind = ['action', 'destructive'] as const;
const variant = ['primary', 'secondary', 'tertiary'] as const;

export default {
  title: 'React/Button',
  component: Button,
  argTypes: {
    children: {},
    disabled: {
      description: 'Only available when no `href` is set.',
    },
    href: {
      description: 'When set will render as `<a>` element.',
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

export const Playground: Story<ButtonProps<'a'>> = {};

export const Kind = reactMatrix(Button, { kind });
export const Variant = reactMatrix(Button, { variant });
export const Disabled = reactMatrix(Button, { disabled });
export const AsAnchor: Story<ButtonProps<'a'>> = {
  args: {
    href: 'javascript:void 0',
  },
  argTypes: omit('href'),
};

const [firstIconName] = iconNames;

interface ButtonWithIconProps extends ButtonProps {
  iconName: IconName;
}

export const WithIcon: Story<ButtonWithIconProps> = {
  render: ({ iconName, children, ...restProps }) => (
    <>
      <Button {...restProps}>
        <Icon name={iconName} aria-hidden="true" />
        {children}
      </Button>
      <Button {...restProps}>
        {children}
        <Icon name={iconName} aria-hidden="true" />
      </Button>
    </>
  ),
  args: {
    iconName: firstIconName,
  },
  argTypes: {
    iconName: { control: { type: 'select', options: iconNames } },
  },
};

export const AllCombinations: Story<ButtonProps> = {
  ...reactMatrix(
    (props: ButtonProps) => <Button {...props}>{label(props)}</Button>,
    { disabled, kind, variant }
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(3, 1fr)',
  },
};

const label = ({ disabled, kind, variant }: ButtonProps) =>
  `${kind} ${variant} ${disabled ? 'disabled' : ''}`;
