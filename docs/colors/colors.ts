import { Color } from '@onfido/castor';
import tokens from './tokens.scss';

export const colors = Object.keys(tokens).reduce((accumulator, name) => {
  const [, color] = name.match(/^--ods-color-([a-z0-9-]+)$/) ?? [];
  return color ? [...accumulator, color] : accumulator;
}, []) as Color[];
