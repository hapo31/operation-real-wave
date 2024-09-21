import {
  AlbumApi,
  createConfiguration,
  SongsApi,
} from "../generated-orw/index.ts";

const baseConfig = createConfiguration({});

export function albums() {
  return new AlbumApi(baseConfig);
}

export function song() {
  return new SongsApi(baseConfig);
}
