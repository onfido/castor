import { Primary, Stories, Title } from '@storybook/addon-docs';
import React from 'react';
import { CreatingTheme } from './creating-theme.story';
import { Intro } from './intro.story';

const docsPage = () => (
  <>
    <Title />
    <Primary />
    <Stories title="Guidelines" />
  </>
);

export default {
  title: 'Castor/Theming',
  parameters: {
    docs: { page: docsPage },
  },
};

export { Intro, CreatingTheme };
