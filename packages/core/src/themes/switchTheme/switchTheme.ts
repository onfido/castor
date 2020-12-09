/**
 * Switches a Castor theme.
 *
 * @param themeName Name of a theme, relying on a class name used with a
 * `castor-theme--` prefix.
 * @param selection Selection of an element (can also be HTML collection or a
 * list of elements) where theme should be switched, defaults to the body
 * element.
 *
 * @example
 * import '@onfido/castor/dist/themes/day-class.css';
 * switchTheme('day');
 *
 * import '@onfido/castor/dist/themes/night-class.css';
 * switchTheme('night', document.querySelector('.section'));
 */
export function switchTheme(
  themeName: string,
  selection: Selection = document.body
): void {
  if (!selection)
    throw new Error('Unable to switch theme: no selection available');

  if ('length' in selection)
    return Array.from(selection).forEach((element) =>
      switchTheme(themeName, element)
    );

  selection.className = selection.className.replace(classNameRegExp, '');
  selection.classList.add(prefix + themeName);
}

const prefix = 'castor-theme--';
const classNameRegExp = new RegExp(`${prefix}\\w+[-\\w]*`, 'g');

type Selection =
  | Element
  | Element[]
  | HTMLCollectionOf<Element>
  | NodeListOf<Element>
  | null;
