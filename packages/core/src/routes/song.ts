import { publicProcedure, router } from "../trpc/init.ts";
import { songApi } from "../api.ts";
import z from "zod";
import Song from "../model/Song.ts";
import SongFileSerivce from "../service/SongFileService.ts";
import { albumApi } from "../api.ts";
import AlbumDetail from "../model/AlbumDetail.ts";
import { TRPCError } from "@trpc/server";
import AlbumFileService from "../service/AlbumFilesService.ts";
import { FileStatus } from "../type.ts";

const songRoute = router({
  detail: publicProcedure.input(z.string()).query(async (opts) => {
    const { input: cid } = opts;

    const { data } = await songApi().getSongDetails(cid);

    return {
      song: new Song(data),
    };
  }),

  fetch: publicProcedure.input(z.string()).mutation(async (opts) => {
    const { input: cid } = opts;

    try {
      const { data: songResponse } = await songApi().getSongDetails(cid);
      const { data: albumResponse } = await albumApi().getAlbumSongs(songResponse.albumCid);

      const albumFileService = new AlbumFileService();

      const artworkStatus = await albumFileService.artworkStatus(albumResponse);
      if (artworkStatus !== FileStatus.EXISTS) {
        await albumFileService.fetchCover(albumResponse);
      }

      const song = new Song(songResponse);
      const album = new AlbumDetail(albumResponse);

      await new SongFileSerivce().fetchSong(
        song,
        album,
      );
      return { message: "ok" };
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});

export default songRoute;
