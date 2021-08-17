import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { useDebounce } from '../useDebounce/useDebounce';
import { useObserver } from '../useObserver';
import { useResizeObserver } from './useResizeObserver';

jest.mock('../useDebounce/useDebounce', () => ({
  useDebounce: jest.fn((fn: any) => fn),
}));

jest.mock('./useObserver', () => ({
  useObserver: jest.fn((fn: any) => fn()),
}));

describe('useResizeObserver', () => {
  const constructor = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    Object.defineProperty(globalThis, 'ResizeObserver', {
      value: class ResizeObserverMock {
        constructor(callback: ResizeObserverCallback) {
          constructor(callback);
        }
      },
    });
  });

  it('should observe targets with ResizeObserver', () => {
    const targets = [{ current: {} as Element }];

    useResizeObserver(() => {}, targets);

    expect(useObserver).toBeCalledWith(expect.any(Function), targets);
    expect(constructor).toBeCalledTimes(1);
  });

  it('should execute callback when observer fires', () => {
    const onChange = jest.fn();
    const target = { current: {} as Element };
    const entries = [{}];
    constructor.mockImplementationOnce((fn: any) => fn(entries));

    useResizeObserver(onChange, [target]);

    expect(onChange).toBeCalledWith(entries[0]);
  });

  it('should debounce callback by debounceTime', () => {
    const onChange = () => {};
    const target = { current: {} as Element };
    const debounceTime = 100;

    useResizeObserver(onChange, [target], debounceTime);

    expect(useDebounce).toBeCalledWith(onChange, debounceTime);
  });
});
