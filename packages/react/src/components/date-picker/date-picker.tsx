import { c, classy, color, DatePickerProps as BaseProps } from '@onfido/castor';
import React, { useEffect, useState } from 'react';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { Input } from '../input/input';
import { Popover } from '../popover/popover';
import CalendarIcon from './CalendarIcon';

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

const padDateItem: (dateItem: number) => string = (dateItem: number) =>
  String(dateItem).padStart(2, '0');

const dateToString: (date: Date) => string = (date: Date) =>
  `${date.getFullYear()}-${padDateItem(date.getMonth() + 1)}-${padDateItem(
    date.getDate()
  )}`;

export const DatePicker: React.FC<DatePickerProps> = ({
  canSelectFuture = true,
  canSelectPast = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string>();
  const [displayedYear, setDisplayedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [displayedMonth, setDisplayedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [numberOfDisplayedDays, setNumberOfDisplayedDays] = useState<number>(0);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const setDate = (date?: string) => {
    if (date) {
      setValue(date);
    } else {
      setValue(dateToString(new Date()));
    }
    toggle();
  };

  const previous = () => {
    if (displayedMonth > 0) {
      setDisplayedMonth(displayedMonth - 1);
    } else {
      setDisplayedMonth(11);
      setDisplayedYear(displayedYear - 1);
    }
  };

  const next = () => {
    if (displayedMonth < 11) {
      setDisplayedMonth(displayedMonth + 1);
    } else {
      setDisplayedMonth(0);
      setDisplayedYear(displayedYear + 1);
    }
  };

  const change = (valueStr: string) => {
    const [yearStr, monthStr] = valueStr.split('-');
    setDisplayedYear(Number(yearStr));
    setDisplayedMonth(Number(monthStr) - 1);
    setValue(valueStr);
  };

  const selectDate = (date: number) => {
    setDate(
      `${String(displayedYear)}-${padDateItem(
        displayedMonth + 1
      )}-${padDateItem(date)}`
    );
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

    if (value) {
      const selectedDate = new Date(value);

      if (
        displayedMonth === selectedDate.getMonth() &&
        displayedYear === selectedDate.getFullYear() &&
        selectedDate.getDate() === date
      ) {
        className = `${className} ${classy(c('date-picker-selected'))}`;
      }
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
        <div
          onClick={() => close()}
          className={classy(c('date-picker-overlay'))}
        />
      )}
      <div className={classy(c('date-picker'))}>
        <Input
          className={classy(c('date-picker-input'))}
          type="date"
          value={value}
          onChange={(event) => change(event.currentTarget.value)}
          onFocus={() => open()}
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
                      value={displayedYear}
                      onChange={(event) =>
                        setDisplayedYear(Number(event.target.value))
                      }
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
