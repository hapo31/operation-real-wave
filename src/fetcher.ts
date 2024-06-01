import { ffmpeg } from "x/ffmpeg";
import * as api from "./api.ts";
import { SafeFilePath, safeWriteFile } from "./safeFilePath.ts";
import { Album, Song, SongSummary } from "./type.ts";

export type SafeFileNameWith<T> = T & {
  fileName: SafeFilePath;
  originalName: string;
};

export async function fetchAlbums(): Promise<SafeFileNameWith<Album>[]> {
  const { data: albums } = await api.albums();

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
  const { data } = await api.songDetails(song.cid);

  return {
    ...data,
    fileName: new SafeFilePath(data.name),
    originalName: data.name,
  };
}

export async function fetchSongFile(
  song: SafeFileNameWith<Song>,
  audioFormat = "flac",
): Promise<Uint8Array> {
  const command = ffmpeg({ input: song.sourceUrl });
  command.audioCodec(audioFormat);
  return await command.save("pipe:1");
}
