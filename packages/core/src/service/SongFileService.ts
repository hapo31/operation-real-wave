import { SafeFilePath } from "../lib/safeFilePath.ts";
import AlbumDetail from "../model/AlbumDetail.ts";
import Song from "../model/Song.ts";
import FfmpegService from "./FfmpegService.ts";
import FileStatusService from "./FileStatusService.ts";

export default class SongFileSerivce {
  async fetchSong(
    song: Song,
    album: AlbumDetail,
  ): Promise<void> {
    await new FfmpegService(new FileStatusService()).save(
      this.makeSongFilePath(song, album),
      song,
      album,
    );
  }

  makeSongFilePath(
    song: Song,
    album: AlbumDetail,
  ) {
    return new SafeFilePath(
      "albums",
      `${album.cid}_${album.name}`,
      `${song.cid}_${song.name}.flac`,
    );
  }
}
