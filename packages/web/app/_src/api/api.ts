import { createConfiguration } from "../generated-orw/configuration";
import { AlbumApi, SongsApi } from "../generated-orw";

const baseConfig = createConfiguration({});

export function albumsApi() {
  return new AlbumApi(baseConfig);
}

export function songApi() {
  return new SongsApi(baseConfig);
}
