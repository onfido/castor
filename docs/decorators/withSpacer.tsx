import { space } from '@onfido/castor';
import React from 'react';

export const withSpacer = (storyFn: () => JSX.Element): JSX.Element => (
  <div style={{ margin: space(4) }}>{storyFn()}</div>
);
