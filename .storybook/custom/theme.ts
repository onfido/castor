import { switchTheme } from '@onfido/castor';
import { addons } from '@storybook/addons';
import { GLOBALS_UPDATED } from '@storybook/core-events';
import { create } from '@storybook/theming';

export const sbCastorTheme = create({
  base: 'light',
  // found under .storybook/public
  brandImage: 'brand.svg',
  brandTitle: 'Castor',
  // TODO: enable after website is available
  // brandUrl: 'https://castor.onfido.design',
});

export const themes = ['day', 'night'];

export const preferredTheme = themes[0];

export function initTheme() {
  // set the default theme class on first load
  switchTheme(preferredTheme);

  // when globals update
  addons
    .getChannel()
    .on(GLOBALS_UPDATED, ({ globals: { theme } }) => switchTheme(theme));
}
