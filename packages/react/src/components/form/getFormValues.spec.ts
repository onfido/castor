import { describe, expect, it } from '@jest/globals';
import { getFormValues } from './getFormValues';

describe('getFormValues', () => {
  it('should return an object with { name: value } pairs from elements in a <form>', () => {
    const elements = [
      { name: 'foo', value: 1 },
      { name: 'bar', value: 2 },
    ];

    const result = getFormValues({ elements } as any);

    expect(result).toStrictEqual({ foo: 1, bar: 2 });
  });

  it('should filter out elements with no name', () => {
    const elements = [{ name: 'foo', value: 'foo' }, { value: 'bar' }];

    const result = getFormValues({ elements } as any);

    expect(result).toStrictEqual({ foo: 'foo' });
  });

  it('should return an array of "value"s for several elements with the same name', () => {
    const elements = [
      { name: 'name', value: 'foo' },
      { name: 'name', value: 'bar' },
    ];

    const result = getFormValues({ elements } as any);

    expect(result).toStrictEqual({ name: ['foo', 'bar'] });
  });

  describe('<input type="number" />', () => {
    const number = { type: 'number' };

    it('should cast "value"s from strings to numbers', () => {
      const elements = [{ ...number, name: 'foo', value: '0' }];

      const result = getFormValues({ elements } as any);

      expect(result).toStrictEqual({ foo: 0 });
    });

    it('should return null when "value" is unset', () => {
      const elements = [{ ...number, name: 'foo' }];

      const result = getFormValues({ elements } as any);

      expect(result).toStrictEqual({ foo: null });
    });

    it('should return null when "value" is non-numeric', () => {
      const elements = [{ ...number, name: 'foo', value: 'e' }];

      const result = getFormValues({ elements } as any);

      expect(result).toStrictEqual({ foo: null });
    });
  });

  describe('<input type="checkbox" />', () => {
    const checkbox = { hasAttribute, type: 'checkbox' };

    it('should return "checked" when "value" is unset', () => {
      const elements = [
        { ...checkbox, name: 'foo', checked: true },
        { ...checkbox, name: 'bar', checked: false },
      ];

      const result = getFormValues({ elements } as any);

      expect(result).toStrictEqual({ foo: true, bar: false });
    });

    it('should return "value" when defined, depending on "checked"', () => {
      const elements = [
        { ...checkbox, name: 'foo', value: 'foo', checked: true },
        { ...checkbox, name: 'bar', value: 'bar' },
      ];

      const result = getFormValues({ elements } as any);

      expect(result).toStrictEqual({ foo: 'foo', bar: null });
    });
  });

  describe('<input type="radio" />', () => {
    const radio = { hasAttribute, type: 'radio' };

    it('should find the "checked" element and return its "value" if set', () => {
      const elements = [
        { ...radio, name: 'a', value: 'foo' },
        { ...radio, name: 'a', value: 'bar', checked: true },
      ];

      const result = getFormValues({ elements } as any);

      expect(result).toStrictEqual({ a: 'bar' });
    });

    it('should find the "checked" element and return an empty string if "value" is unset', () => {
      const elements = [
        { ...radio, name: 'foo' },
        { ...radio, name: 'foo', checked: true },
      ];

      const result = getFormValues({ elements } as any);

      expect(result).toStrictEqual({ foo: '' });
    });

    it('should return "null" if there is no "checked" element', () => {
      const elements = [
        { ...radio, name: 'a', value: 'foo' },
        { ...radio, name: 'a', value: 'bar' },
      ];

      const result = getFormValues({ elements } as any);

      expect(result).toStrictEqual({ a: null });
    });
  });

  describe('<select multiple />', () => {
    const selectMultiple = { multiple: true };

    it('should filter "selected" options', () => {
      const elements = [
        {
          ...selectMultiple,
          name: 'a',
          options: [
            { selected: true, value: 'foo' },
            { selected: false, value: 'bar' },
            { selected: true, value: 'zed' },
          ],
        },
      ];

      const result = getFormValues({ elements } as any);

      expect(result).toStrictEqual({ a: ['foo', 'zed'] });
    });

    it('should return an empty array for a select multiple with no options', () => {
      const elements = [{ ...selectMultiple, name: 'foo' }];

      const result = getFormValues({ elements } as any);

      expect(result).toStrictEqual({ foo: [] });
    });
  });
});

function hasAttribute(this: Record<string, unknown>, attr: string) {
  return attr in this;
}
