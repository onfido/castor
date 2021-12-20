import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Mock } from 'jest-mock';
import { createEventHook } from './createEventHook';
import { listen } from './listen';
import { listenOutside } from './listenOutside';

jest.mock('react', () => ({
  useEffect: jest.fn((fn: any) => fn()?.()),
}));
jest.mock('./listen', () => ({
  listen: jest.fn(),
}));
jest.mock('./listenOutside', () => ({
  listenOutside: jest.fn(),
}));

describe('createEventHook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a hook that listens to specified types', () => {
    const target = {} as any;
    const type = [] as any;
    const onEvent = () => {};
    const options = {};

    createEventHook(type, options)(onEvent, target);

    expect(listen).toBeCalledWith(type, target, onEvent, options);
  });

  it('should allow listening outside of targets', () => {
    const target = {} as any;
    const type = [] as any;
    const onEvent = () => {};

    createEventHook(type, { outside: true })(onEvent, target);

    expect(listenOutside).toBeCalledWith(type, target, onEvent, {});
  });

  it('should only run once on render and cleanup "listen" on unmount', () => {
    const cleanup = jest.fn();
    (listen as Mock<any>).mockImplementationOnce(() => cleanup);

    createEventHook([])(() => {}, {} as any);

    expect(cleanup).toBeCalledTimes(1);
  });
});
