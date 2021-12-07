import icons from '@onfido/castor-icons/svg/icons.svg';
import * as styles from './app.module.scss';

const button = 'ods-button -action';

export const App = () => `
  <div class="${styles.grid}">
    <button class="${button}--primary">Primary</button>
    <button class="${button}--secondary">Secondary</button>
    <button class="${button}--tertiary">Tertiary</button>
    <button class="${button}--primary" style="background: crimson;">
      Crimson
    </button>
    <button class="${button}--primary ${styles.raised}">Raised</button>
    <button class="${button}--primary ${styles.round}">Round</button>
    <button class="${button}--primary">
      <svg fill="currentColor" focusable="false" height="24" width="24">
        <use href="${icons}#passport"></use>
      </svg>
      Icon sprite
    </button>
    <button class="${button}--primary">
      <i class="${styles.icon} ${styles.passport}"></i>
      Individual icon
    </button>
  </div>
`;
