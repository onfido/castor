import { describe, expect, it } from '@jest/globals';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useSelectKeyboardKey } from './useSelectKeyboardKey';

let callbackFunc: (
  key: React.KeyboardEvent<Element>['key'],
  haltEvent: () => void
) => void;

jest.mock('../../../hooks', () => ({
  useKeyboardKey: jest
    .fn()
    .mockImplementation((_, callback: any) => (callbackFunc = callback)),
}));

describe('useSelectKeyboardKey', () => {
  const selectRef: MutableRefObject<any> = { current: {} };

  it('should not open dropdown when not "spacebar" button is pressed', () => {
    const haltEvent = jest.fn();
    const focusOnOptions = jest.fn();
    const setOpen: Dispatch<SetStateAction<boolean>> = jest.fn();

    useSelectKeyboardKey(selectRef, { focusOnOptions, setOpen });
    callbackFunc('Enter', haltEvent);

    expect(haltEvent).toHaveBeenCalledTimes(0);
    expect(focusOnOptions).toHaveBeenCalledTimes(0);
    expect(setOpen).toHaveBeenCalledTimes(0);
  });

  it('should open dropdown when "spacebar" button is pressed', () => {
    const haltEvent = jest.fn();
    const focusOnOptions = jest.fn();
    const setOpen: Dispatch<SetStateAction<boolean>> = jest.fn();

    useSelectKeyboardKey(selectRef, { focusOnOptions, setOpen });
    callbackFunc(' ', haltEvent);

    expect(haltEvent).toHaveBeenCalledTimes(1);
    expect(focusOnOptions).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(true);
  });
});
