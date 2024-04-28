import ffmpeg, { type FfmpegCommand } from "fluent-ffmpeg";
import * as api from "./api.js";
import { SafeFilePath, safeWriteFile } from "./safeFilePath.js";
import { Album, Song, SongSummary } from "./type.js";

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
  distDir: SafeFilePath
): Promise<ArrayBuffer> {
  const artwork = await fetch(album.coverUrl).then((res) => res.arrayBuffer());
  await safeWriteFile(distDir.join(`${album.name}.jpg`), Buffer.from(artwork));
  return artwork;
}

export async function fetchSongDetails(
  song: SongSummary
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
  targetDir: SafeFilePath,
  audioFormat = "flac"
): Promise<FfmpegCommand> {
  const command = ffmpeg(song.sourceUrl).format("flac");

  return command;
}
