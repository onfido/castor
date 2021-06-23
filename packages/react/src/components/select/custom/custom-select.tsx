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
import { CustomSelectProvider, Option } from './useCustomSelect';

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
    const [value, setValue] = useState<string>(
      controlledValue?.toString() || defaultValue?.toString() || ''
    );
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<(Option & { id: number })[]>([]);

    useEffect(() => {
      if (controlledValue != null) setValue(controlledValue.toString());
    }, [controlledValue]);

    useEffect(() => {
      const [firstOption] = options;

      if (!value && firstOption) setValue(firstOption.value);

      if (open) setOpen(false);
    }, [value, options]);

    useEffect(() => {
      if (open) {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }
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

    const addOption = (id: number, option: Option): void => {
      setOptions((state) => [...state, { ...option, id }]);
    };

    const changeOption = (id: number, option: Option): void => {
      setOptions((state) =>
        state.map((item) => (item.id === id ? { ...option, id } : item))
      );
    };

    const removeOption = (id: number): void => {
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
                  setValue,
                  addOption,
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
