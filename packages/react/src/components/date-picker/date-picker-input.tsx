/* eslint-disable react/display-name */
import React, { useState, type Dispatch, type SetStateAction } from 'react';

interface Props {
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  ref: React.RefObject<HTMLInputElement>;
  setDisplayed?: Dispatch<SetStateAction<number>>;
  setSelected: Dispatch<SetStateAction<string>>;
  nextRef: React.RefObject<HTMLInputElement>;
  type: 'date' | 'month';
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      onFocus: onFocusCallback,
      value: inputValue,
      setDisplayed,
      setSelected,
      nextRef,
      type,
    },
    ref
  ) => {
    const [isTyping, setIsTyping] = useState(false);

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsTyping(false);
      onFocusCallback(e);
    };

    const onDateChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value;
      if (event.key !== ' ' && Number.isInteger(Number(event.key))) {
        setIsTyping(true);
        if (value[0] === '0' && isTyping) {
          if (Number(value[1] + event.key) > 31) {
            setSelected('31');
            event.preventDefault();
            nextRef.current?.focus();
          } else {
            setSelected(value[1] + event.key);
            event.preventDefault();
            nextRef.current?.focus();
          }
        } else {
          setSelected(event.key.padStart(2, '0'));
          if (Number(event.key) > 3) {
            event.preventDefault();
            nextRef.current?.focus();
          }
        }
      }

      if (event.key === 'Backspace') {
        setSelected('');
      }
    };

    const onMonthChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value;
      if (event.key !== ' ' && Number.isInteger(Number(event.key))) {
        setIsTyping(true);
        if (value[0] === '0' && isTyping) {
          if (Number(value[1] + event.key) > 12) {
            if (setDisplayed) {
              setDisplayed(11);
            }
            setSelected('12');
            event.preventDefault();
            nextRef.current?.focus();
          } else {
            if (setDisplayed) {
              setDisplayed(Number(value[1] + event.key) - 1);
            }
            setSelected(value[1] + event.key);
            event.preventDefault();
            nextRef.current?.focus();
          }
        } else {
          if (setDisplayed) {
            setDisplayed(Number(event.key.padStart(2, '0')) - 1);
          }
          setSelected(event.key.padStart(2, '0'));
          if (Number(event.key) > 1) {
            event.preventDefault();
            nextRef.current?.focus();
          }
        }
      }

      if (event.key === 'Backspace') {
        if (setDisplayed) {
          setDisplayed(new Date().getMonth());
        }
        setSelected('');
      }
    };

    return (
      <input
        type="text"
        placeholder={type === 'date' ? 'dd' : 'mm'}
        maxLength={2}
        minLength={2}
        onFocus={onFocus}
        onKeyDown={(e) => {
          type === 'date' ? onDateChange(e) : onMonthChange(e);
        }}
        value={inputValue}
        ref={ref}
      />
    );
  }
);

export default Input;
