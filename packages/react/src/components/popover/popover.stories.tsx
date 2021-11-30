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
    show: {
      description: 'Show or hide the Popover. This example uses HTML presence.',
      name: '[story only] show',
      table: { control: 'boolean' },
    },
    withPortal: {
      description: [
        'Toggle between an example with and without `target` ref.',
        'Specific to `react-dom`.',
      ].join('\n\n'),
      name: '[Story only] with portal',
    },
    align: {
      control: { type: 'inline-radio', options: align },
      description: 'Preferred value. Will readjust to avoid screen clipping.',
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: optionsToSummary(align) },
      },
    },
    children: { table: { type: { summary: 'ReactNode' } } },
    onClose: {},
    onRender: {},
    overlay: { control: { disable: true } },
    position: {
      control: { type: 'inline-radio', options: position },
      description: 'Preferred value. Will readjust to avoid screen clipping.',
      table: {
        defaultValue: { summary: 'top' },
        type: { summary: optionsToSummary(position) },
      },
    },
    target: {
      control: { disable: true },
      description: [
        'A React `ref` of the element to use for placement.',
        'If specified will use a React Portal to avoid overflow issues.',
      ].join('\n\n'),
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
export const Playground: Story<PlaygroundProps> = {
  args: {
    withPortal: true,
  },
  render: ({ show, withPortal, ...props }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const Container = withPortal ? Fragment : 'div';

    return (
      <Container {...(withPortal || { style: { position: 'relative' } })}>
        <Button ref={withPortal ? ref : undefined}>Target</Button>
        {show && <Popover {...props} target={withPortal ? ref : undefined} />}
      </Container>
    );
  },
};

export const ShowHideWithState: Story<PopoverProps> = {
  render: (props) => {
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
  },
  storyName: 'show/hide with State',
  parameters: {
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
  },
};

export const ShowHideWithCSS: Story<PopoverProps> = {
  render: (props) => (
    <div style={{ position: 'relative' }}>
      <Button>Target</Button>
      <Popover {...props} className={styles['story-popover-on-hover']} />
    </div>
  ),
  storyName: 'show/hide with CSS',
  parameters: {
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
  },
};

export const AllCombinations: Story<PopoverProps> = {
  ...reactMatrix(
    (props: PopoverProps) => {
      const ref = useRef<HTMLButtonElement>(null);

      return (
        <>
          <Button ref={ref}>Target</Button>
          <Popover {...props} target={ref}>
            {props.position} {props.align}
          </Popover>
        </>
      );
    },
    { position, align } // order is important
  ),
  parameters: {
    display: 'grid',
    columns: 'repeat(3, 1fr)',
    style: {
      gap: '3rem',
      placeItems: 'center',
    },
  },
};
