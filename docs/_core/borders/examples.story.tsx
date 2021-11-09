import { BorderRadius, borderRadius } from '@onfido/castor';
import React from 'react';
import styles from './borders.scss';

export const Examples = () => (
  <div className={styles.container}>
    <Header>Size</Header>
    <Header>Example</Header>
    {borderRadiusKeys.map((size) => (
      <Row key={size} size={size} />
    ))}
  </div>
);

const Header = ({ children }: { children: string }) => (
  <div className={styles.header}>{children}</div>
);

const Row = ({ size }: { size: BorderRadius }) => (
  <>
    <div>{size}</div>
    <div className={styles.box} style={{ borderRadius: borderRadius(size) }}>
      {borderRadii[size]}
    </div>
  </>
);

const borderRadii = {
  small: '2px',
  medium: '4px',
  large: '8px',
  full: '100vw',
} as const;

const borderRadiusKeys = Object.keys(borderRadii) as BorderRadius[];
