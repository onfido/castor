import { Button } from '@onfido/castor-react';
import React, { Fragment, useRef } from 'react';
import { Meta, omit, reactMatrix, Story } from '../../../../../docs';
import { Popover, PopoverProps } from './popover';

const align = ['center', 'start', 'end'] as const;
const place = ['top', 'left', 'right', 'bottom'] as const;

export default {
  title: 'React/Popover',
  component: Popover,
  argTypes: {
    ...omit<PopoverProps>('onClose', 'target'),
    align: {
      control: { type: 'inline-radio', options: align },
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: align.join('|') },
      },
    },
    children: {
      description: 'Content',
      table: { type: { summary: 'ReactNode' } },
    },
    place: {
      control: { type: 'inline-radio', options: place },
      table: {
        defaultValue: { summary: 'top' },
        type: { summary: place.join('|') },
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
      <Button ref={withPortal ? ref : undefined}>Target</Button>
      <Popover {...props} target={withPortal ? ref : undefined} />
    </Container>
  );
};
Playground.args = {
  withPortal: true,
};

export const AllCombinations = reactMatrix(
  Popover,
  { align, place },
  (props) => {
    const ref = useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button ref={ref}>Target</Button>
        <Popover {...props} target={ref}>
          {props.place} {props.align}
        </Popover>
      </>
    );
  }
);
AllCombinations.parameters = {
  display: 'grid',
  columns: 'repeat(3, 1fr)',
  style: {
    gap: '3rem',
    placeItems: 'center',
  },
};
