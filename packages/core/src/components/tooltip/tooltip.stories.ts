import {
  html,
  htmlMatrix,
  Meta,
  optionsToSummary,
  Story,
} from '../../../../../docs';
import { Button } from '../button/button.story';
import { Tooltip, TooltipProps } from './tooltip.story';

const align = ['center', 'start', 'end'] as const;
const position = ['top', 'left', 'right', 'bottom'] as const;

export default {
  title: 'CSS/Tooltip',
  component: Tooltip,
  render: Tooltip,
  argTypes: {
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
      control: { type: 'inline-radio', options: ['on-hover', true, false] },
      description: [
        '`boolean`: show or hide the Tooltip.',
        '`"on-hover"`: show when the previous sibling matches `:hover` or `:focus`.',
      ].join('\n\n'),
      table: { type: { summary: 'boolean | "on-hover"' } },
    },
  },
  args: {
    children: 'Tooltip',
    show: 'on-hover',
  },
  parameters: {
    display: 'flex',
    style: {
      placeContent: 'center',
    },
  },
} as Meta<TooltipProps>;

export const Playground: Story<TooltipProps> = {
  render: (props) =>
    html('div', {
      style: 'position: relative',
      children: [
        Button({
          children: 'Hover or focus me',
          kind: 'action',
          variant: 'primary',
        }),
        Tooltip(props),
      ],
    }),
};

export const AllCombinations: Story<TooltipProps> = {
  ...htmlMatrix(
    (props: TooltipProps) =>
      html('div', {
        style: 'position: relative',
        children: [
          Button({ children: 'Target', kind: 'action', variant: 'primary' }),
          Tooltip({ ...props, children: `${props.position} ${props.align}` }),
        ],
      }),
    { position, align } // order is important
  ),
  args: {
    show: true,
  },
  parameters: {
    display: 'grid',
    columns: 'repeat(3, 1fr)',
    style: {
      gap: '3rem',
      margin: '3rem',
      placeItems: 'center',
    },
  },
};
