import { space } from '@onfido/castor';
import React from 'react';
import styles from './container.scss';

export const withContainer = (
  storyFn: () => JSX.Element,
  { parameters: { columns, display } }: ContainerContext
): JSX.Element => (
  <div
    className={styles[display || 'flex']}
    style={{
      gridTemplateColumns: columns,
      margin: space(4),
    }}
  >
    {storyFn()}
  </div>
);

export interface ContainerContext {
  parameters: ContainerParams;
}

interface ContainerParams {
  columns?: string;
  display?: 'block' | 'flex' | 'grid';
}
