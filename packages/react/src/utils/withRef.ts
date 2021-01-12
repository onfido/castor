import { FC, forwardRef } from 'react';

/**
 * Same as `forwardRef` except it returns the type of `component`.
 *
 * @param component Component to `forwardRef`.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const withRef = <C extends FC<any>>(component: C): C & Named =>
  forwardRef(component as any) as any;
/* eslint-enable @typescript-eslint/no-explicit-any */

interface Named {
  displayName?: string;
}
