import styled from '@emotion/styled';
import { borderRadius, color, space } from '@onfido/castor';
import { Button, Icon } from '@onfido/castor-react';
import { Icons, IconPassport } from '@onfido/castor-icons';
import React from 'react';

export const App = () => (
  <>
    <Icons />
    <Grid>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button style={{ background: 'crimson' }}>Crimson</Button>
      <RaisedButton>Raised</RaisedButton>
      <RoundButton>Round</RoundButton>
      <Button>
        <Icon name="passport" />
        Icon sprite
      </Button>
      <Button>
        <IconPassport fill="currentColor" />
        Individual icon
      </Button>
    </Grid>
  </>
);

const Grid = styled.div`
  display: grid;
  gap: ${space(5)};
  grid: auto-flow / 1fr 1fr 1fr;
  margin: 0;
  place-items: center;
`;

// styled``
const RaisedButton = styled(Button)`
  box-shadow: 0 2px 4px ${color('neutral-900', 0.3)};
`;

// styled()
const RoundButton = styled(Button)({
  borderRadius: borderRadius('full'),
});
