import React from 'react';
import { Story } from '../story';
import { getEntries } from './getEntries';
import { Entries } from './types';

/**
 * Generates a story matrix for all properties specified for a component.
 *
 * @param Component Component to apply property matrix.
 * @param props Properties to generate matrix from.
 * @param render Render function. Default `<Component {...props} />`.
 *
 * @example
 * const Button = (props) => <button {...props} />;
 * const Story = matrix(Button, {
 *   id: ['a', 'b'],
 *   disabled: [true, false],
 * });
 * // (storyProps) =>
 * //   <>
 * //     <Button {...storyProps} id="a" disabled />
 * //     <Button {...storyProps} id="a" }) />
 * //     <Button {...storyProps} id="b" disabled />
 * //     <Button {...storyProps} id="b" />
 * //   </>;
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reactMatrix<Props extends Record<string, any>>(
  Component: (props: Props) => JSX.Element | null,
  props: Entries<Props>,
  Render: (p: Props) => JSX.Element = (p) => <Component {...p} />
): Story<Props> {
  const entries = getEntries(props);

  return (storyProps) =>
    entries.map((matrixProps, i) => (
      <Render key={i} {...storyProps} {...matrixProps} />
    ));
}
