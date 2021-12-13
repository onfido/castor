import { Source } from '@storybook/components';
import React from 'react';

export const Helpers = () => (
  <>
    <p>
      Use a supported token for including font (family/size/weight) alongside
      line height and text transform properties.
    </p>
    <h4>Sass</h4>
    <Source
      language="css"
      code={`
        @use '@onfido/castor';

        .text {
          @include castor.font('600-regular');
          display: flex;
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
        import { font } from '@onfido/castor';

        const Text = styled.p({
          ...font('600-regular'),
          display: 'flex',
        });
      `}
      format
      dark
    />
  </>
);
