import { ffmpeg } from "https://deno.land/x/deno_ffmpeg@v3.1.0/mod.ts";
import * as api from "./api.ts";
import { SafeFilePath, safeWriteFile } from "./safeFilePath.ts";
import { Album, AlbumDetails, Song, SongSummary } from "./type.ts";

export type AlbumEntity = Omit<AlbumDetails, "songs"> & {
  albumArtistes: string[];
  songs: Song[];
};

export type SafeFileNameWith<T> = T & {
  fileName: SafeFilePath;
  originalName: string;
};

export async function fetchAlbums(): Promise<SafeFileNameWith<Album>[]> {
  const { data: albums } = await api.albumApi().albumsGet();

  return albums.map((v) => ({
    ...v,
    fileName: new SafeFilePath(v.name),
    originalName: v.name,
  }));
}

export async function fetchAlbumArtWork(
  album: Album,
  distDir: SafeFilePath,
): Promise<ArrayBuffer> {
  const artwork = await fetch(album.coverUrl).then((res) => res.arrayBuffer());
  await safeWriteFile(distDir.join(`${album.name}.jpg`), artwork);
  return artwork;
}

export async function fetchSongDetails(
  song: SongSummary,
): Promise<SafeFileNameWith<Song>> {
  const { data } = await api.songApi().songCidGet(song.cid);

  return {
    ...data,
    fileName: new SafeFilePath(data.name),
    originalName: data.name,
  };
}

export async function fetchSongFile(
  song: Song,
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
      albumArtists: album.albumArtistes,
      albumTitle: album.name,
      trackNumber,
    }),
  );
}

function makeMataDataArgs(
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
