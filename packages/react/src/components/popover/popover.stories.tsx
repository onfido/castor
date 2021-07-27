import { Button } from '@onfido/castor-react';
import React, { Fragment, useRef } from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';
import { Popover, PopoverProps } from './popover';

const placement = ['top', 'left', 'right', 'bottom'].flatMap((position) =>
  ['center', 'start', 'end'].map((alignment) => `${position}-${alignment}`)
) as PopoverProps['placement'][];

export default {
  title: 'React/Popover',
  component: Popover,
  argTypes: {
    ...omit<PopoverProps>('onClose', 'target'),
    children: {
      description: 'Content',
      table: { type: { summary: 'ReactNode' } },
    },
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

export const Playground: Story<PopoverProps & { withPortal?: boolean }> = ({
  withPortal,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const Container = withPortal ? Fragment : 'div';

  return (
    <Container {...(withPortal || { style: { position: 'relative' } })}>
      <Button ref={ref}>Target</Button>
      <Popover {...props} target={withPortal ? ref : undefined} />
    </Container>
  );
};
Playground.args = {
  withPortal: true,
};

export const AllCombinations = reactMatrix(Popover, { placement }, (props) => {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={ref}>Target</Button>
      <Popover {...props} target={ref}>
        {props.placement}
      </Popover>
    </>
  );
});
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(3, 1fr)',
  style: {
    gap: '3rem',
    placeItems: 'center',
  },
};
