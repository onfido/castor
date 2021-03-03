import { Story } from '../story';
import { getEntries } from './getEntries';
import { Entries } from './types';

/**
 * Generates a story matrix for all properties specified for a component.
 *
 * @param component Component to apply property matrix.
 * @param props Properties to generate matrix from.
 * @param render Render function. Default `component(props)`.
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
  props: Entries<Props>,
  render: (p: Props) => string = (p) => component(p)
): Story<Props> {
  const entries = getEntries(props);

  return (storyProps) =>
    entries
      .map((matrixProps) => render({ ...storyProps, ...matrixProps }))
      .join('\n');
}
