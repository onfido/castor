import { Primary, Stories, Title } from '@storybook/addon-docs/blocks';
import React from 'react';
import { Examples } from './examples.story';
import { Helpers } from './helpers.story';
import { Intro } from './intro.story';

const docsPage = () => (
  <>
    <Title />
    <Primary />
    <Stories title="Guidelines" />
  </>
);

export default {
  title: 'Castor/Typography',
  parameters: {
    docs: { page: docsPage },
  },
};

export { Intro, Examples, Helpers };
