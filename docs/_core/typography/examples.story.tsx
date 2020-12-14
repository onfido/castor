import { font, FontName } from '@onfido/castor';
import React from 'react';
import styles from './typography.scss';

export const Examples = () => (
  <div className={styles.container}>
    <Header>Name</Header>
    <Header>Example</Header>
    {fonts.map((name) => (
      <Row key={name} name={name} />
    ))}
  </div>
);

const fonts: FontName[] = [
  '800-bold',
  '700-bold',
  '600-bold',
  '500-bold',
  '400-bold',
  '300-bold',
  '200-bold',
  '100-bold',
  '800-regular',
  '700-regular',
  '600-regular',
  '500-regular',
  '400-regular',
  '300-regular',
  '200-regular',
  '100-regular',
  '800-light',
  '700-light',
  '600-light',
  '500-light',
  '400-allcaps',
  '300-allcaps',
  '200-allcaps',
  '100-allcaps',
  '400-mono',
  '300-mono',
  '200-mono',
];

const Header = ({ children }: { children: string }) => (
  <div className={styles.header}>{children}</div>
);

const Row = ({ name }: { name: FontName }) => (
  <>
    <div>{name}</div>
    <p className={styles.text} style={font(name)}>
      The quick brown fox jumps over the lazy dog
    </p>
  </>
);
