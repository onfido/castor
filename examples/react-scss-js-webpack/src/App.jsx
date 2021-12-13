import { IconPassport, Icons } from '@onfido/castor-icons';
import { Button, Icon } from '@onfido/castor-react';
import React from 'react';
import styles from './App.scss';

export const App = () => (
  <>
    <Icons />
    <div className={styles.grid}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button style={{ background: 'crimson' }}>Crimson</Button>
      <Button className={styles.raised}>Raised</Button>
      <Button className={styles.round}>Round</Button>
      <Button>
        <Icon name="passport" />
        Icon sprite
      </Button>
      <Button>
        <IconPassport fill="currentColor" />
        Individual (React) icon
      </Button>
      <Button>
        <i className={`${styles.icon} ${styles.passport}`} />
        Individual (CSS) icon
      </Button>
    </div>
  </>
);
