import { c, classy, color, DatePickerProps as BaseProps } from '@onfido/castor';
import React, { useState } from 'react';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Popover } from '../popover/popover';
import { Calendar } from './calendar';
import CalendarIcon from './CalendarIcon';

export const DatePicker: React.FC<DatePickerProps> = ({
  canSelectFuture = true,
  canSelectPast = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const focus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.target.select();
    open();
  };

  const validateInput = () => {
    const regExp =
      /^(0?[1-9]|[12][0-9]|3[01])[^a-zA-Z0-9](0?[1-9]|1[012])[^a-zA-Z0-9*]\d{4}$/;
    if (regExp.test(inputValue)) {
      const date = inputValue.replace(/[^a-zA-Z0-9*]/g, '/');
      setSelectedDate(date);
      setInputValue(date);
    } else {
      setSelectedDate(null);
      setInputValue('');
    }
  };

  const onDateSelect = (date: string) => {
    if (date !== selectedDate) {
      setSelectedDate(date);
      setInputValue(date);
      console.log({ date });
    }
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      validateInput();
    }
  };

  return (
    <div className={classy(c('date-picker-container'))}>
      {isOpen && (
        <div onClick={close} className={classy(c('date-picker-overlay'))} />
      )}
      <div className={classy(c('date-picker'))}>
        <Input
          value={inputValue}
          onFocus={focus}
          onBlur={validateInput}
          onChange={onChange}
          placeholder="dd/mm/yyyy"
          onKeyPress={onKeyPress}
        />
        <Button
          kind="action"
          variant="tertiary"
          onClick={toggle}
          className={classy(c('date-picker-button'))}
        >
          <CalendarIcon color={color('content-main')} />
        </Button>
      </div>
      {isOpen && (
        <Popover position="bottom" align="start">
          <Calendar
            canSelectFuture={canSelectFuture}
            canSelectPast={canSelectPast}
            onDateSelect={onDateSelect}
            selectedDate={selectedDate}
          />
        </Popover>
      )}
    </div>
  );
};

export type DatePickerProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
