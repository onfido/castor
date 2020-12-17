import { FC, forwardRef, ForwardRefRenderFunction } from 'react';

/**
 * Same as `forwardRef` except it returns the same type of the `component` going in.
 * @param component Component to forwardRef.
 */
export const withRef = <Props>(component: FC<Props>) =>
  forwardRef(component as ForwardRefRenderFunction<Props>) as typeof component;
