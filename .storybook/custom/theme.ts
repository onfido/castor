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
