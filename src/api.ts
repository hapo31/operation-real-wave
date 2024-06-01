import type {
  AlbumDetailsAPIResponse,
  AlbumsAPIResponse,
  SongDetailsAPIResponse,
} from "./type.ts";

const base = "https://monster-siren.hypergryph.com/api";

export async function albums() {
  const albums = await fetch(`${base}/albums`).then((res) => res.json());

  return albums as AlbumsAPIResponse;
}

export async function albumDetails(albumCid: string) {
  const details = await fetch(`${base}/album/${albumCid}/detail`).then((res) =>
    res.json()
  );

  return details as AlbumDetailsAPIResponse;
}

export async function songDetails(songCid: string) {
  const song = await fetch(`${base}/song/${songCid}`).then((res) => res.json());

  return song as SongDetailsAPIResponse;
}
