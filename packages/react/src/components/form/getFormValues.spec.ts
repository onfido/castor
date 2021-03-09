import { describe, expect, it } from '@jest/globals';
import { getFormValues } from './getFormValues';

describe('getFormValues', () => {
  it('should return an object with name:value pairs from elements in a <form>', () => {
    const form = {
      elements: {
        foo: { value: {} },
        bar: { value: [] },
      },
    };

    const result = getFormValues(form as any);

    expect(result).toStrictEqual({
      foo: form.elements.foo.value,
      bar: form.elements.bar.value,
    });
  });
});
