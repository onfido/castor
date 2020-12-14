import { Source } from '@storybook/components';
import React from 'react';

export const Intro = () => (
  <>
    <p>
      Colors are used to create contrast and highlight key elements or actions
      on the screen.
    </p>
    <p>
      You can use tokens from the color palette or color aliases. The latter
      refers to a predefined color alongside an alpha channel that is reflected
      based on the theme used.
    </p>
    <p>
      We recommend accessing tokens via the helpers provided. However, you may
      use them directly, e.g. on CSS:
    </p>
    <Source
      language="css"
      code={`
        .text {
          color: var(--color-content-main);
        }
      `}
      format
      dark
    />
  </>
);
