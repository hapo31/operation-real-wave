import { ffmpeg } from "https://deno.land/x/deno_ffmpeg@v3.1.0/mod.ts";

import {
  AlbumData,
  AlbumDetails,
  AlbumSummary,
  Song as SongSrc,
} from "./generated-msr/index.ts";

export type AlbumEntity = AlbumDetails & AlbumData;

export async function fetchAlbumArtWork(
  album: AlbumSummary,
): Promise<ArrayBuffer> {
  const artwork = await fetch(album.coverUrl).then((res) => res.arrayBuffer());
  return artwork;
}

export async function fetchSongFile(
  song: SongSrc,
  album: AlbumEntity,
  trackNumber: `${number}/${number}`,
  audioFormat = "flac",
): Promise<Uint8Array> {
  const command = ffmpeg({ input: song.sourceUrl });
  command.audioCodec(audioFormat);
  return await command.save(
    "pipe:1",
    false,
    makeMataDataArgs({
      name: song.name,
      artists: song.artists,
      albumArtists: album.artistes,
      albumTitle: album.name,
      trackNumber,
    }),
  );
}

export function makeMataDataArgs(
  props: {
    name: string;
    artists: string[];
    albumArtists: string[];
    albumTitle: string;
    trackNumber: `${number}/${number}`;
  },
) {
  return {
    "metadata:g:0": `title=${props.name}`,
    "metadata:g:1": `artist=${props.artists.join(", ")}`,
    "metadata:g:2": `album_artist=${props.albumArtists.join(", ")}`,
    "metadata:g:3": `album=${props.albumTitle}`,
    "metadata:g:4": `track=${props.trackNumber}`,
  };
}
