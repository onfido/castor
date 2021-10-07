import { describe, expect, it, jest } from '@jest/globals';
import { Mock } from 'jest-mock';
import { useEffect } from 'react';
import { useNoScroll } from './useNoScroll';

jest.mock('react', () => ({ useEffect: jest.fn((cb: any) => cb()) }));

describe('useNoScroll', () => {
  const getDocumentElement = jest.fn(() => documentElement);
  const getScrollingElement = jest.fn(() => scrollingElement);
  const documentElement = { style: { overflow: '' } };
  const scrollingElement = { style: { overflow: '' } };

  beforeEach(() => {
    documentElement.style = { overflow: '' };
    scrollingElement.style = { overflow: '' };
  });

  beforeAll(() => {
    Object.defineProperties(document, {
      documentElement: { get: getDocumentElement },
      scrollingElement: { get: getScrollingElement },
    });
  });

  it('should disable scroll when condition is true', () => {
    useNoScroll(true);

    expect(scrollingElement.style.overflow).toBe('hidden');
  });

  it('should not disable scroll when condition is false', () => {
    scrollingElement.style.overflow = undefined as any;

    useNoScroll(false);

    expect(scrollingElement.style.overflow).toBe('');
  });

  it('should reset overflow on cleanup', () => {
    (useEffect as Mock<any>).mockImplementationOnce((cb: any) => cb()());
    scrollingElement.style.overflow = 'foo';

    useNoScroll(true);

    expect(scrollingElement.style.overflow).toBe('foo');
  });

  it('should use documentElement when scrollingElement is not available', () => {
    getScrollingElement
      .mockReturnValueOnce({} as any)
      .mockReturnValueOnce(undefined as any);

    useNoScroll(true);

    expect(documentElement.style.overflow).toBe('hidden');
  });
});
