import {
  html,
  htmlMatrix,
  Meta,
  omit,
  optionsToSummary,
  Story,
} from '../../../../../docs';
import { Button } from '../button/button.story';
import styles from './popover.stories.scss';
import { Popover, PopoverProps } from './popover.story';

const align = ['center', 'start', 'end'] as const;
const position = ['top', 'left', 'right', 'bottom'] as const;

export default {
  title: 'CSS/Popover',
  component: Popover,
  argTypes: {
    ...omit('class'),
    align: {
      control: { type: 'inline-radio', options: align },
      defaultValue: 'center',
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: optionsToSummary(align) },
      },
    },
    children: { description: 'Content' },
    position: {
      control: { type: 'inline-radio', options: position },
      defaultValue: 'top',
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

type PlaygroundProps = PopoverProps & { show?: boolean };
export const Playground: Story<PlaygroundProps> = ({ show, ...props }) =>
  html('div', {
    style: { position: 'relative' },
    children: [
      Button({ children: 'Target', kind: 'action', variant: 'primary' }),
      show && Popover(props),
    ],
  });

export const ShowHideWithCSS: Story<PopoverProps> = (props) =>
  html('div', {
    style: { position: 'relative' },
    children: [
      Button({ children: 'Target', kind: 'action', variant: 'primary' }),
      Popover({ ...props, class: styles['story-popover-on-hover'] }),
    ],
  });
ShowHideWithCSS.storyName = 'show/hide with CSS';
ShowHideWithCSS.parameters = {
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
};

export const AllCombinations = htmlMatrix(
  Popover,
  { position, align }, // order is important
  (props) =>
    html('div', {
      style: { position: 'relative' },
      children: [
        Button({ children: 'Target', kind: 'action', variant: 'primary' }),
        Popover({ ...props, children: `${props.position} ${props.align}` }),
      ],
    })
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(3, 1fr)',
  style: {
    gap: '3rem',
    placeItems: 'center',
  },
};
