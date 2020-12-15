import { switchTheme } from '@onfido/castor';
import { StoryContext } from '@storybook/addons';
import { useEffect } from 'react';
import './themes.scss';

export function withThemer(
  storyFn: () => JSX.Element,
  context: StoryContext
): JSX.Element {
  const themeName: typeof themeNames[number] = context.globals.theme;

  useEffect(() => {
    switchTheme(themeName);
  }, [themeName]);

  return storyFn();
}

export const themeNames = ['day', 'night'] as const;
