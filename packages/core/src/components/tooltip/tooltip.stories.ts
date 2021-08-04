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
  title: 'Core/Tooltip',
  component: Tooltip,
  argTypes: {
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
      control: { type: 'boolean' },
      description: [
        '`boolean`: show or hide the Tooltip.',
        '`"on-hover"`: show when the previous sibling matches `:hover` or `:focus`.',
        'Reset story props (icon on top right of this table) to set "on-hover" again.',
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

export const Playground: Story<TooltipProps> = (props) =>
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
  });

export const AllCombinations = htmlMatrix(
  Tooltip,
  { align, position },
  (props) =>
    html('div', {
      style: 'position: relative',
      children: [
        Button({ children: 'Target', kind: 'action', variant: 'primary' }),
        Tooltip({ ...props, children: `${props.position} ${props.align}` }),
      ],
    })
);
AllCombinations.args = {
  show: true,
};
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(3, 1fr)',
  style: {
    gap: '3rem',
    margin: '3rem',
    placeItems: 'center',
  },
};
