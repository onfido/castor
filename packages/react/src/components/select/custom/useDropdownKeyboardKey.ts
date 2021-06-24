import { Dispatch, RefObject, SetStateAction } from 'react';
import { useKeyboardKey } from '../../../hooks';
import { IndexedOption, Option } from './useCustomSelect';

export const useDropdownKeyboardKey = (
  dropdownRef: RefObject<HTMLDivElement>,
  {
    value,
    options,
    focusOption,
    setValue,
    setFocusOption,
    setOpen,
  }: {
    value: Option['value'];
    options: IndexedOption[];
    focusOption: IndexedOption | null;
    setValue: Dispatch<SetStateAction<Option['value']>>;
    setFocusOption: Dispatch<SetStateAction<IndexedOption | null>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }
): void =>
  useKeyboardKey(dropdownRef, (key, haltEvent) => {
    const closeDropdown = (): void => {
      haltEvent();
      setOpen(false);
    };

    const hoverOption = (direction: 'forward' | 'back'): void => {
      haltEvent();

      if (!options.length) return;

      const highlighted = options.find((option) =>
        focusOption
          ? // first look if something's already focused
            option.id === focusOption.id
          : // then fallback to what is currently selected
            option.value === value
      );
      const index = highlighted
        ? options.indexOf(highlighted)
        : // or default to 1st option
          0;

      const found =
        direction === 'forward' ? options[index + 1] : options[index - 1];
      const starting =
        direction === 'forward' ? options[0] : options[options.length - 1];

      setFocusOption(found || starting);
    };

    const selectOption = (): void => {
      closeDropdown(); // always close, even when value is not changing
      if (focusOption) setValue(focusOption.value);
    };

    switch (key) {
      case 'Escape':
        closeDropdown();
        break;
      case 'ArrowDown':
        hoverOption('forward');
        break;
      case 'ArrowUp':
        hoverOption('back');
        break;
      case ' ':
      case 'Enter':
        selectOption();
        break;
    }
  });
