import { publicProcedure, router } from "../trpc/init.ts";
import { songApi } from "../api.ts";
import z from "zod";
import Song from "../model/Song.ts";

const songRoute = router({
  detail: publicProcedure.input(z.string()).query(async (opts) => {
    const { input: cid } = opts;

    const { data } = await songApi().getSongDetails(cid);

    return {
      song: new Song(data, await Song.fileStatus(data)),
    };
  }),
});

export default songRoute;
