type InferAsyncIterator<T> = T extends AsyncIterableIterator<infer U> ? U
  : T;

// deno-lint-ignore no-explicit-any
export async function toArrayAsync<T extends AsyncIterable<any>>(
  iterator: T,
): Promise<InferAsyncIterator<T>[]> {
  const result: InferAsyncIterator<T>[] = [];
  for await (const item of iterator) {
    result.push(item);
  }
  return result;
}

type InferIterator<T> = T extends IterableIterator<infer U> ? U : T;

// deno-lint-ignore no-explicit-any
export function toArray<T extends Iterable<any>>(
  iterator: T,
): InferIterator<T>[] {
  const result: InferIterator<T>[] = [];
  for (const item of iterator) {
    result.push(item);
  }
  return result;
}
