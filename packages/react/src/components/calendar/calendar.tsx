import { c, CalendarProps as BaseProps, classy } from '@onfido/castor';
import React, { useEffect, useState } from 'react';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { Input } from '../input/input';

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

export const Calendar: React.FC<CalendarProps> = ({
  canSelectFuture = true,
  canSelectPast = true,
  onDateSelect,
  selectedDate: selectedDateProps = null,
}) => {
  const [displayedMonth, setDisplayedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [displayedYear, setDisplayedYear] = useState<number>(
    new Date().getFullYear()
  );

  const [selectedDate, setSelectedDate] = useState<string>(
    selectedDateProps ? selectedDateProps.split('/')[0] : ''
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    selectedDateProps ? selectedDateProps.split('/')[1] : ''
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    selectedDateProps ? selectedDateProps.split('/')[2] : ''
  );

  const [numberOfDisplayedDays, setNumberOfDisplayedDays] = useState<number>(0);

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
      className += '-date--today';
    }

    if (
      displayedMonth === Number(selectedMonth) - 1 &&
      displayedYear === Number(selectedYear) &&
      date === Number(selectedDate)
    ) {
      className = `${className} ${'-date--selected'}`;
    }

    return className;
  };

  useEffect(() => {
    setNumberOfDisplayedDays(
      new Date(displayedYear, displayedMonth + 1, 0).getDate()
    );
  }, [displayedMonth]);

  useEffect(() => {
    if (selectedDate && selectedMonth && selectedYear) {
      onDateSelect(`${selectedDate}/${selectedMonth}/${selectedYear}`);
    }
  }, [selectedDate, selectedMonth, selectedYear]);

  useEffect(() => {
    setSelectedDate(selectedDateProps ? selectedDateProps.split('/')[0] : '');
    setSelectedMonth(selectedDateProps ? selectedDateProps.split('/')[1] : '');
    setSelectedYear(selectedDateProps ? selectedDateProps.split('/')[2] : '');
    if (selectedDateProps) {
      setDisplayedMonth(
        Number(
          selectedDateProps ? Number(selectedDateProps.split('/')[1]) - 1 : ''
        )
      );
      setDisplayedYear(
        Number(selectedDateProps ? Number(selectedDateProps.split('/')[2]) : '')
      );
    }
  }, [selectedDateProps]);

  return (
    <div className={classy(c('calendar'))}>
      <nav className={classy(c('calendar-nav'))}>
        <Button
          kind="action"
          variant="tertiary"
          onClick={previous}
          title="Previous month"
          className={classy(c('calendar-nav-item'))}
        >
          <Icon aria-hidden="true" name="chevron-left" />
        </Button>
        <div className={classy(c('calendar-month'))}>
          {new Date(displayedYear, displayedMonth, 1).toLocaleDateString(
            undefined,
            {
              month: 'long',
            }
          )}
          <Input
            className={classy(c('calendar-year'))}
            type="text"
            pattern="\d*"
            maxLength={4}
            value={String(displayedYear).padStart(4, '0')}
            onKeyDown={onDisplayedYearChange}
            onFocus={(event) => {
              event.target.select();
            }}
          />
        </div>
        <Button
          kind="action"
          variant="tertiary"
          onClick={next}
          title="Next month"
          className={classy(c('calendar-nav-item'))}
        >
          <Icon aria-hidden="true" name="chevron-right" />
        </Button>
      </nav>

      <ul className={classy(c('calendar-days'))}>
        <li>M</li>
        <li>T</li>
        <li>W</li>
        <li>Th</li>
        <li>F</li>
        <li>S</li>
        <li>Su</li>
      </ul>
      <ul className={classy(c('calendar-dates'))}>
        {getDaysToDisplay(
          displayedYear,
          displayedMonth,
          numberOfDisplayedDays
        ).map((date, index) => (
          <li key={index}>
            {date !== null && (
              <Button
                kind="action"
                variant="tertiary"
                className={classy('-date', getDayClassName(date))}
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
  );
};

export type CalendarProps = BaseProps &
  Omit<JSX.IntrinsicElements['div'], 'type'>;
