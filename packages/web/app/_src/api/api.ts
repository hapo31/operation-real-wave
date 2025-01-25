import { createConfiguration } from "core/api/configuration.js";
import { AlbumApi, SongsApi } from "core/api/index.js";

const baseConfig = createConfiguration({});

export function albumsApi() {
  return new AlbumApi(baseConfig);
}

export function songApi() {
  return new SongsApi(baseConfig);
}
