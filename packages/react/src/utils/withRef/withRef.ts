import { ForwardedRef, forwardRef, ReactElement } from 'react';

/**
 * Same as `forwardRef` except it returns the type of `component`.
 *
 * @param component Component to `forwardRef`.
 */
export const withRef = <C extends Forwarded<T, P>, T, P>(component: C): C =>
  forwardRef(component) as never;

type Forwarded<T, P> = (props: P, ref: ForwardedRef<T>) => ReactElement | null;
