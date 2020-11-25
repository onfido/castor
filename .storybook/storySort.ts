import { StorySortComparator, Parameters } from '@storybook/addons';

// sorts stories naturally by kind, then by ID
export const storySort: StorySortComparator = ([_, a]: Story, [__, b]: Story) =>
  a.kind === b.kind
    ? 0
    : a.id.localeCompare(b.id, undefined, { numeric: true });

type Story = [
  string,
  {
    id: string;
    kind: string;
    name: string;
    story: string;
    parameters: {
      fileName: string;
      options: {
        hierarchyRootSeparator: string;
        hierarchySeparator: RegExp;
      };
      framework: 'react';
    };
  },
  Parameters,
  Parameters
];
