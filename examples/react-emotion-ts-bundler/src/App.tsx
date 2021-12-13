import styled from '@emotion/styled';
import { borderRadius, color, space } from '@onfido/castor';
import { IconPassport, Icons } from '@onfido/castor-icons';
import { Button, Icon } from '@onfido/castor-react';

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
        <Icon name="passport" aria-hidden="true" />
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
  box-shadow: 0 ${space(0.25)} ${space(0.5)} ${color('neutral-900', 0.3)};
`;

// styled()
const RoundButton = styled(Button)({
  borderRadius: borderRadius('full'),
});
