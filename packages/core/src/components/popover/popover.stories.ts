import {
  html,
  htmlMatrix,
  Meta,
  omit,
  optionsToSummary,
  Story,
} from '../../../../../docs';
import { Button } from '../button/button.story';
import * as styles from './popover.stories.scss';
import { Popover, PopoverProps } from './popover.story';

const align = ['center', 'start', 'end'] as const;
const position = ['top', 'left', 'right', 'bottom'] as const;

export default {
  title: 'CSS/Popover',
  component: Popover,
  render: Popover as unknown,
  argTypes: {
    ...omit('class'),
    align: {
      control: { type: 'inline-radio', options: align },
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: optionsToSummary(align) },
      },
    },
    children: { description: 'Content' },
    position: {
      control: { type: 'inline-radio', options: position },
      table: {
        defaultValue: { summary: 'top' },
        type: { summary: optionsToSummary(position) },
      },
    },
    show: {
      description: 'Show or hide the Popover. This example uses HTML presence.',
      name: '[story only] show',
      table: { control: 'boolean' },
    },
  },
  args: {
    children: 'Popover content',
    show: true,
  },
  parameters: {
    display: 'flex',
    style: {
      placeContent: 'center',
    },
  },
} as Meta<PopoverProps>;

export const Playground: Story<PopoverProps & { show?: boolean }> = {
  render: ({ show, ...props }) =>
    html('div', {
      style: { position: 'relative' },
      children: [
        Button({ children: 'Target', kind: 'action', variant: 'primary' }),
        show && Popover(props),
      ],
    }),
};

export const ShowHideWithCSS: Story<PopoverProps> = {
  render: (props) =>
    html('div', {
      style: { position: 'relative' },
      children: [
        Button({ children: 'Target', kind: 'action', variant: 'primary' }),
        Popover({ ...props, class: styles['story-popover-on-hover'] }),
      ],
    }),
  storyName: 'show/hide with CSS',
  parameters: {
    docs: {
      source: {
        code: `
// CSS must be set outside of Castor, e.g.
// :not(:focus, :hover) + .ods-popover {
//   opacity: 0;
// }
<div style={{ position: 'relative' }}>
  <button class="ods-button -action--primary">Target</button>
  <div class="ods-popover -center--top">Popover content</div>
</div>
        `,
      },
    },
  },
};

export const AllCombinations: Story<PopoverProps> = {
  ...htmlMatrix(
    (props: PopoverProps) =>
      html('div', {
        style: { position: 'relative' },
        children: [
          Button({ children: 'Target', kind: 'action', variant: 'primary' }),
          Popover({ ...props, children: `${props.position} ${props.align}` }),
        ],
      }),
    { position, align } // order is important
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(3, 1fr)',
    style: {
      gap: '3rem',
      placeItems: 'center',
    },
  },
};
