import { describe, expect, it } from '@jest/globals';
import { getFormValues } from './getFormValues';

describe('getFormValues', () => {
  it('should return an object with [name, value] pairs from elements in a <form>', () => {
    const form = {
      elements: [
        { name: 'foo', value: {} },
        { value: 1 },
        { name: 'bar', value: [] },
      ],
    };

    const result = getFormValues(form as any);

    expect(result).toStrictEqual({
      foo: form.elements[0].value,
      bar: form.elements[2].value,
    });
  });
});
