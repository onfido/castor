import { FC, forwardRef, ForwardRefRenderFunction } from 'react';

/**
 * Same as `forwardRef` except it returns the type of `component`.
 *
 * @param component Component to `forwardRef`.
 */
export const withRef = <Props>(component: FC<Props>) =>
  forwardRef(component as ForwardRefRenderFunction<Props>) as typeof component;
