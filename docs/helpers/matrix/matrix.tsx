import React, { FC, ReactNode } from 'react';
import { omit } from '../docs';
import { Story } from '../story';
import { getEntries } from './getEntries';
import { Entries } from './types';

/**
 * Generates a story matrix for all properties specified for a component.
 *
 * @param component Component to apply property matrix.
 * @param props Properties to generate matrix from.
 *
 * @example
 * const Button = (props) => html('button', props);
 * const Story = htmlMatrix(Button, {
 *   class: ['a', 'b'],
 *   disabled: [true, false],
 * });
 * // <button class="a" disabled />
 * // <button class="a" />
 * // <button class="b" disabled />
 * // <button class="b" />
 */
export const htmlMatrix = matrix((render, props) => render(props));

/**
 * Generates a story matrix for all properties specified for a component.
 *
 * @param component Component to apply property matrix.
 * @param props Properties to generate matrix from.
 *
 * @example
 * const Button = (props) => <button {...props} />;
 * const Story = reactMatrix(Button, {
 *   className: ['a', 'b'],
 *   disabled: [true, false],
 * });
 * // <Button className="a" disabled />
 * // <Button className="a" />
 * // <Button className="b" disabled />
 * // <Button className="b" />
 */
export const reactMatrix = matrix((Render, props) => (
  <Render key={random()} {...props} />
));

function matrix(render: <P>(component: FC<P>, props: P) => ReactNode) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Props extends Record<string, any>>(
    component: (props: Props, ref: never) => ReactNode,
    props: Entries<Props>
  ): Story<Props> => {
    const entries = getEntries(props);

    return {
      argTypes: omit(...Object.keys(props)),
      render: (storyProps, ctx) => {
        // we can trust the component in the context is not undefined because
        // Storybook throws if it is not defined in Meta
        const Component = ctx.component as FC;
        const Render = (component as FC) || Component;
        Render.displayName ??= Component.displayName || Component.name;

        return entries.map((matrixProps) =>
          render(Render, { ...storyProps, ...matrixProps })
        );
      },
    };
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
