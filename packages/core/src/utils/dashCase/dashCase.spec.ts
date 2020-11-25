import { describe, expect, it } from '@jest/globals';
import { dashCase } from './dashCase';

describe('dashCase', () => {
  it('should work for PascalCase', () => {
    expect(dashCase('PascalCase')).toBe('pascal-case');
  });

  it('should work for camelCase', () => {
    expect(dashCase('camelCase')).toBe('camel-case');
  });

  it('should work for lower_snake_case', () => {
    expect(dashCase('lower_snake_case')).toBe('lower-snake-case');
  });

  it('should work for UPPER_SNAKE_CASE', () => {
    expect(dashCase('UPPER_SNAKE_CASE')).toBe('upper-snake-case');
  });
});
