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

    const hoverOption = (direction: Direction): void => {
      haltEvent();

      if (!options.length) return;

      const highlightedOption = options.find((option) =>
        focusOption
          ? // first look if something's already focused
            option.id === focusOption.id
          : // then fallback to what is currently selected
            option.value === value
      );

      if (
        !highlightedOption?.disabled &&
        options.filter((option) => !option.disabled).length === 1
      )
        return; // nothing else can be hovered

      const currentIndex = highlightedOption
        ? options.indexOf(highlightedOption)
        : // or default to 1st option
          0;

      setFocusOption(
        findOption(options, direction, currentIndex) ||
          getStartingOption(options, direction)
      );
    };

    const selectOption = (): void => {
      closeDropdown(); // always close, even when value is not changing
      if (focusOption && !focusOption.disabled) setValue(focusOption.value);
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

type Direction = 'forward' | 'back';

function findOption(
  options: IndexedOption[],
  direction: Direction,
  currentIndex: number
): IndexedOption {
  const nextIndex =
    direction === 'forward' ? currentIndex + 1 : currentIndex - 1;
  const foundOption = options[nextIndex];

  if (!foundOption?.disabled) return foundOption;

  return findOption(options, direction, nextIndex);
}

function getStartingOption(
  options: IndexedOption[],
  direction: Direction,
  indexOffset = 0
): IndexedOption {
  const nextIndex =
    direction === 'forward' ? indexOffset : options.length + indexOffset - 1;
  const startingOption = options[nextIndex];

  if (!startingOption.disabled) return startingOption;

  return getStartingOption(
    options,
    direction,
    direction === 'forward' ? indexOffset + 1 : indexOffset - 1
  );
}
