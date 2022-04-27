import { DatePicker, DatePickerProps } from '@onfido/castor-react';
import React from 'react';
import { Meta, Story } from '../../../../../docs';

export default {
  title: 'React/DatePicker',
  component: DatePicker,
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
} as Meta<DatePickerProps>;

export const AsIndeterminate: Story<DatePickerProps> = {
  render: () => <DatePicker />,
};
