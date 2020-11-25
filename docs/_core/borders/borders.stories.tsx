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
  title: 'Castor/Borders',
  parameters: {
    docs: { page: docsPage },
  },
};

export { Intro } from './intro.story';
export { Examples } from './examples.story';
export { Helpers } from './helpers.story';
