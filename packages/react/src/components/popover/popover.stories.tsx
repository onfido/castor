import { Button } from '@onfido/castor-react';
import React, { Fragment, useRef } from 'react';
import {
  Meta,
  omit,
  optionsToSummary,
  reactMatrix,
  Story,
} from '../../../../../docs';
import { Popover, PopoverProps } from './popover';

const align = ['center', 'start', 'end'] as const;
const position = ['top', 'left', 'right', 'bottom'] as const;

export default {
  title: 'React/Popover',
  component: Popover,
  argTypes: {
    ...omit('onClose', 'target'),
    align: {
      control: { type: 'inline-radio', options: align },
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: optionsToSummary(align) },
      },
    },
    children: {
      description: 'Content',
      table: { type: { summary: 'ReactNode' } },
    },
    position: {
      control: { type: 'inline-radio', options: position },
      table: {
        defaultValue: { summary: 'top' },
        type: { summary: optionsToSummary(position) },
      },
    },
    withPortal: {
      description: [
        'Toggle between an example with and without `target` ref.',
        'Specific to `react-dom`.',
      ].join('\n\n'),
      name: '[Story only] with portal',
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
  { position, align }, // order is important
  (props) => {
    const ref = useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button ref={ref}>Target</Button>
        <Popover {...props} target={ref}>
          {props.position} {props.align}
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
