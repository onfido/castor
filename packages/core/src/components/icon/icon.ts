import { Color } from '@onfido/castor';
import { IconName } from '@onfido/castor-icons';

export type IconProps = (Hidden | Labeled) & {
  name: IconName;
  color?: Color;
};

type Hidden = { 'aria-hidden': 'true'; 'aria-label'?: never };
type Labeled = { 'aria-hidden'?: 'false'; 'aria-label': string };
