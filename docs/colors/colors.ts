import { Color } from '@onfido/castor';
import day from './day.scss';
import night from './night.scss';

export const colors = Object.keys({ ...day, ...night })
  .map((name) => name.match(/^--ods-color-(.+)/)?.[1])
  .filter(Boolean) as Color[];

export const tokens = {
  day: tokensFor(day),
  night: tokensFor(night),
};

function tokensFor(theme: typeof day) {
  return Object.fromEntries(
    Object.entries(theme).map(([key, value]) => [
      key.replace('--ods-', ''),
      readable(value),
    ])
  );
}

function readable(value: string) {
  // theme colors
  if (value.startsWith('var(--ods-color'))
    return value.replace(
      /var\(--ods-color-(.+)\), ([\d.]+)/,
      (_, variable: string, opacity: string) =>
        variable + (+opacity < 1 ? ` / ${+opacity * 100}%` : '')
    );

  // palette colors
  if (/\d{1,3}, \d{1,3}, \d{1,3}/.test(value))
    return `rgb(${value.replaceAll(',', '')})`;

  return value;
}
