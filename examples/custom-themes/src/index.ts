import { switchTheme } from '@onfido/castor';
import './index.scss';

// lazy load themes
const importThemes = {
  a: import('./themes/a.scss'),
  b: import('./themes/b.scss'),
};

// state
let theme: 'a' | 'b';

// init
toggleTheme();

// on click
document.querySelector('button')?.addEventListener('click', toggleTheme);

async function toggleTheme() {
  theme = theme === 'a' ? 'b' : 'a';
  switchTheme(theme);
  await importThemes[theme];
}
