import { fetchSongFile } from "../fetcher.ts";
import Album from "../model/Album.ts";
import { Song } from "../type.ts";

export default class SongFileSerivce {
  async fetchSong(
    song: Song,
    album: Pick<Album, "artistes" | "name">,
    trackNumber: `${number}/${number}`,
  ): Promise<void> {
    return await fetchSongFile(song, album, trackNumber);
  }
}
