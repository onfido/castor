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
    (Array.from(form.elements) as HTMLInputElement[])
      .filter((el) => !!el.name)
      .map((el) => [el.name, el.value])
  ) as T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Result = Record<string, any>;
