import { Dispatch, RefObject, SetStateAction } from 'react';
import { useKeyboardKey } from '../../../hooks';

export const useSelectKeyboardKey = (
  selectRef: RefObject<HTMLSelectElement>,
  {
    focusOnOptions,
    setOpen,
  }: { focusOnOptions: () => void; setOpen: Dispatch<SetStateAction<boolean>> }
): void =>
  useKeyboardKey(selectRef, (key, haltEvent) => {
    const openDropdown = (): void => {
      haltEvent();
      focusOnOptions();
      setOpen(true);
    };

    switch (key) {
      case ' ':
        openDropdown();
        break;
    }
  });
