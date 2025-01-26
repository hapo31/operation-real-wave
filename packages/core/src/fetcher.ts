import { ffmpeg } from "https://deno.land/x/deno_ffmpeg@v3.1.0/mod.ts";

import { albumApi } from "./api.ts";
import AlbumModel from "./model/AlbumModel.ts";
import { MsrAlbumDetails } from "./generated-msr/models/MsrAlbumDetails.ts";
import { MsrAlbumData } from "./generated-msr/models/MsrAlbumData.ts";
import { MsrAlbumSummary } from "./generated-msr/models/MsrAlbumSummary.ts";
import { MsrSong } from "./generated-msr/models/MsrSong.ts";

export type AlbumEntity = MsrAlbumDetails & MsrAlbumData;

export async function fetchAlbumList(): Promise<AlbumModel[]> {
  const { data } = await albumApi().getAlbums();

  return data.map((album) => new AlbumModel(album));
}

export async function fetchAlbumArtWork(
  album: MsrAlbumSummary,
): Promise<ArrayBuffer> {
  const artwork = await fetch(album.coverUrl).then((res) => res.arrayBuffer());
  return artwork;
}

export async function fetchSongFile(
  song: MsrSong,
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
