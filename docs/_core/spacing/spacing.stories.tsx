// eslint-disable-next-line storybook/story-exports
import { Primary, Stories, Title } from '@storybook/addon-docs';
import React from 'react';
import { Examples } from './examples.story';
import { Helpers } from './helpers.story';
import { Intro } from './intro.story';

export default {
  title: 'Castor/Spacing',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <Stories title="Guidelines" />
        </>
      ),
    },
  },
};

export { Intro, Examples, Helpers };
