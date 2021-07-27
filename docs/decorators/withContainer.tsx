import { classy } from '@onfido/castor';
import React, { CSSProperties } from 'react';
import styles from './container.scss';

export const withContainer = (
  storyFn: () => JSX.Element,
  { parameters: { columns, display, style } }: ContainerContext
): JSX.Element => (
  <div
    className={classy(styles['container'], styles[display || ''])}
    style={{ ...style, gridTemplateColumns: columns }}
  >
    {storyFn()}
  </div>
);

export interface ContainerContext {
  parameters: ContainerParams;
}

export interface ContainerParams {
  /**
   * If `display` === 'grid', determines CSS grid-template-columns.
   * Default `repeat(4, 1fr)`.
   */
  columns?: string;
  /** Determines how to display the container element. */
  display?: 'block' | 'flex' | 'grid';
  /** Apply arbitrary styles to the container element. */
  style?: CSSProperties;
}
