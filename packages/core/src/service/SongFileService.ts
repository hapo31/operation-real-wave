import { fetchSongFile } from "../fetcher.ts";
import { SafeFilePath } from "../lib/safeFilePath.ts";
import Album from "../model/Album.ts";
import Song from "../model/Song.ts";
import FfmpegService from "./FfmpegService.ts";

export default class SongFileSerivce {
  async fetchSong(
    song: Song,
    album: Pick<Album, "artistes" | "name">,
    trackNumber: `${number}/${number}`,
  ): Promise<void> {
    await new FfmpegService().save(new SafeFilePath("./albums/test.flac"), song);

    // return await fetchSongFile(song, album, trackNumber);
  }
}
