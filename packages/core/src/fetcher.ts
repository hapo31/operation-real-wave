import { ffmpeg } from "https://deno.land/x/deno_ffmpeg@v3.1.0/mod.ts";
import * as api from "./api.ts";
import { SafeFilePath, safeIsExists, safeWriteFile } from "./safeFilePath.ts";
import { Album } from "./generated-core/models/Album.ts";
import { Song } from "./generated-core/models/Song.ts";
import { FileStatus } from "./generated-core/models/FileStatus.ts";
import { AlbumSummary } from "./generated-msr/index.ts";
import {
  AlbumData,
  AlbumDetails,
  Song as SongSrc,
} from "./generated-msr/index.ts";

// import { Album, AlbumDetails, Song, SongSummary } from "./type.ts";

export type AlbumEntity = AlbumDetails & AlbumData;

export async function fetchAlbums(): Promise<Album[]> {
  const { data: albums } = await api.albumApi().albumsGet();

  const coverFetched = await Promise.all(
    albums.map(async (album) => {
      const path = new SafeFilePath(album.name, "cover.png");
      const exists = await safeIsExists(path);
      if (!exists) {
        const bin = await fetchAlbumArtWork(
          album,
        );
        return await safeWriteFile(
          new SafeFilePath(album.name, "cover.jpg"),
          bin,
        );
      }
      return true;
    }),
  );

  return albums.map((v, i) => ({
    artistes: v.artistes,
    cid: v.cid,
    name: v.name,
    status: coverFetched[i] ? FileStatus.Exists : FileStatus.NotExists,
    coverPath: new SafeFilePath(v.name, "cover.png").toString(),
  } satisfies Album));
}

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
      albumArtists: album,
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
