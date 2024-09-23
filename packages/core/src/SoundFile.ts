import { Album } from "./generated-core/models/Album.ts";
import { Song } from "./generated-core/models/Song.ts";
import IFile from "./lib/IFile.ts";
import {
  safeDeleteFile,
  SafeFilePath,
  safeIsExists,
  safeWriteFile,
} from "./safeFilePath.ts";

export default class SoundFile implements IFile {
  private filePath: SafeFilePath;

  constructor(
    private basePath: string,
    private model: Song,
    private belongsAlbum: Album,
    private albumArtists: string[],
  ) {
    this.filePath = new SafeFilePath(
      this.basePath,
      model.filePath,
    );
  }

  get metadata(): Metadata {
    const albumTracks = this.belongsAlbum.songs.length;
    const track =
      this.belongsAlbum.songs.findIndex((s) => s.cid === this.model.cid) + 1;
    const trackNumber: `${number}/${number}` = `${track}/${albumTracks}`;

    return {
      name: this.model.name,
      artists: this.model.artistes,
      albumArtists: this.albumArtists,
      albumTitle: this.belongsAlbum.name,
      trackNumber,
    };
  }

  async save(buffer: ArrayBuffer): Promise<void> {
    await safeWriteFile(this.filePath, buffer);
  }
  async delete(): Promise<void> {
    await safeDeleteFile(this.filePath);
  }
  async exists(): Promise<boolean> {
    return await safeIsExists(this.filePath);
  }
}

type Metadata = {
  name: string;
  artists: string[];
  albumArtists: string[];
  albumTitle: string;
  trackNumber: `${number}/${number}`;
};

export function makeMataDataArgs(metadata: Metadata) {
  return {
    "metadata:g:0": `title=${metadata.name}`,
    "metadata:g:1": `artist=${metadata.artists.join(", ")}`,
    "metadata:g:2": `album_artist=${metadata.albumArtists.join(", ")}`,
    "metadata:g:3": `album=${metadata.albumTitle}`,
    "metadata:g:4": `track=${metadata.trackNumber}`,
  };
}
