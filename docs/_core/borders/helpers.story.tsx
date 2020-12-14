import { Source } from '@storybook/components';
import React from 'react';

export const Helpers = () => (
  <>
    <p>Use one of allowed sizes when setting border radius of an element.</p>
    <h4>Sass</h4>
    <Source
      language="scss"
      code={`
        @use '~@onfido/castor';

        .box {
          border-radius: castor.border-radius('medium');
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
        import { borderRadius } from '@onfido/castor';

        const Box = styled.div({
          borderRadius: borderRadius('medium'),
        });
      `}
      format
      dark
    />
  </>
);
