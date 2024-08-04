import { toArrayAsync } from "../iterator.ts";

const kv = await Deno.openKv();

export default class DenoKVModel<TValue extends object> {
  constructor(private _keyPrefix: Deno.KvKey) {
  }

  get keyPrefix(): Deno.KvKey {
    return this._keyPrefix;
  }

  async get(
    pk: string | Deno.KvKey,
  ): Promise<[TValue | null, Deno.KvEntryMaybe<TValue>]>;
  async get(
    pk: string | Deno.KvKey,
    getDefaultValue: () => TValue | Promise<TValue>,
  ): Promise<[TValue, Deno.KvEntryMaybe<TValue>]>;
  async get(
    pk: string | Deno.KvKey,
    getDefaultValue?: () => TValue | Promise<TValue>,
  ): Promise<[TValue | null, Deno.KvEntryMaybe<TValue>]> {
    const result = await kv.get<TValue>(this._keyPrefix.concat(pk));
    if (result.versionstamp != null) {
      return [result.value, result];
    }
    const defaultValue = await getDefaultValue?.() ?? null;
    if (defaultValue != null) {
      await kv.set(this._keyPrefix.concat(pk), defaultValue);
    }
    return [defaultValue, result];
  }

  async set(
    pk: string | Deno.KvKey,
    value: TValue,
  ): Promise<Deno.KvCommitResult> {
    return await kv.set(this._keyPrefix.concat(pk), value);
  }

  async setMany(
    pkProperty: keyof TValue,
    values: TValue[],
    addtionalPrefix: Deno.KvKey = [],
  ): Promise<Deno.KvCommitResult | Deno.KvCommitResult[]> {
    return await Promise.all(values.map((item) => {
      const key = item[pkProperty];
      if (typeof key !== "string") {
        throw new Error(
          `The property \`value[${pkProperty.toString()}]\` of the item is not a string, given type of ${typeof item[
            pkProperty
          ]}`,
        );
      }
      return kv.set(this._keyPrefix.concat(addtionalPrefix).concat(key), item);
    }));
  }

  async delete(pk: string | Deno.KvKey): Promise<void> {
    await kv.delete(this._keyPrefix.concat(pk));
  }

  async list(
    addtionalPrefix?: string | Deno.KvKey,
  ): Promise<[TValue[], Deno.KvListIterator<TValue>]> {
    const result = await kv.list<TValue>({
      prefix: this._keyPrefix.concat(addtionalPrefix ?? []),
    });
    const items = await toArrayAsync(result);
    return [items.map((item) => item.value), result];
  }
}
