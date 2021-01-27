import { space } from '@onfido/castor';
import { IconName, iconNames } from '@onfido/castor-icons';
import { Button, ButtonProps, Icon } from '@onfido/castor-react';
import React, { SyntheticEvent } from 'react';
import { Meta, omit, Story, storyOf } from '../../../../../docs';

export default {
  title: 'React/Button',
  component: Button,
  argTypes: {
    ...omit<ButtonProps>('className', 'onClick', 'style'),
    children: { control: 'text' },
    href: {
      description: 'When set will render as `<a>` element.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    disabled: {
      description: 'Only available when no `href` is set.',
      table: { type: { summary: 'boolean' } },
    },
  },
  args: {
    children: 'Button',
    disabled: false,
    onClick: (event: SyntheticEvent<EventTarget>) => event.preventDefault(),
  },
} as Meta<ButtonProps>;

export const Playground: Story<ButtonProps> = ({
  href,
  ...restProps
}: ButtonProps & Pick<JSX.IntrinsicElements['a'], 'href'>) => (
  <Button
    {...{
      ...restProps,
      ...(href && { href }), // don't set "href" key when value is empty string
    }}
  />
);

export const Kind = storyOf(Button, 'kind', ['action', 'destructive']);
Kind.argTypes = omit<ButtonProps>('kind', 'children');

export const Variant = storyOf(Button, 'variant', [
  'primary',
  'secondary',
  'tertiary',
]);
Variant.argTypes = omit<ButtonProps>('variant', 'children');

export const Disabled = storyOf(Button, 'disabled', [true, false]);
Disabled.argTypes = omit<ButtonProps>('disabled', 'children');

export const AsAnchor: Story<ButtonProps<'a'>> = (props) => (
  <Button href="#" {...props} />
);
AsAnchor.argTypes = omit<ButtonProps<'a'>>('href');

interface ButtonWithIconProps extends ButtonProps {
  iconName: IconName;
}

const [firstIconName] = iconNames;

export const WithIcon = ({
  iconName,
  children,
  ...restButtonProps
}: ButtonWithIconProps) => (
  <div
    style={{
      display: 'inline-grid',
      gap: space(1),
      gridAutoFlow: 'column',
    }}
  >
    <Button {...restButtonProps}>
      <Icon name={iconName} />
      {children}
    </Button>
    <Button {...restButtonProps}>
      {children}
      <Icon name={iconName} />
    </Button>
  </div>
);
WithIcon.argTypes = {
  ...omit<ButtonWithIconProps>('children'),
  iconName: { control: { type: 'select', options: iconNames } },
};
WithIcon.args = {
  iconName: firstIconName,
};
