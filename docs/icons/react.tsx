import { Icons } from '@onfido/castor-icons';
import React from 'react';

export function withIcons(storyFn: () => JSX.Element): JSX.Element {
  const story = storyFn();

  return (
    <>
      <Icons />
      {story}
    </>
  );
}
