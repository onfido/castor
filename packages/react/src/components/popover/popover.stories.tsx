import { Button, Popover, PopoverProps } from '@onfido/castor-react';
import React, { Fragment, useRef, useState } from 'react';
import {
  Meta,
  optionsToSummary,
  reactMatrix,
  Story,
} from '../../../../../docs';
import styles from './popover.stories.scss';

const align = ['center', 'start', 'end'] as const;
const position = ['top', 'left', 'right', 'bottom'] as const;

export default {
  title: 'React/Popover',
  component: Popover,
  argTypes: {
    align: {
      control: { type: 'inline-radio', options: align },
      description: 'Preferred value. Will readjust to avoid screen clipping.',
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: optionsToSummary(align) },
      },
    },
    children: { table: { type: { summary: 'ReactNode' } } },
    onClose: {
      description: [
        'When `target` is specified, this event will notify of clicks outside',
        'the Popover, which have the intention to close/hide it.',
      ].join(' '),
    },
    target: {
      control: { disable: true },
      description: [
        'A React `ref` of the element to use for placement.',
        'If specified will use a React Portal to avoid overflow issues.',
      ].join('\n\n'),
    },
    position: {
      control: { type: 'inline-radio', options: position },
      description: 'Preferred value. Will readjust to avoid screen clipping.',
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
    withPortal: {
      description: 'Toggle between an example with and without `target` ref.',
      name: '[story only] with portal',
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

type PlaygroundProps = PopoverProps & { show?: boolean; withPortal?: boolean };
export const Playground: Story<PlaygroundProps> = ({
  show,
  withPortal,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const Container = withPortal ? Fragment : 'div';

  return (
    <Container {...(withPortal || { style: { position: 'relative' } })}>
      <Button ref={withPortal ? ref : undefined}>Target</Button>
      {show && <Popover {...props} target={withPortal ? ref : undefined} />}
    </Container>
  );
};
Playground.args = {
  withPortal: true,
};

export const ShowHideWithState: Story<PopoverProps> = (props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [show, setShow] = useState(false);
  const hide = () => setShow(false);

  return (
    <>
      <Button ref={ref} onBlur={hide} onFocus={() => setShow(true)}>
        Target
      </Button>
      {show && <Popover {...props} target={ref} onClose={hide} />}
    </>
  );
};
ShowHideWithState.storyName = 'show/hide with State';
ShowHideWithState.parameters = {
  docs: {
    source: {
      code: `
function MyComponent() {
  const ref = useRef<HTMLButtonElement>(null);
  const [show, setShow] = useState(false);
  const hide = () => setShow(false);

  return (
    <>
      <Button ref={ref} onBlur={hide} onFocus={() => setShow(true)}>
        Target
      </Button>
      {show && <Popover target={ref} onClose={hide} />}
    </>
  );
};
      `,
    },
  },
};

export const ShowHideWithCSS: Story<PopoverProps> = (props) => (
  <div style={{ position: 'relative' }}>
    <Button>Target</Button>
    <Popover {...props} className={styles['story-popover-on-hover']} />
  </div>
);
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
  <Button>Target</Button>
  <Popover>Popover content</Popover>
</div>
      `,
    },
  },
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
