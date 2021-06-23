import { c, classy, m, SelectProps as BaseProps } from '@onfido/castor';
import React, {
  ChangeEvent,
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useKeyboardKey } from '../../../hooks';
import { mergeRefs, withRef } from '../../../utils';
import { NativeSelect } from '../native/native-select';
import { CustomSelectPortal } from './custom-select-portal';
import { CustomSelectProvider, IndexedOption, Option } from './useCustomSelect';

let idCount = 0;

export const CustomSelect = withRef(
  (
    {
      id = `castor_custom_select_${++idCount}`,
      defaultValue,
      value: controlledValue,
      children,
      className,
      onChange,
      onMouseDown,
      ...restProps
    }: CustomSelectProps,
    ref: CustomSelectProps['ref']
  ): JSX.Element => {
    const backupSelectRef = useRef<HTMLSelectElement | null>(null);
    const selectRef = (ref as RefObject<HTMLSelectElement>) ?? backupSelectRef;
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState<Option['value']>(
      controlledValue?.toString() || defaultValue?.toString() || ''
    );
    const [options, setOptions] = useState<IndexedOption[]>([]);
    const [focusOption, setFocusOption] = useState<IndexedOption | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
      if (controlledValue != null) setValue(controlledValue.toString());
    }, [controlledValue]);

    useEffect(() => {
      if (open) setOpen(false);

      if (value) return;

      const [firstOption] = options;
      if (firstOption) setValue(firstOption.value);
    }, [value, options]);

    useKeyboardKey(dropdownRef, (key, stopEvent) => {
      const close = (): void => {
        stopEvent();
        if (open) setOpen(false);
      };

      const hover = (direction: 'forward' | 'back'): void => {
        stopEvent();

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

      const select = (): void => {
        close(); // always close, even when value is not changing
        if (focusOption) setValue(focusOption.value);
      };

      switch (key) {
        case 'Escape':
          close();
          break;
        case 'ArrowDown':
          hover('forward');
          break;
        case 'ArrowUp':
          hover('back');
          break;
        case ' ':
        case 'Enter':
          select();
          break;
      }
    });

    useEffect(() => {
      if (open) {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      } else setFocusOption(null); // start fresh upon next open
    }, [open]);

    const handleClickOutside = useCallback(
      (event) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target) &&
          !event.defaultPrevented
        )
          setOpen(false);
      },
      [selectRef]
    );

    const addOption = (id: IndexedOption['id'], option: Option): void => {
      setOptions((state) => [...state, { ...option, id }]);
    };

    const changeOption = (id: IndexedOption['id'], option: Option): void => {
      setOptions((state) =>
        state.map((item) => (item.id === id ? { ...option, id } : item))
      );
    };

    const removeOption = (id: IndexedOption['id']): void => {
      setOptions((state) => state.filter((item) => item.id !== id));
    };

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setValue(event.currentTarget.value);
      onChange?.(event);
    };

    const handleMouseDown = (event: MouseEvent<HTMLSelectElement>) => {
      onMouseDown?.(event);
      setTimeout(() => {
        const buttons = dropdownRef.current?.querySelectorAll('button');

        if (buttons)
          Array.from(buttons).some((button) => {
            // can't focus on disabled <button>, so skip to next one
            if (!button.disabled) {
              button.focus();
              return true; // break out, only 1 focus is enough
            }
          });
      });

      if (event.button !== 0) return; // not "left" button pressed

      event.preventDefault(); // prevent <select> from opening
      setOpen(!open);
    };

    return (
      <CustomSelectPortal id="castor_custom_select_dropdown">
        {{
          // eslint-disable-next-line react/display-name
          select: (ref) => (
            <NativeSelect
              {...restProps}
              ref={mergeRefs(selectRef, ref)}
              id={id}
              value={value}
              className={classy(c('select-custom'), m({ open }), className)}
              onChange={handleChange}
              onMouseDown={handleMouseDown}
            >
              {options.map(({ id, value, title }) => (
                <option key={id} value={value}>
                  {title}
                </option>
              ))}
            </NativeSelect>
          ),
          dropdown: (
            <div
              ref={dropdownRef}
              className={classy(c('select-custom-dropdown'), m({ open }))}
            >
              <CustomSelectProvider
                value={{
                  value,
                  options,
                  focusOption,
                  setValue,
                  addOption,
                  setFocusOption,
                  changeOption,
                  removeOption,
                }}
              >
                {children}
              </CustomSelectProvider>
            </div>
          ),
        }}
      </CustomSelectPortal>
    );
  }
);
CustomSelect.displayName = 'Select';

export type CustomSelectProps = BaseProps & JSX.IntrinsicElements['select'];
