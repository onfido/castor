import { useEffect } from 'react';
import { StoryContext } from '@storybook/addons';
import { switchTheme } from '@onfido/castor';
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
