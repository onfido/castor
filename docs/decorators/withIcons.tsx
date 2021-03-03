import { Icons } from '@onfido/castor-icons';
import React from 'react';

export const withIcons = (storyFn: () => JSX.Element): JSX.Element => (
  <>
    <Icons />
    {storyFn()}
  </>
);
