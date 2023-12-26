import { ParseArgsConfig, parseArgs } from "util";

const args = {
  options: {
    force: {
      type: "boolean",
      short: "f",
      default: false,
    },
    output: {
      type: "string",
      short: "o",
      default: "dist",
    },
    "meta-only": {
      type: "boolean",
      short: "m",
      default: false,
    },
  },
} satisfies ParseArgsConfig;

export default function parseOption() {
  const parsed = parse();

  return parsedArgsToPlaneObject(parsed);
}

function parse() {
  return parseArgs(args);
}

type ParsedArgsToObject<
  T extends ReturnType<typeof parse>,
  Values = T["values"]
> = T extends {
  values: {
    [key in keyof Values]: Values[key];
  };
}
  ? { [key in keyof Values]: Exclude<T["values"][key], undefined> }
  : never;

function parsedArgsToPlaneObject(
  parsed: ReturnType<typeof parse>
): ParsedArgsToObject<typeof parsed> {
  return Object.fromEntries(
    Object.entries(parsed.values).filter(([, value]) => value != null)
  ) as ParsedArgsToObject<ReturnType<typeof parse>>;
}
