import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { Mock } from 'jest-mock';
import { useEffect } from 'react';
import { useOnClickOutside } from './useOnClickOutside';

jest.mock('react', () => ({
  useEffect: jest.fn((fn: () => unknown) => fn()),
  useRef: (current: unknown) => ({ current }),
}));

describe('useOnClickOutside', () => {
  const addEventListener = jest.fn();
  const removeEventListener = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    Object.defineProperties(document, {
      addEventListener: { value: addEventListener },
      removeEventListener: { value: removeEventListener },
    });
  });

  it('should add event listener to document', () => {
    useOnClickOutside(() => {}, [{ current: {} as Element }]);

    expect(addEventListener).toBeCalledTimes(1);
  });

  it('should remove event listener from document on effect cleanup', () => {
    let cleanup = (): unknown => void 0;
    (useEffect as Mock<any>).mockImplementationOnce(
      (fn: () => () => unknown) => (cleanup = fn())
    );

    useOnClickOutside(() => {}, [{ current: {} as Element }]);
    cleanup();

    expect(removeEventListener).toBeCalledTimes(1);
  });

  it('should call onClickOutside on outside click', () => {
    const onClickOutside = jest.fn();
    const target = { current: { contains: () => false } as any };
    const event = { target };
    addEventListener.mockImplementationOnce((_, fn: (_: unknown) => void) =>
      fn(event)
    );

    useOnClickOutside(onClickOutside, [target, {} as any]);

    expect(onClickOutside).toBeCalledWith(event);
  });

  it('should not call onClickOutside on inside click', () => {
    const onClickOutside = jest.fn();
    const target = { current: { contains: () => true } as any };
    const event = { target };
    addEventListener.mockImplementationOnce((_, fn: (_: unknown) => void) =>
      fn(event)
    );

    useOnClickOutside(onClickOutside, [target, {} as any]);

    expect(onClickOutside).not.toBeCalled();
  });

  it('should do nothing if onClickOutside is undefined', () => {
    useOnClickOutside(undefined, []);

    expect(addEventListener).not.toBeCalled();
  });
});
