import { describe, expect, it, jest } from '@jest/globals';
import { useDebounce } from './useDebounce';

jest.mock('react', () => ({
  useRef: (current: any) => ({ current }),
}));

describe('useDebounce', () => {
  it('should debounce callback by debounceTime', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    const debounceTime = 100;
    const args = [{}, {}] as const;

    const debounced = useDebounce(callback, debounceTime);

    debounced(...args);
    debounced(...args);
    debounced(...args);
    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(debounceTime);
    expect(callback).toBeCalledWith(...args);
    expect(callback).toBeCalledTimes(1);
  });
});
