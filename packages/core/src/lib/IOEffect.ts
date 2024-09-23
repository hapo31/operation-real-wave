export default interface IOEffect<
  DefaultKeyType extends string[] | ReadonlyArray<unknown>,
> {
  save<Key extends DefaultKeyType = DefaultKeyType>(keys: Key[]): void;
  read<T, Key extends DefaultKeyType = DefaultKeyType>(
    keys: Key[],
  ): T | Promise<T>;
}
