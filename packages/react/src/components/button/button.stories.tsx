import { IconName, iconNames } from '@onfido/castor-icons';
import { Button, ButtonProps, Icon } from '@onfido/castor-react';
import React from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';

export default {
  title: 'React/Button',
  component: Button,
  argTypes: {
    disabled: {
      description: 'Only available when no `href` is set.',
    },
    href: {
      description: 'When set will render as `<a>` element.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
  },
  args: {
    children: 'Button',
    disabled: false,
  },
  parameters: { display: 'flex' },
} as Meta<ButtonProps>;

const disabled = [true, false] as const;
const kind = ['action', 'destructive'] as const;
const variant = ['primary', 'secondary', 'tertiary'] as const;

export const Playground: Story<ButtonProps<'a'>> = ({ href, ...restProps }) => (
  <Button
    {...restProps}
    // don't set "href" key when value is empty string
    {...(href && { href })}
  />
);

export const Kind = reactMatrix(Button, { kind });
Kind.argTypes = omit<ButtonProps>('kind', 'children');

export const Variant = reactMatrix(Button, { variant });
Variant.argTypes = omit<ButtonProps>('variant', 'children');

export const Disabled = reactMatrix(Button, { disabled });
Disabled.argTypes = omit<ButtonProps>('disabled', 'children');

export const AsAnchor: Story<ButtonProps<'a'>> = (props) => (
  <Button href="javascript:void 0" {...props} />
);
AsAnchor.argTypes = omit<ButtonProps<'a'>>('href');

const [firstIconName] = iconNames;

interface ButtonWithIconProps extends ButtonProps {
  iconName: IconName;
}

export const WithIcon: Story<ButtonWithIconProps> = ({
  iconName,
  children,
  ...restProps
}: ButtonWithIconProps) => (
  <>
    <Button {...restProps}>
      <Icon name={iconName} />
      {children}
    </Button>
    <Button {...restProps}>
      {children}
      <Icon name={iconName} />
    </Button>
  </>
);
WithIcon.argTypes = {
  ...omit<ButtonWithIconProps>('children'),
  iconName: { control: { type: 'select', options: iconNames } },
};
WithIcon.args = {
  iconName: firstIconName,
};

export const AllCombinations = reactMatrix(
  Button,
  { disabled, kind, variant },
  (props) => <Button {...props}>{label(props)}</Button>
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(3, 1fr)',
};

const label = ({ disabled, kind, variant }: ButtonProps) =>
  `${kind} ${variant} ${disabled ? 'disabled' : ''}`;
