import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Mock } from 'jest-mock';
import { listen } from './listen';
import { listenOutside } from './listenOutside';

jest.mock('./listen', () => ({
  listen: jest.fn(),
}));

describe('listenOutside', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly fire events outside targets', () => {
    const event = { target: {} };
    const onEvent = jest.fn();
    const contains = (el: any) => el !== event.target;
    (listen as Mock<any>).mockImplementationOnce((_, __, fn: any) => fn(event));

    listenOutside('cut', { current: { contains } } as any, onEvent);

    expect(onEvent).toBeCalledWith(event);
  });

  it('should ignore nullish onEvent', () => {
    listenOutside('cut', {} as any, undefined);

    expect(listen).not.toBeCalled();
  });

  it('should ignore nullish targets', () => {
    listenOutside('cut', [null, undefined, { current: null }] as any, () => {});

    expect(listen).not.toBeCalled();
  });
});
