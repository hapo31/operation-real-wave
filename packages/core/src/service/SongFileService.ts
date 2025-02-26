import { SafeFilePath, safeIsExists } from "../lib/safeFilePath.ts";
import AlbumDetail from "../model/AlbumDetail.ts";
import Song from "../model/Song.ts";
import { FileStatus } from "../type.ts";
import FfmpegService from "./FfmpegService.ts";
import FileFetchStatusService from "./FileFetchStatusService.ts";

export default class SongFileSerivce {
  fileFetchStatusService = new FileFetchStatusService();
  ffmpegService = new FfmpegService(this.fileFetchStatusService);

  async fetchSong(
    song: Song,
    album: AlbumDetail,
  ): Promise<void> {
    await this.ffmpegService.save(
      this.makeSongFilePath(song, album),
      song,
      album,
    );
  }

  async status(
    song: Song,
    album: Pick<AlbumDetail, "cid" | "name">,
  ) {
    const isExists = await safeIsExists(this.makeSongFilePath(song, album));
    if (isExists) {
      return FileStatus.EXISTS;
    }
    const { state } = await this.fileFetchStatusService.get(album, song);
    return state;
  }

  makeSongFilePath(
    song: Song,
    album: Pick<AlbumDetail, "cid" | "name">,
  ) {
    return new SafeFilePath(
      "albums",
      `${album.cid}_${album.name}`,
      `${song.cid}_${song.name}.flac`,
    );
  }
}
