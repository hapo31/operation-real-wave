import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc/init.ts";
import { albumApi } from "../api.ts";
import { FileStatus } from "../type.ts";
import Album from "../model/Album.ts";
import AlbumDetail from "../model/AlbumDetail.ts";
import { fetchAlbumArtWork } from "../fetcher.ts";

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
            status: await Album.fileStatus(album),
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
          // TODO: アルバムの状態（音楽ファイルの有無、カバー画像の有無）をチェックしてステータスを決める
          status: FileStatus.NOT_EXISTS,
        },
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "NOT_FOUND", message: "Not Found" });
    }
  }),

  fetch: publicProcedure.input(z.object({ albumCid: z.string() })).mutation(async (opts) => {
    const { input: { albumCid } } = opts;

    const { data } = await albumApi().getAlbumDetails(albumCid);

    const album = new AlbumDetail(data);

    if (await Album.fileStatus(album) !== FileStatus.EXISTS) {
      await Album.writeCover(album, await fetchAlbumArtWork(data));
    }

    data.songs;
  }),
});

export default albumsRoute;
