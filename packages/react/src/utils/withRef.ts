/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, forwardRef } from 'react';

/**
 * Same as `forwardRef` except it returns the type of `component`.
 *
 * @param component Component to `forwardRef`.
 */
export const withRef = <C extends FC<any>>(component: C): C =>
  forwardRef(component as any) as any;
