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
 * getFormValues(formRef);
 * // { foo: 'bar' }
 */
export const getFormValues = <T extends Result>(form: HTMLFormElement): T =>
  Object.fromEntries(
    Object.entries(form.elements).filter(hasName).map(elementValue)
  );

const hasName = ([key]: Entry) => !isDigit.test(key);
const elementValue = ([key, element]: Entry) => [key, valueOf(element)];
const valueOf = (element: Element) => (element as HTMLFormElement).value;
const isDigit = /^\d$/;

type Entry = [string, Element];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Result = Record<string, any>;
