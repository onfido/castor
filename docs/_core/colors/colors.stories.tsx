// eslint-disable-next-line storybook/story-exports
import { Primary, Stories, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react/types-7-0';
import React from 'react';
import { Examples } from './examples.story';
import { Helpers } from './helpers.story';
import { Intro } from './intro.story';

export default {
  title: 'Castor/Colors',
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
} as Meta;

export { Intro, Examples, Helpers };
