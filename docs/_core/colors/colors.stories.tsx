import React from 'react';
import { Title, Primary, Stories } from '@storybook/addon-docs/blocks';

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

export { Intro } from './intro.story';
export { Helpers } from './helpers.story';
