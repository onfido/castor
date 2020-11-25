import React from 'react';
import styles from './spacing.scss';

export const Examples = () => (
  <>
    <div className={styles.container}>
      <Header>Multiplier</Header>
      <Header>Pixels</Header>
      <Header>Example</Header>
      {[0.125, 0.25, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8].map((multiplier) => (
        <Row key={multiplier} multiplier={multiplier} />
      ))}
    </div>
    <p>etc.</p>
  </>
);

const Header = ({ children }: { children: string }) => (
  <div className={styles.header}>{children}</div>
);

const Row = ({ multiplier }: { multiplier: number }) => (
  <>
    <span>{multiplier}</span>
    <span>{multiplier * 8}px</span>
    <div className={styles.box} style={{ width: multiplier * 8 }} />
  </>
);
