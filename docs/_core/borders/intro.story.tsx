import { Source } from '@storybook/components';
import React from 'react';

export const Intro = () => (
  <>
    <p>Borders are used to soften the edges of various elements.</p>
    <p>
      We recommend accessing border radius tokens via the helpers provided.
      However, you may use them directly, e.g. on CSS:
    </p>
    <Source
      language="css"
      code={`
        .box {
          border-radius: var(--ods-border-radius-medium);
        }
      `}
      format
      dark
    />
  </>
);
