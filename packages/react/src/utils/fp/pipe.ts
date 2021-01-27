/**
 * Composes from left to right a series of `Unary` operations into a function.
 */
export const pipe: Pipe = <F extends Fn, O extends Unary<unknown, unknown>>(
  firstOperator: F,
  ...operators: O[]
) => (...initialArgs: Parameters<F>) =>
  operators.reduce(
    (previousValue, op) => op(previousValue),
    firstOperator(...initialArgs)
  );

type Fn = (...args: unknown[]) => unknown;
type In<Op extends Fn, R> = Unary<ReturnType<Op>, R>;
type Unary<I, O> = (arg: I) => O;

type Piped<Op extends Fn, R> =
  /** Executes all the previously specified functions in the pipe. */
  (...args: Parameters<Op>) => R;

interface Pipe {
  /** Composes from left to right a series of `Unary` operations into a function. */
  <Op extends Fn>(operator: Op): Op;
  /** Composes from left to right a series of `Unary` operations into a function. */
  <Op extends Fn, R>(op1: Op, ops2: In<Op, R>): Piped<Op, R>;
  /** Composes from left to right a series of `Unary` operations into a function. */
  <Op extends Fn, A, R>(op1: Op, op2: In<Op, A>, op3: Unary<A, R>): Piped<
    Op,
    R
  >;
  /** Composes from left to right a series of `Unary` operations into a function. */
  <Op extends Fn, A, B, R>(
    op1: Op,
    op2: In<Op, A>,
    op3: Unary<A, B>,
    op4: Unary<B, R>
  ): Piped<Op, R>;
  /** Composes from left to right a series of `Unary` operations into a function. */
  <Op extends Fn, A, B, C, R>(
    op1: Op,
    op2: In<Op, A>,
    op3: Unary<A, B>,
    op4: Unary<B, C>,
    op5: Unary<C, R>
  ): Piped<Op, R>;
  /** Composes from left to right a series of `Unary` operations into a function. */
  <Op extends Fn, A, B, C, D, R>(
    op1: Op,
    op2: In<Op, A>,
    op3: Unary<A, B>,
    op4: Unary<B, C>,
    op5: Unary<C, D>,
    op6: Unary<D, R>
  ): Piped<Op, R>;
  /** Composes from left to right a series of `Unary` operations into a function. */
  <Op extends Fn, A, B, C, D, E, R>(
    op1: Op,
    op2: In<Op, A>,
    op3: Unary<A, B>,
    op4: Unary<B, C>,
    op5: Unary<C, D>,
    op6: Unary<D, E>,
    op7: Unary<E, R>
  ): Piped<Op, R>;
  /** Composes from left to right a series of `Unary` operations into a function. */
  <Op extends Fn, A, B, C, D, E, F, R>(
    op1: Op,
    op2: In<Op, A>,
    op3: Unary<A, B>,
    op4: Unary<B, C>,
    op5: Unary<C, D>,
    op6: Unary<D, E>,
    op7: Unary<E, F>,
    op8: Unary<F, R>
  ): Piped<Op, R>;
  /** Composes from left to right a series of `Unary` operations into a function. */
  <Op extends Fn, A, B, C, D, E, F, G, R>(
    op1: Op,
    op2: In<Op, A>,
    op3: Unary<A, B>,
    op4: Unary<B, C>,
    op5: Unary<C, D>,
    op6: Unary<D, E>,
    op7: Unary<E, F>,
    op8: Unary<F, G>,
    op9: Unary<G, R>
  ): Piped<Op, R>;
  /** Composes from left to right a series of `Unary` operations into a function. */
  <Op extends Fn, A, B, C, D, E, F, G, H, R>(
    op1: Op,
    op2: In<Op, A>,
    op3: Unary<A, B>,
    op4: Unary<B, C>,
    op5: Unary<C, D>,
    op6: Unary<D, E>,
    op7: Unary<E, F>,
    op8: Unary<F, G>,
    op9: Unary<G, H>,
    op10: Unary<H, R>
  ): Piped<Op, R>;
}
