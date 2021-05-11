/**
 * Gets the values of a form element in object format, based on names.
 *
 * @param form Form element to extract values from.
 *
 * @example
 * <form ref={formRef}>
 *   <input name="foo" value="bar" />
 * </form>
 *
 * getFormValues(formRef.current);
 * // { foo: 'bar' }
 */
export function getFormValues<T extends Values>(form: HTMLFormElement): T {
  const elementsByName = groupBy(
    Array.from(form.elements) as NamedElement[],
    (el) => el.name || ''
  );

  return Object.fromEntries(
    Object.entries(elementsByName)
      .filter(([name]) => name)
      .map(([name, elements]) => [name, getValue(elements)])
  ) as T;
}

const groupBy = <T>(array: T[], keyFn: (item: T, index: number) => string) =>
  array.reduce((obj, item, index) => {
    const key = keyFn(item, index);
    (obj[key] ??= []).push(item);
    return obj;
  }, {} as Record<string, T[]>);

function getValue(elements: NamedElement[]) {
  if (elements.some(isRadio))
    return valueOf(elements.find((el) => el.checked)) as string | null;

  if (elements.length > 1) return elements.map(valueOf).filter(Boolean);

  const [element] = elements;

  if (isSelectMultiple(element))
    return Array.from(element.options ?? [])
      .filter((opt) => opt.selected)
      .map((opt) => opt.value) as string[];

  return valueOf(element);
}

function valueOf(el: NamedElement | undefined) {
  if (!el) return null;

  if (isCheckbox(el))
    if (!el.hasAttribute('value')) return el.checked;
    else return el.checked ? el.value : null;

  if (isRadio(el)) return el.value || '';

  if (isNumber(el)) return el.value?.length ? toNumber(el.value) : null;

  return el.value;
}

const isCheckbox = (el: NamedElement) => el.type === 'checkbox';
const isNumber = (el: NamedElement) => el.type === 'number';
const isRadio = (el: NamedElement) => el.type === 'radio';
const isSelectMultiple = (el: NamedElement) => el.multiple;
const toNumber = (value: string) => (+value === 0 ? 0 : +value || null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Values = Record<string, any>;

interface NamedElement extends HTMLElement {
  checked?: boolean;
  multiple?: boolean;
  name?: string;
  options?: HTMLOptionElement[];
  type?: string;
  value?: string;
}
