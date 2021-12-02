import { Color, color } from '@onfido/castor';
import { Button, Tooltip } from '@onfido/castor-react';
import React, { useRef, useState } from 'react';
import { colors, tokens } from '../..';
import styles from './colors.scss';

export const Examples = () => {
  const timeout = useRef<number>();
  const [fakeRef, setFakeRef] = useState<{ current: HTMLElement }>();

  const theme = currentTheme();

  return (
    <div className={styles.cards}>
      {orderedColors.map(([title, groups]) => (
        <>
          <h2 className={styles.title}>{title}</h2>
          {groups.map(([group, colors]) => (
            <ColorPreview
              key={group}
              colors={colors}
              tokens={tokens[theme]}
              onColor={(color, element) => {
                clearTimeout(timeout.current);
                timeout.current = setTimeout(setFakeRef, 3000);
                setFakeRef(undefined);
                setTimeout(() => setFakeRef({ current: element }));
                copyToClipboard(color);
              }}
            />
          ))}
        </>
      ))}

      <Tooltip target={fakeRef} show={!!fakeRef}>
        Copied to clipboard
      </Tooltip>
    </div>
  );
};

const currentTheme = () =>
  (document
    .querySelector('[class*="castor-theme"]')
    ?.className.replace(
      /.*\bcastor-theme--(\w+)\b.*/,
      '$1'
    ) as keyof typeof tokens) || 'day';

const groupColors = (filterRegex: RegExp) =>
  Object.entries(
    colors
      .filter((color) => filterRegex.test(color))
      .reduce((groups, color) => {
        const [group] = color.split('-');
        (groups[group] ??= []).push(color);
        return groups;
      }, {} as Record<string, Color[]>)
  );

const themeColors = groupColors(/^content-|^background-|^border-/);
const paletteColors = groupColors(/-\d{3}$|-black$|-white$/);

const orderedColors = [
  ['Theme', themeColors],
  ['Palette', paletteColors],
] as const;

interface ColorPreviewProps {
  colors: Color[];
  onColor: (color: Color, element: HTMLElement) => void;
  tokens: typeof tokens['day'];
}

const ColorPreview = ({ colors, onColor, tokens }: ColorPreviewProps) => (
  <div className={styles.preview}>
    {colors.map((color) => (
      <Button
        key={color}
        className={styles.color}
        variant="tertiary"
        onClick={(ev) => onColor(color, ev.currentTarget)}
      >
        <Circle color={color} />
        <div className={styles.name}>
          <span>{color}</span>
          <span className={styles.secondary}>{tokens['color-' + color]}</span>
        </div>
      </Button>
    ))}
  </div>
);

const Circle = ({ color: c }: { color: Color }) => (
  <span className={styles.circle} style={{ backgroundColor: color(c) }} />
);

function copyToClipboard(content: string) {
  navigator.clipboard.writeText(content);
}
