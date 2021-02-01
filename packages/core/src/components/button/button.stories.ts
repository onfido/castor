import { htmlMatrix, Meta, Story } from '../../../../../docs';
import { Icon } from '../icon/icon.story';
import { Button, HtmlButtonProps } from './button.story';

export default {
  title: 'Core/Button',
  component: Button,
  args: {
    children: 'Button',
    disabled: false,
    kind: 'action',
    variant: 'primary',
  },
} as Meta<HtmlButtonProps>;

export const Playground: Story<HtmlButtonProps> = (props) => Button(props);

export const AsAnchor: Story<HtmlButtonProps> = (props) =>
  Button({ ...props, href: 'javascript:0' });

const icon = Icon({ name: 'alarm' });
export const WithIcon: Story<HtmlButtonProps> = (props: HtmlButtonProps) =>
  Button({ ...props, children: icon + 'Button' }) +
  Button({ ...props, children: 'Button' + icon });

export const VisualRegressionTests = htmlMatrix(
  Button,
  {
    disabled: [false, true],
    kind: ['action', 'destructive'],
    variant: ['primary', 'secondary', 'tertiary'],
  },
  (p) =>
    Button({
      ...p,
      children: `${p.kind} ${p.variant} ${p.disabled ? 'disabled' : ''}`,
    })
);
VisualRegressionTests.parameters = {
  display: 'grid',
  columns: 'repeat(3, 1fr)',
};
