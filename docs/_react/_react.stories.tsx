// eslint-disable-next-line storybook/story-exports
import { Primary, Stories } from '@storybook/addon-docs';
import React from 'react';

export default {
  title: 'React',
  parameters: {
    docs: {
      page: () => (
        <>
          <Primary />
          <Stories />
        </>
      ),
    },
  },
};

export { Intro } from './intro.story';
