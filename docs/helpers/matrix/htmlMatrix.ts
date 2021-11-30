import type { FC } from 'react';
import { omit } from '../docs';
import { Story } from '../story';
import { getEntries } from './getEntries';
import { Entries } from './types';

/**
 * Generates a story matrix for all properties specified for a component.
 *
 * @param component Component to apply property matrix.
 * @param props Properties to generate matrix from.
 * @param component Render function. Default `component(props)`.
 *
 * @example
 * const Button = (props) => html('button', props);
 * const Story = matrix(Button, {
 *   id: ['a', 'b'],
 *   disabled: [true, false],
 * });
 * // (storyProps) => [
 * //   Button({ ...storyProps, id: 'a', disabled: true })
 * //   Button({ ...storyProps, id: 'a', disabled: false })
 * //   Button({ ...storyProps, id: 'b', disabled: true })
 * //   Button({ ...storyProps, id: 'b', disabled: false })
 * // ]
 * //  .join('\n');
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function htmlMatrix<Props extends Record<string, any>>(
  component: (props: Props) => string,
  props: Entries<Props>
): Story<Props> {
  const entries = getEntries(props);

  return {
    argTypes: omit(...Object.keys(props)),
    render: (storyProps, ctx) => {
      // we can trust the component in the context is not undefined because
      // Storybook throws if it is not defined in Meta
      const Component = ctx.component as FC;
      const Render = component || Component;
      (Render as unknown as FC).displayName ??=
        Component.displayName || Component.name;

      return entries
        .map((matrixProps) => Render({ ...storyProps, ...matrixProps }))
        .join('\n');
    },
  };
}
