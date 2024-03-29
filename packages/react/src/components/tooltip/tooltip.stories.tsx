import { Button, Tooltip, TooltipProps } from '@onfido/castor-react';
import React, { Fragment, useRef } from 'react';
import {
  Meta,
  optionsToSummary,
  reactMatrix,
  Story,
} from '../../../../../docs';

const align = ['center', 'start', 'end'] as const;
const position = ['top', 'left', 'right', 'bottom'] as const;

export default {
  title: 'React/Tooltip',
  component: Tooltip,
  argTypes: {
    withPortal: {
      description: [
        'Toggle between an example with and without `target` ref.',
        'Specific to `react-dom`.',
      ].join('\n\n'),
      name: '[Story only] with portal',
    },
    align: {
      control: { type: 'inline-radio', options: align },
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: optionsToSummary(align) },
      },
    },
    children: { control: { type: 'text' } },
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
    target: { control: { disable: true } },
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

export const Playground: Story<TooltipProps & { withPortal?: boolean }> = {
  args: {
    withPortal: true,
  },
  render: ({ withPortal, ...props }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const Container = withPortal ? Fragment : 'div';

    return (
      <Container {...(withPortal || { style: { position: 'relative' } })}>
        <Button ref={withPortal ? ref : undefined}>Hover or focus me</Button>
        <Tooltip {...props} target={withPortal ? ref : undefined} />
      </Container>
    );
  },
};

export const AllCombinations: Story<TooltipProps> = {
  ...reactMatrix(
    (props: TooltipProps) => (
      <div style={{ position: 'relative' }}>
        <Button>Target</Button>
        <Tooltip {...props}>
          {props.position} {props.align}
        </Tooltip>
      </div>
    ),
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
