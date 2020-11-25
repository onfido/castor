import React from 'react';
import { Source } from '@storybook/components';

export const Helpers = () => (
  <>
    <h4>Color Aliases</h4>
    <p>
      Use a supported alias token for setting color of content, background,
      border, etc.
    </p>
    <h5>Sass</h5>
    <Source
      language="scss"
      code={`
        @use '~@onfido/castor';

        .text {
          color: castor.color('content-main');
        }
      `}
      format
      dark
    />
    <h5>JavaScript</h5>
    <Source
      language="js"
      code={`
        import styled from '@emotion/styled';
        import { color } from '@onfido/castor';

        const Text = styled.p({
          color: color('content-main'),
        });
      `}
      format
      dark
    />
    <h4>Color Palette</h4>
    <p>
      You may also use colors directly from palette, providing an optional alpha
      channel. However, theming support is then limited.
    </p>
    <h5>Sass</h5>
    <Source
      language="scss"
      code={`
        .box {
          background-color: castor.color('primary-500', 0.5);
        }
      `}
      format
      dark
    />
    <h5>JavaScript</h5>
    <Source
      language="js"
      code={`
        const Box = styled.div({
          backgroundColor: color('primary-500', 0.5),
        });
      `}
      format
      dark
    />
  </>
);
