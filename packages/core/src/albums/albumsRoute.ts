import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc.ts";
import { albumApi } from "../api.ts";
import { FileStatus } from "../type.ts";
import AlbumModel from "../model/AlbumModel.ts";

const list = publicProcedure.query(async () => {
  const { data } = await albumApi().getAlbums();

  return {
    albums: await Promise.all(
      data
        .map((album) => new AlbumModel(album))
        .map(async (album) => ({
          ...album,
          coverPath: await album.coverPath,
          status: await album.fileStatus(),
        })),
    ),
  };
});

const details = publicProcedure.input(z.string()).query(async (opts) => {
  const { input: cid } = opts;

  try {
    const { data } = await albumApi().getAlbumSongs(cid);

    return {
      album: {
        cid: data.cid,
        // TODO: 一度表示した画像はキャッシュする処理を入れる
        coverPath: data.coverDeUrl,
        name: data.name,
        // TODO: アルバムの状態（音楽ファイルの有無、カバー画像の有無）をチェックしてステータスを決める
        status: FileStatus.NOT_EXISTS,
        songs: data.songs.map((song) => ({
          artistes: song.artistes,
          cid: song.cid,
          name: song.name,
          // TODO: 楽曲の状態（音楽ファイルの有無）をチェックしてステータスを決める
          status: FileStatus.NOT_EXISTS,
          // ダウンロード済みの場合はローカルのファイルパスを設定する
          filePath: "",
        })),
      },
    };
  } catch (e) {
    console.error(e);
    throw new TRPCError({ code: "NOT_FOUND", message: "Not Found" });
  }
});

const albumsRoute = router({
  list,
  details,
});

export default albumsRoute;
