import { ForwardedRef, forwardRef, ReactElement } from 'react';

/**
 * Same as `forwardRef` except it returns the type of `component`.
 *
 * @param component Component to `forwardRef`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withRef = <C extends Forwarded<any, any>>(component: C): C =>
  forwardRef(component) as never;

type Forwarded<P, R> = (props: P, ref: ForwardedRef<R>) => ReactElement | null;
