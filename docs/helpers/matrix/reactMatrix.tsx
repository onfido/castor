import React, { FC } from 'react';
import { omit } from '../docs';
import { Story } from '../story';
import { getEntries } from './getEntries';
import { Entries } from './types';

/**
 * Generates a story matrix for all properties specified for a component.
 *
 * @param Component Component to apply property matrix.
 * @param props Properties to generate matrix from.
 * @param component Render function (not a React component, hooks not supported).
 *
 * Default `(props) => <Component {...props} />`.
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
  component: FC<Props>,
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
      Render.displayName ??= Component.displayName || Component.name;

      return entries.map((matrixProps) => (
        <Render key={random()} {...storyProps} {...matrixProps} />
      ));
    },
  };
}

const random = () =>
  crypto.randomUUID?.() || crypto.getRandomValues(new Int32Array(1))[0];

// TODO: remove when updated in TypeScript DOM definitions
declare global {
  interface Crypto {
    randomUUID?: () => string;
  }
}
