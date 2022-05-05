import React, { type FC } from 'react';

interface Props {
  color: string;
}

const CalendarIcon: FC<Props> = ({ color = '#2B2D33' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={color}>
    <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
    <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
  </svg>
);

export default CalendarIcon;
