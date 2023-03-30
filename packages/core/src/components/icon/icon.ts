import { IconName } from '@onfido/castor-icons';
import { Color } from '@onfido/castor-tokens';

export type IconProps = (Hidden | Labeled) & {
  name: IconName;
  color?: Color;
};

type Hidden = { 'aria-hidden': 'true'; 'aria-label'?: never };
type Labeled = { 'aria-hidden'?: 'false'; 'aria-label': string };
