import { Color } from '@onfido/castor';
import tokens from './tokens.scss';

export const colors = Object.keys(tokens)
  .map((name) => name.match(/^--ods-color-([a-z0-9-]+)$/)?.[1])
  .filter(Boolean) as Color[];
