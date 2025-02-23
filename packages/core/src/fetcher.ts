import { ffmpeg } from "https://deno.land/x/deno_ffmpeg@v3.1.0/mod.ts";

import { albumApi } from "./api.ts";
import Album from "./model/Album.ts";
import { MsrAlbumDetails } from "./generated-msr/models/MsrAlbumDetails.ts";
import { MsrAlbumData } from "./generated-msr/models/MsrAlbumData.ts";
import { MsrAlbumSummary } from "./generated-msr/models/MsrAlbumSummary.ts";
import { MsrSong } from "./generated-msr/models/MsrSong.ts";

export type AlbumEntity = MsrAlbumDetails & MsrAlbumData;

export async function fetchAlbumList(): Promise<Album[]> {
  const { data } = await albumApi().getAlbums();

  return data.map((album) => new Album(album));
}

export async function fetchAlbumArtWork(
  album: Pick<MsrAlbumSummary, "coverUrl">,
): Promise<ArrayBuffer> {
  const artwork = await fetch(album.coverUrl).then((res) => res.arrayBuffer());
  return artwork;
}

export async function fetchSongFile(
  song: Pick<MsrSong, "name" | "artists" | "sourceUrl">,
  album: Pick<AlbumEntity, "artistes" | "name">,
  trackNumber: `${number}/${number}`,
  audioFormat = "flac",
): Promise<void> {
  const command = ffmpeg({ input: song.sourceUrl, ffmpegDir: "/usr/bin/ffmpeg" });
  command.audioCodec(audioFormat);
  await command.save(
    "./albums/test.flac",
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
    metadata: formatMetadata({
      title: `${props.name}`,
      artist: `${props.artists.join(", ")}`,
      album_artist: props.albumArtists ? `${props.albumArtists.join(", ")}` : undefined,
      album: `${props.albumTitle}`,
      track: `${props.trackNumber}`,
    }),
    // "metadata": `title="${props.name}" -`,
    // "metadata:g:1": `artist="${props.artists.join(", ")}"`,
    // "metadata:g:2": props.albumArtists
    //   ? `album_artist="${props.albumArtists.join(", ")}"`
    //   : undefined,
    // "metadata:g:3": `album="${props.albumTitle}"`,
    // "metadata:g:4": `track="${props.trackNumber}"`,
  };
}

// metadata: formatMetadata({
//   title: `${props.name}`,
//   artist: `${props.artists.join(", ")}`,
//   album_artist: props.albumArtists ? `${props.albumArtists.join(", ")}` : undefined,
//   album: `${props.albumTitle}`,
//   track: `${props.trackNumber}`,
// }),

function formatMetadata(metadata: Record<string, string | undefined>) {
  return Object.entries(metadata)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}="${value}"`)
    .join("-metadata ");
}
