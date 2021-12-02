// eslint-disable-next-line storybook/story-exports
import { Primary, Stories, Title } from '@storybook/addon-docs';
import React from 'react';
import { CreatingTheme } from './creating-theme.story';
import { Intro } from './intro.story';

export default {
  title: 'Castor/Theming',
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

export { Intro, CreatingTheme };
