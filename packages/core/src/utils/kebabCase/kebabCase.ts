/**
 * Converts text into `kebab-case` format.
 *
 * Works better for `camelCase`, `PascalCase` and `snake_case`.
 *
 * @param text Text to convert.
 */
export const kebabCase = (text: string) =>
  text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
