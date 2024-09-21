import {
  AlbumApi,
  createConfiguration,
  SongsApi,
} from "../generated-orw/index.ts";

const baseConfig = createConfiguration({});

export function albumsApi() {
  return new AlbumApi(baseConfig);
}

export function songApi() {
  return new SongsApi(baseConfig);
}
