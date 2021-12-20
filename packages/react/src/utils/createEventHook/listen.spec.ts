import { describe, expect, it, jest } from '@jest/globals';
import { listen } from './listen';

describe('listen', () => {
  it('should listen to specified events', () => {
    const type = 'cut';
    const addEventListener = jest.fn();
    const textNode = document.createTextNode('foo');
    const target = Object.assign(textNode, { addEventListener });
    const options = {};
    const handler = expect.any(Function);

    listen(type, target, () => {}, options);

    expect(addEventListener).toBeCalledWith(type, handler, options);
  });

  it('should stop listening to events on cleanup', () => {
    const types = ['blur', 'cut'] as const;
    const removeEventListener = jest.fn();
    const target = { addEventListener: () => void 0, removeEventListener };

    const cleanup = listen(types, { current: target } as any, () => {});
    cleanup();

    expect(removeEventListener).toBeCalledTimes(types.length);
  });

  it('should correctly fire events from targets', () => {
    const event = { target: {} };
    const addEventListener = (_: any, fn: any) => fn(event);
    const contains = (el: any) => el === event.target;
    const target = { addEventListener, contains };
    const onEvent = jest.fn();

    listen('cut', { current: target } as any, onEvent);

    expect(onEvent).toBeCalledWith(event);
  });

  it('should ignore nullish onEvent', () => {
    const addEventListener = jest.fn();

    listen('cut', { current: { addEventListener } } as any, undefined);

    expect(addEventListener).not.toBeCalled();
  });

  it('should ignore empty types', () => {
    const addEventListener = jest.fn();

    listen([], { current: { addEventListener } } as any, () => {});

    expect(addEventListener).not.toBeCalled();
  });

  it('should ignore nullish targets', () => {
    const cleanup = listen('cut', [null, undefined] as any, () => {});
    cleanup();

    expect(cleanup.name).toBe('noop');
  });
});
