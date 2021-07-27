import { html, htmlMatrix, Meta, Story } from '../../../../../docs';
import { Button } from '../button/button.story';
import { Popover, PopoverProps } from './popover.story';

const placement = ['top', 'left', 'right', 'bottom'].flatMap((position) =>
  ['center', 'start', 'end'].map((alignment) => `${position}-${alignment}`)
) as PopoverProps['placement'][];

export default {
  title: 'Core/Popover',
  component: Popover,
  argTypes: {
    children: { description: 'Content' },
    placement: {
      control: { type: 'select', options: placement },
      defaultValue: 'top-center',
      description: 'A pair of where to place the tooltip and how to align it',
      table: {
        defaultValue: { summary: 'top-center' },
        type: { summary: placement.join('|') },
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

export const AllCombinations = htmlMatrix(Popover, { placement }, (props) =>
  html('div', {
    style: { position: 'relative' },
    children: [
      Button({ children: 'Target', kind: 'action', variant: 'primary' }),
      Popover({ ...props, children: props.placement }),
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
