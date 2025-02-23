import { publicProcedure, router } from "../trpc/init.ts";
import { songApi } from "../api.ts";
import z from "zod";
import Song from "../model/Song.ts";
import SongFileSerivce from "../service/SongFileService.ts";
import { albumApi } from "../api.ts";
import AlbumDetail from "../model/AlbumDetail.ts";

const songRoute = router({
  detail: publicProcedure.input(z.string()).query(async (opts) => {
    const { input: cid } = opts;

    const { data } = await songApi().getSongDetails(cid);

    return {
      song: new Song(data, await Song.fileStatus(data)),
    };
  }),

  fetch: publicProcedure.input(z.string()).mutation(async (opts) => {
    const { input: cid } = opts;

    try {
      const { data: songResponse } = await songApi().getSongDetails(cid);
      const { data: albumResponse } = await albumApi().getAlbumSongs(songResponse.albumCid);

      const song = new Song(songResponse, await Song.fileStatus(songResponse));

      const album = new AlbumDetail(albumResponse);

      const trackNumber = album.songCids.findIndex((s) => s === song.cid) + 1;

      const file = await new SongFileSerivce().fetchSong(
        song,
        album,
        `${trackNumber}/${album.songCids.length}`,
      );
      // await Deno.writeFile("./albums/test.flac", file);
    } catch (e) {
      console.error(e);
    }
  }),
});

export default songRoute;
