import React from 'react';
import { Icons } from '@onfido/castor-icons';

export function withIcons(storyFn: () => JSX.Element): JSX.Element {
  const story = storyFn();

  return (
    <>
      <Icons />
      {story}
    </>
  );
}
