import { Calendar, CalendarProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, Story } from '../../../../../docs';

export default {
  title: 'React/Calendar',
  component: Calendar,
  argTypes: {
    children: { description: 'Acts as a label for the `<input>`.' },
    bordered: { table: { type: { summary: 'boolean' } } },
    disabled: { table: { type: { summary: 'boolean' } } },
    invalid: { table: { type: { summary: 'boolean' } } },
  },
  args: {
    children: '',
    bordered: false,
    disabled: false,
    invalid: false,
  },
  parameters: { display: 'flex' },
} as Meta<CalendarProps>;

export const Playground: Story<CalendarProps> = {
  render: () => (
    <Calendar
      onDateSelect={() => {
        console.log('selected');
      }}
    />
  ),
};

export const NoPastSelection: Story<CalendarProps> = {
  render: () => (
    <Calendar
      onDateSelect={() => {
        console.log('selected');
      }}
      canSelectPast={false}
    />
  ),
};

export const NoFutureSelection: Story<CalendarProps> = {
  render: () => (
    <Calendar
      onDateSelect={() => {
        console.log('selected');
      }}
      canSelectFuture={false}
    />
  ),
};
