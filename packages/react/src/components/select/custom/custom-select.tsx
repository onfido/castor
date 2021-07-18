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
import { mergeRefs, withRef } from '../../../utils';
import { NativeSelect } from '../native/native-select';
import { CustomSelectPortal } from './custom-select-portal';
import { CustomSelectProvider, IndexedOption, Option } from './useCustomSelect';
import { useDropdownKeyboardKey } from './useDropdownKeyboardKey';
import { useSelectKeyboardKey } from './useSelectKeyboardKey';

const idPrefix = 'castor_custom_select';
let idCount = 0;

export const CustomSelect = withRef(
  (
    {
      id = `${idPrefix}_${++idCount}`,
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

    const focusOnOptions = useCallback(() => {
      setTimeout(() => {
        const buttons = dropdownRef.current?.querySelectorAll('button');
        if (buttons)
          Array.from(buttons).some((button) => {
            if (button.disabled) return; // can't focus on disabled <button>

            button.focus();
            return true; // break out, only 1 focus is enough
          });
      });
    }, [dropdownRef]);

    useSelectKeyboardKey(selectRef, { focusOnOptions, setOpen });
    useDropdownKeyboardKey(dropdownRef, {
      value,
      options,
      focusOption,
      setValue,
      setFocusOption,
      setOpen,
    });

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setValue(event.currentTarget.value);
      onChange?.(event);
    };

    const handleSelectMouseDown = (event: MouseEvent<HTMLSelectElement>) => {
      onMouseDown?.(event);

      if (event.button !== 0) return; // not "left" button pressed

      event.preventDefault(); // prevent <select> from opening
      setOpen((open) => {
        if (!open) setTimeout(focusOnOptions);
        return !open;
      });
    };

    const handleDropdownMouseLeave = () => {
      if (focusOption) setFocusOption(null);
    };

    return (
      <CustomSelectPortal id={`${idPrefix}_dropdown`}>
        {{
          // eslint-disable-next-line react/display-name
          select: (ref) => (
            <NativeSelect
              {...restProps}
              ref={mergeRefs(selectRef, ref)}
              id={id}
              value={value}
              className={classy(c('select-custom'), m({ open }), className)}
              onChange={handleSelectChange}
              onMouseDown={handleSelectMouseDown}
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
              onMouseLeave={handleDropdownMouseLeave}
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
