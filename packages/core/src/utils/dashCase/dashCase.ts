/**
 * Converts text into its `dash-case` format.
 *
 * Works better for `PascalCase`, `camelCase` and `snake_case`.
 *
 * @param text Text to convert.
 */
export const dashCase = (text: string) =>
  text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
