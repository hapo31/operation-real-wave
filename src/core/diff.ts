export default function diffArray<
  SrcValue,
  Key extends keyof SrcValue,
  CompValue extends { [k in keyof Pick<SrcValue, Key>]: SrcValue[k] }
>(key: Key, a: SrcValue[], b: CompValue[]) {
  const bSet = Object.fromEntries(b.map((item) => [item[key], item]));
  return a.filter((item) => bSet[item[key]] == null);
}
