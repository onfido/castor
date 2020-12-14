import { Primary, Stories, Title } from '@storybook/addon-docs/blocks';
import React from 'react';
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
  title: 'Castor/Colors',
  parameters: {
    docs: { page: docsPage },
  },
};

export { Intro, Helpers };
