import { Hono } from "npm:hono";
import { AlbumListResponse } from "./generated-core/models/AlbumListResponse.ts";
import { AlbumSongListResponse } from "./generated-core/models/AlbumSongListResponse.ts";

import { albumApi } from "./api.ts";
import { FileStatus } from "./generated-core/models/FileStatus.ts";
import AlbumModel from "./model/AlbumModel.ts";

export default class App {
  private readonly app: Hono;

  constructor(private fileBasePath: string) {
    const app = new Hono();

    app.get("/albums", async (c) => {
      const { data } = await albumApi().getAlbums();

      return c.json<AlbumListResponse>({
        albums: await Promise.all(
          data
            .map((album) => new AlbumModel(album))
            .map(async (album) => ({
              ...album,
              coverPath: await album.coverPath,
              status: await album.fileStatus(),
            })),
        ),
      });
    });

    app.get("/album/:cid", async (c) => {
      const { cid } = c.req.param();
      try {
        const { data } = await albumApi().getAlbumSongs(cid);

        return c.json<AlbumSongListResponse>({
          album: {
            cid: data.cid,
            // TODO: 一度表示した画像はキャッシュする処理を入れる
            coverPath: data.coverDeUrl,
            name: data.name,
            // TODO: アルバムの状態（音楽ファイルの有無、カバー画像の有無）をチェックしてステータスを決める
            status: FileStatus.NotExists,
            songs: data.songs.map((song) => ({
              artistes: song.artistes,
              cid: song.cid,
              name: song.name,
              // TODO: 楽曲の状態（音楽ファイルの有無）をチェックしてステータスを決める
              status: FileStatus.NotExists,
              // ダウンロード済みの場合はローカルのファイルパスを設定する
              filePath: "",
            })),
          },
        });
      } catch (e) {
        console.error(e);
        return c.json({ error: "Not Found" }, 404);
      }
    });

    // TODO: 楽曲自体の詳細を取得するエンドポイントを追加する

    this.app = app;
  }

  public get fetch() {
    return this.app.fetch;
  }
}
