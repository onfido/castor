import { useEffect } from 'react';

/**
 * Disables `scrollingElement`'s scroll when `condition` is true.
 * @param condition Whether or not to disable `scrollingElement` scroll.
 */
export function useNoScroll(condition?: boolean) {
  useEffect(() => {
    const { overflow } = getStyle();
    setOverflow(condition ? 'hidden' : overflow);
    return () => setOverflow(overflow);
  }, [condition]);
}

const getScrollingElement = () =>
  (document.scrollingElement as HTMLElement) || document.documentElement;

const getStyle = () => getScrollingElement().style || {};

const setOverflow = (value = '') => {
  getStyle().overflow = value;
};
