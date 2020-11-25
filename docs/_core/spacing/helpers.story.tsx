import React from 'react';
import { Source } from '@storybook/components';

export const Helpers = () => (
  <>
    <p>
      Use an integer or one of allowed fractionals for setting element padding
      and marging, width and height, gaps, etc.
    </p>
    <h4>Sass</h4>
    <Source
      language="scss"
      code={`
        @use '~@onfido/castor';

        .container {
          display: grid;
          gap: castor.space(4);
        }
      `}
      format
      dark
    />
    <h4>JavaScript</h4>
    <Source
      language="js"
      code={`
        import styled from '@emotion/styled';
        import { space } from '@onfido/castor';

        const Container = styled.div({
          display: 'grid',
          gap: space(4),
        });
      `}
      format
      dark
    />
  </>
);
