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
import { useObserver } from './useObserver';

jest.mock('react', () => ({
  useEffect: jest.fn((fn: any) => fn()),
  useRef: (current: any) => ({ current }),
}));

describe('useObserver', () => {
  const constructor = jest.fn();
  const observe = jest.fn();
  const unobserve = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    Object.defineProperty(globalThis, 'IntersectionObserver', {
      value: class IntersectionObserverMock {
        observe = observe;
        unobserve = unobserve;

        constructor(
          callback: IntersectionObserverCallback,
          options?: IntersectionObserverInit | undefined
        ) {
          constructor(callback, options);
        }
      },
    });
  });

  it('should observe targets specified with IntersectionObserver', () => {
    const target = { current: {} as Element };

    useObserver(() => {}, [target]);

    expect(observe).toBeCalledWith(target.current);
  });

  it('should unobserve targets on effect cleanup', () => {
    const target = { current: {} as Element };
    let cleanup = (): any => void 0;
    (useEffect as Mock<any>).mockImplementationOnce(
      (fn: any) => (cleanup = fn())
    );

    useObserver(() => {}, [target]);
    cleanup();

    expect(unobserve).toBeCalledWith(target.current);
  });

  it('should execute callback on the specified debounceTime', () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const target = { current: {} as Element };
    const debounceTime = 100;
    const entries = [{}];
    constructor.mockImplementationOnce((fn: any) => fn(entries));

    useObserver(onChange, [target], debounceTime);

    expect(onChange).not.toBeCalled();
    jest.advanceTimersByTime(debounceTime);
    expect(onChange).toBeCalledWith(entries[0]);
  });

  it('should do nothing if targets array is empty', () => {
    useObserver(() => {}, []);

    expect(constructor).not.toBeCalled();
  });
});
