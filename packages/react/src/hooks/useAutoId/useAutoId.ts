import { useMemo } from 'react';

/**
 * Generates auto identificator, that can be used for connecting form components
 * to their labels.
 *
 * @param prefix Unique prefix.
 *
 * @example
 * useAutoId('castor_input);
 * // 'castor_input_12'
 */
export const useAutoId = (prefix: string) =>
  useMemo(() => `${prefix}_${++idCount}`, [prefix]);

let idCount = 0;
