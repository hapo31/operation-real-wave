import { createConfiguration } from "./generated-msr/configuration.ts";
import { SongsApi } from "./generated-msr/index.ts";
import { AlbumApi, Configuration } from "./generated-msr/index.ts";

const base = "https://monster-siren.hypergryph.com/api";

const baseConfig: Configuration = createConfiguration({});

export function albumApi() {
  return new AlbumApi(baseConfig);
}

export function songApi() {
  return new SongsApi(baseConfig);
}
