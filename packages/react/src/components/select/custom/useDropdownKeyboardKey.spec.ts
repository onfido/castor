import { describe, expect, it } from '@jest/globals';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { IndexedOption, Option } from './useCustomSelect';
import { useDropdownKeyboardKey } from './useDropdownKeyboardKey';

let callbackFunc: (
  key: React.KeyboardEvent<Element>['key'],
  haltEvent: () => void
) => void;

jest.mock('../../../hooks', () => ({
  useKeyboardKey: jest
    .fn()
    .mockImplementation((_, callback: any) => (callbackFunc = callback)),
}));

describe('useDropdownKeyboardKey', () => {
  const dropdownRef: MutableRefObject<any> = { current: {} };
  const haltEvent = jest.fn();
  const value = '';
  const option1: IndexedOption = {
    id: 1,
    value: '',
    title: 'Select an option...',
  };
  const option2: IndexedOption = {
    id: 2,
    value: 'test-value-1',
    title: 'Test Title 1',
  };
  const option3: IndexedOption = {
    id: 3,
    value: 'test-value-2',
    title: 'Test Title 2',
  };
  const options: IndexedOption[] = [option1, option2, option3];
  const focusOption = null;
  const setValue: SetValueFunc = jest.fn();
  const setFocusOption: SetFocusOptionFunc = jest.fn();
  const setOpen: SetOpenFunc = jest.fn();

  it('should do nothing when button pressed is not expected', () => {
    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('Backspace', haltEvent);

    expect(haltEvent).toHaveBeenCalledTimes(0);
    expect(setValue).toHaveBeenCalledTimes(0);
    expect(setFocusOption).toHaveBeenCalledTimes(0);
    expect(setOpen).toHaveBeenCalledTimes(0);
  });

  it('should close dropdown when "escape" button is pressed', () => {
    const haltEvent = jest.fn();
    const setOpen: SetOpenFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('Escape', haltEvent);

    expect(haltEvent).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledTimes(0);
    expect(setFocusOption).toHaveBeenCalledTimes(0);
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it('should not try to hover option when "arrow down" button is pressed if no options available', () => {
    const haltEvent = jest.fn();
    const options: IndexedOption[] = [];

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('ArrowDown', haltEvent);

    expect(haltEvent).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledTimes(0);
    expect(setFocusOption).toHaveBeenCalledTimes(0);
    expect(setOpen).toHaveBeenCalledTimes(0);
  });

  it('should hover on next option from currently selected when "arrow down" button is pressed', () => {
    const haltEvent = jest.fn();
    const value = option2.value;
    const setFocusOption: SetFocusOptionFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('ArrowDown', haltEvent);

    expect(setFocusOption).toHaveBeenCalledTimes(1);
    expect(setFocusOption).toHaveBeenCalledWith(option3);
  });

  it('should hover on next option from currently highlighted when "arrow down" button is pressed', () => {
    const haltEvent = jest.fn();
    const focusOption = option2;
    const setFocusOption: SetFocusOptionFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('ArrowDown', haltEvent);

    expect(setFocusOption).toHaveBeenCalledTimes(1);
    expect(setFocusOption).toHaveBeenCalledWith(option3);
  });

  it('should hover on first option when "arrow down" button is pressed and no next option available', () => {
    const haltEvent = jest.fn();
    const value = option3.value;
    const setFocusOption: SetFocusOptionFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('ArrowDown', haltEvent);

    expect(setFocusOption).toHaveBeenCalledTimes(1);
    expect(setFocusOption).toHaveBeenCalledWith(option1);
  });

  it('should start from first index when "arrow down" button is pressed and cannot determine what is highlighted', () => {
    const haltEvent = jest.fn();
    const options: IndexedOption[] = [option2, option3];
    const setFocusOption: SetFocusOptionFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('ArrowDown', haltEvent);

    expect(setFocusOption).toHaveBeenCalledTimes(1);
    expect(setFocusOption).toHaveBeenCalledWith(option3);
  });

  it('should not try to hover option when "arrow up" button is pressed if no options available', () => {
    const haltEvent = jest.fn();
    const options: IndexedOption[] = [];

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('ArrowUp', haltEvent);

    expect(haltEvent).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledTimes(0);
    expect(setFocusOption).toHaveBeenCalledTimes(0);
    expect(setOpen).toHaveBeenCalledTimes(0);
  });

  it('should hover on previous option from currently selected when "arrow up" button is pressed', () => {
    const haltEvent = jest.fn();
    const value = option3.value;
    const setFocusOption: SetFocusOptionFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('ArrowUp', haltEvent);

    expect(setFocusOption).toHaveBeenCalledTimes(1);
    expect(setFocusOption).toHaveBeenCalledWith(option2);
  });

  it('should hover on previous option from currently highlighted when "arrow up" button is pressed', () => {
    const haltEvent = jest.fn();
    const focusOption = option3;
    const setFocusOption: SetFocusOptionFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('ArrowUp', haltEvent);

    expect(setFocusOption).toHaveBeenCalledTimes(1);
    expect(setFocusOption).toHaveBeenCalledWith(option2);
  });

  it('should hover on last option when "arrow up" button is pressed and no previous option available', () => {
    const haltEvent = jest.fn();
    const value = option1.value;
    const setFocusOption: SetFocusOptionFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('ArrowUp', haltEvent);

    expect(setFocusOption).toHaveBeenCalledTimes(1);
    expect(setFocusOption).toHaveBeenCalledWith(option3);
  });

  it('should start from first index when "arrow up" button is pressed and cannot determine what is highlighted', () => {
    const haltEvent = jest.fn();
    const options: IndexedOption[] = [option2, option3];
    const setFocusOption: SetFocusOptionFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('ArrowUp', haltEvent);

    expect(setFocusOption).toHaveBeenCalledTimes(1);
    expect(setFocusOption).toHaveBeenCalledWith(option3);
  });

  it('should not select option when "enter" button is pressed but no option is focused', () => {
    const haltEvent = jest.fn();
    const setOpen: SetOpenFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('Enter', haltEvent);

    expect(haltEvent).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledTimes(0);
    expect(setFocusOption).toHaveBeenCalledTimes(0);
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it('should select option when "enter" button is pressed and option is focused', () => {
    const haltEvent = jest.fn();
    const focusOption = option2;
    const setValue: SetValueFunc = jest.fn();
    const setOpen: SetOpenFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc('Enter', haltEvent);

    expect(haltEvent).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledWith(focusOption.value);
    expect(setFocusOption).toHaveBeenCalledTimes(0);
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it('should select option when "spacebar" button is pressed and option is focused', () => {
    const haltEvent = jest.fn();
    const focusOption = option2;
    const setValue: SetValueFunc = jest.fn();
    const setOpen: SetOpenFunc = jest.fn();

    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });
    callbackFunc(' ', haltEvent);

    expect(haltEvent).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledWith(focusOption.value);
    expect(setFocusOption).toHaveBeenCalledTimes(0);
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(false);
  });
});

type SetValueFunc = Dispatch<SetStateAction<Option['value']>>;
type SetFocusOptionFunc = Dispatch<SetStateAction<IndexedOption | null>>;
type SetOpenFunc = Dispatch<SetStateAction<boolean>>;
