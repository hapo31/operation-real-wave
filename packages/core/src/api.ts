import { createConfiguration } from "./generated-msr/configuration.ts";
import { SongsApi } from "./generated-msr/index.ts";
import { AlbumApi, Configuration } from "./generated-msr/index.ts";
import { server2 } from "./generated-msr/servers.ts";

const base = "https://monster-siren.hypergryph.com/api";

const baseConfig: Configuration = createConfiguration({
  baseServer: server2, // 1は開発用
});

export function albumApi() {
  return new AlbumApi(baseConfig);
}

export function songApi() {
  return new SongsApi(baseConfig);
}
