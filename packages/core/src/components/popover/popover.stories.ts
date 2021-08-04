import {
  html,
  htmlMatrix,
  Meta,
  optionsToSummary,
  Story,
} from '../../../../../docs';
import { Button } from '../button/button.story';
import { Popover, PopoverProps } from './popover.story';

const align = ['center', 'start', 'end'] as const;
const position = ['top', 'left', 'right', 'bottom'] as const;

export default {
  title: 'Core/Popover',
  component: Popover,
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
  },
  args: {
    children: 'Popover content',
  },
  parameters: {
    display: 'flex',
    style: {
      placeContent: 'center',
    },
  },
} as Meta<PopoverProps>;

export const Playground: Story<PopoverProps> = (props) =>
  html('div', {
    style: { position: 'relative' },
    children: [
      Button({ children: 'Target', kind: 'action', variant: 'primary' }),
      Popover(props),
    ],
  });

export const AllCombinations = htmlMatrix(
  Popover,
  { align, position },
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
