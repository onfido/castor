import { describe, expect, it } from '@jest/globals';
import { kebabCase } from './kebabCase';

describe('kebabCase', () => {
  it('should work for camelCase', () => {
    expect(kebabCase('camelCase')).toBe('camel-case');
  });

  it('should work for PascalCase', () => {
    expect(kebabCase('PascalCase')).toBe('pascal-case');
  });

  it('should work for lower_snake_case', () => {
    expect(kebabCase('lower_snake_case')).toBe('lower-snake-case');
  });

  it('should work for UPPER_SNAKE_CASE', () => {
    expect(kebabCase('UPPER_SNAKE_CASE')).toBe('upper-snake-case');
  });
});
