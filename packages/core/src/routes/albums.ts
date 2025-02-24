import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc/init.ts";
import { albumApi } from "../api.ts";
import { FileStatus } from "../type.ts";
import Album from "../model/Album.ts";
import AlbumDetail from "../model/AlbumDetail.ts";
import { fetchAlbumArtWork } from "../fetcher.ts";
import FileStatusService, { SongStatus } from "../service/FileStatusService.ts";

const albumsRoute = router({
  list: publicProcedure.query(async () => {
    const { data } = await albumApi().getAlbums();

    return {
      albums: await Promise.all(
        data
          .map((album) => new Album(album))
          .map(async (album) => ({
            ...album,
            coverPath: await album.coverPath,
          })),
      ),
    };
  }),
  details: publicProcedure.input(z.string()).query(async (opts) => {
    const { input: cid } = opts;

    try {
      const { data } = await albumApi().getAlbumSongs(cid);

      const model = new AlbumDetail(data);

      return {
        album: {
          ...model,
          cid: data.cid,
          // TODO: 一度表示した画像はキャッシュする処理を入れる
          coverPath: data.coverDeUrl,
          name: data.name,
        },
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "NOT_FOUND", message: "Not Found" });
    }
  }),

  fetch: publicProcedure.input(z.object({ albumCid: z.string() })).mutation(async (opts) => {
    const { input: { albumCid } } = opts;

    const { data } = await albumApi().getAlbumSongs(albumCid);

    const album = new AlbumDetail(data);

    if (await Album.fileStatus(album) !== FileStatus.EXISTS) {
      await Album.writeCover(album, await fetchAlbumArtWork(data));
    }
  }),

  status: publicProcedure.input(z.string()).query(async (opts) => {
    const { input: cid } = opts;

    const { data: album } = await albumApi().getAlbumSongs(cid);

    const statusService = new FileStatusService();

    const songStatuses = await Promise.all(
      album.songs.map((song) => statusService.get(album, song)),
    );

    return {
      statuses: songStatuses
        .reduce<Record<string, SongStatus>>((acc, curr) => ({
          ...acc,
          [curr.cid]: curr,
        }), {}),
      albumStatus: songStatuses.every((status) => status.state === "complete")
        ? "all-complete"
        : "missing-songs",
    };
  }),
});

export default albumsRoute;
