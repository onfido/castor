import { describe, expect, it } from '@jest/globals';
import { MutableRefObject } from 'react';
import { useKeyboardKey } from './useKeyboardKey';

let eventHandlerFunc: (event: any) => void;
let cleanupFunc: () => void;

jest.mock('react', () => ({
  useCallback: jest.fn().mockImplementation((f: any) => f),
  useEffect: jest.fn().mockImplementation((f: any) => (cleanupFunc = f())),
}));

describe('useKeyboardKey', () => {
  const ref: MutableRefObject<any> = {
    current: {
      addEventListener: jest
        .fn()
        .mockImplementation(
          (eventName: string, handler: (event: any) => void) => {
            if (eventName === 'keydown') eventHandlerFunc = handler;
          }
        ),
      removeEventListener: jest.fn(),
    },
  };

  it('should not initiate when ref element not set', () => {
    const callback = () => null;

    useKeyboardKey({ current: null }, callback);

    expect(cleanupFunc).toBe(undefined);
  });

  it('should add and remove event listener', () => {
    useKeyboardKey(ref, () => null);

    expect(ref.current.addEventListener).toHaveBeenCalledTimes(1);
    expect(ref.current.removeEventListener).toHaveBeenCalledTimes(0);

    cleanupFunc();

    expect(ref.current.addEventListener).toHaveBeenCalledTimes(1);
    expect(ref.current.removeEventListener).toHaveBeenCalledTimes(1);
  });

  it('should not execute callback when no keyboard event fired', () => {
    const callback = jest.fn();
    const event = new MouseEvent('click');

    useKeyboardKey(ref, callback);
    eventHandlerFunc(event);

    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('should execute callback when keyboard event fired', () => {
    const callback = jest.fn();
    const event = new KeyboardEvent('keydown', { key: 'Enter' });

    useKeyboardKey(ref, callback);
    eventHandlerFunc(event);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('Enter', expect.any(Function));
  });

  it('should allow to halt event', () => {
    const preventDefaultFunc = jest.fn();
    const stopPropagationFunc = jest.fn();
    const callback = jest
      .fn()
      .mockImplementation((_, haltEvent: () => void) => haltEvent());
    const event = new KeyboardEvent('keydown');
    Object.defineProperty(event, 'preventDefault', {
      get: () => preventDefaultFunc,
    });
    Object.defineProperty(event, 'stopPropagation', {
      get: () => stopPropagationFunc,
    });

    useKeyboardKey(ref, callback);
    eventHandlerFunc(event);

    expect(preventDefaultFunc).toHaveBeenCalledTimes(1);
    expect(stopPropagationFunc).toHaveBeenCalledTimes(1);
  });
});
