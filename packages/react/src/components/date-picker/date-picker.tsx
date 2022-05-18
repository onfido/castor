import { c, classy, color, DatePickerProps as BaseProps } from '@onfido/castor';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { Popover } from '../popover/popover';
import CalendarIcon from './CalendarIcon';
import Input from './date-picker-input';

const getShiftArray = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const shiftArray = [];
  let shift = firstDay + 6;

  if (firstDay !== 0) {
    shift = firstDay - 1;
  }

  for (let index = 0; index < shift; index++) {
    shiftArray.push(null);
  }

  return shiftArray;
};

const getDaysToDisplay = (
  year: number,
  month: number,
  numberOfDays: number
) => {
  const days = [...Array(numberOfDays + 1).keys()];
  days.shift();
  return [...getShiftArray(year, month), ...days];
};

export const DatePicker: React.FC<DatePickerProps> = ({
  canSelectFuture = true,
  canSelectPast = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [displayedMonth, setDisplayedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [displayedYear, setDisplayedYear] = useState<number>(
    new Date().getFullYear()
  );

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const [numberOfDisplayedDays, setNumberOfDisplayedDays] = useState<number>(0);

  const dateInput = useRef<HTMLInputElement>(null);
  const monthInput = useRef<HTMLInputElement>(null);
  const yearInput = useRef<HTMLInputElement>(null);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const focus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.target.select();
    open();
  };

  const previous = () => {
    if (Number(displayedMonth) > 0) {
      setDisplayedMonth(displayedMonth - 1);
    } else {
      setDisplayedMonth(11);
      setDisplayedYear(displayedYear - 1);
    }
  };

  const next = () => {
    if (Number(displayedMonth) < 11) {
      setDisplayedMonth(displayedMonth + 1);
    } else {
      setDisplayedMonth(0);
      setDisplayedYear(displayedYear + 1);
    }
  };

  const onYearChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    if (event.key !== ' ' && Number.isInteger(Number(event.key))) {
      if (value.length === 0) {
        setDisplayedYear(Number(event.key));
        setSelectedYear(event.key.padStart(4, '0'));
      } else {
        if (value.length === 4 && value[0] === '0') {
          setDisplayedYear(Number(value.substring(1) + event.key));
          setSelectedYear(value.substring(1) + event.key);
        } else {
          setDisplayedYear(Number(event.key));
          setSelectedYear(event.key.padStart(4, '0'));
        }
      }
    }

    if (event.key === 'Backspace') {
      setDisplayedYear(new Date().getFullYear());
      setSelectedYear('');
    }
  };

  const onDisplayedYearChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const value = (event.target as HTMLInputElement).value;
    if (event.key !== ' ' && Number.isInteger(Number(event.key))) {
      if (value.length === 0) {
        setDisplayedYear(Number(event.key));
      } else {
        if (value.length === 4 && value[0] === '0') {
          setDisplayedYear(Number(value.substring(1) + event.key));
        } else {
          setDisplayedYear(Number(event.key));
        }
      }
    }

    if (event.key === 'Backspace') {
      setDisplayedYear(new Date().getFullYear());
    }
  };

  const selectDate = (date: number) => {
    setSelectedDate(String(date).padStart(2, '0'));
    setSelectedMonth(String(Number(displayedMonth) + 1).padStart(2, '0'));
    setSelectedYear(String(displayedYear).padStart(4, '0'));
  };

  const isDateDisabled = (date: number) => {
    const testedDate = new Date(displayedYear, displayedMonth, date);
    const today = new Date();

    return (
      (!canSelectFuture ? testedDate > today : false) ||
      (!canSelectPast ? testedDate < today : false)
    );
  };

  const getDayClassName = (date: number) => {
    let className = '';
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    if (
      currentYear === displayedYear &&
      currentMonth === displayedMonth &&
      currentDate === date
    ) {
      className += classy(c('date-picker-today'));
    }

    if (
      displayedMonth === Number(selectedMonth) - 1 &&
      displayedYear === Number(selectedYear) &&
      date === Number(selectedDate)
    ) {
      className = `${className} ${classy(c('date-picker-selected'))}`;
    }

    return className;
  };

  useEffect(() => {
    setNumberOfDisplayedDays(
      new Date(displayedYear, displayedMonth + 1, 0).getDate()
    );
  }, [displayedMonth]);

  return (
    <div className={classy(c('date-picker-container'))}>
      {isOpen && (
        <div onClick={close} className={classy(c('date-picker-overlay'))} />
      )}
      <div className={classy(c('date-picker'))}>
        <div className={classy(c('date-picker-inputs'))}>
          <Input
            type="date"
            onFocus={focus}
            value={selectedDate}
            ref={dateInput}
            setSelected={setSelectedDate}
            nextRef={monthInput}
          />
          /
          <Input
            type="month"
            onFocus={focus}
            value={selectedMonth}
            ref={monthInput}
            setDisplayed={setDisplayedMonth}
            setSelected={setSelectedMonth}
            nextRef={yearInput}
          />
          /
          <input
            type="text"
            placeholder="yyyy"
            onFocus={focus}
            className={classy(c('date-picker-inputs-year'))}
            maxLength={4}
            minLength={4}
            onKeyDown={onYearChange}
            value={selectedYear}
            ref={yearInput}
          />
        </div>
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
          <div className={classy(c('date-picker-selector'))}>
            <header>
              <nav className={classy(c('date-picker-nav'))}>
                <Button
                  kind="action"
                  variant="tertiary"
                  onClick={previous}
                  title="Previous month"
                >
                  <Icon aria-hidden="true" name="chevron-left" />
                </Button>
                <h3>
                  {new Date(
                    displayedYear,
                    displayedMonth,
                    1
                  ).toLocaleDateString(undefined, {
                    month: 'long',
                  })}
                  <div className={classy(c('date-picker-year'))}>
                    <input
                      className={classy(c('date-picker-year-input'))}
                      type="text"
                      pattern="\d*"
                      maxLength={4}
                      value={String(displayedYear).padStart(4, '0')}
                      onKeyDown={onDisplayedYearChange}
                      onFocus={(event) => {
                        event.target.select();
                      }}
                    />
                    <div />
                  </div>
                </h3>
                <Button
                  kind="action"
                  variant="tertiary"
                  onClick={next}
                  title="Next month"
                >
                  <Icon aria-hidden="true" name="chevron-right" />
                </Button>
              </nav>
            </header>
            <ul className={classy(c('date-picker-days'))}>
              <li>M</li>
              <li>T</li>
              <li>W</li>
              <li>Th</li>
              <li>F</li>
              <li>S</li>
              <li>S</li>
            </ul>
            <ul className={classy(c('date-picker-dates'))}>
              {getDaysToDisplay(
                displayedYear,
                displayedMonth,
                numberOfDisplayedDays
              ).map((date, index) => (
                <li key={index} className={classy(c('date-picker-date'))}>
                  {date !== null && (
                    <Button
                      kind="action"
                      variant="tertiary"
                      className={getDayClassName(date)}
                      onClick={() => selectDate(date)}
                      disabled={isDateDisabled(date)}
                    >
                      {date}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Popover>
      )}
    </div>
  );
};

export type DatePickerProps = BaseProps &
  Omit<JSX.IntrinsicElements['input'], 'type'>;
