import { switchTheme } from '@onfido/castor';
import { StoryContext } from '@storybook/addons';
import { useEffect } from 'react';
import './themes.scss';

export function withTheme(
  storyFn: () => JSX.Element,
  context: StoryContext
): JSX.Element {
  const themeName = context.globals.theme as 'day' | 'night';

  useEffect(() => {
    switchTheme(themeName);
  }, [themeName]);

  return storyFn();
}
