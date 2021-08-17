import { describe, expect, it, jest } from '@jest/globals';
import { Mock } from 'jest-mock';
import { useEffect } from 'react';
import { useObserver } from './useObserver';

jest.mock('react', () => ({
  useEffect: jest.fn((fn: any) => fn()),
  useRef: (current: any) => ({ current }),
}));

describe('useObserver', () => {
  it('should observe targets with observer', () => {
    const observe = jest.fn();
    const createObserver = () => ({ observe });
    const target = { current: {} as Element };

    useObserver(createObserver as any, [target]);

    expect(observe).toBeCalledWith(target.current);
  });

  it('should disconnect on effect cleanup', () => {
    const disconnect = jest.fn();
    const observe = () => {};
    const createObserver = () => ({ disconnect, observe });
    const target = { current: {} as Element };
    let cleanup = (): any => {};
    (useEffect as Mock<any>).mockImplementationOnce(
      (fn: any) => (cleanup = fn())
    );

    useObserver(createObserver as any, [target]);
    cleanup();

    expect(disconnect).toBeCalledTimes(1);
  });

  it('should do nothing if targets array is empty', () => {
    const constructor = jest.fn();
    const createObserver = () => constructor();

    useObserver(createObserver as any, []);

    expect(constructor).not.toBeCalled();
  });
});
