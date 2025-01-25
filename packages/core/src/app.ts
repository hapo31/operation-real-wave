import { Hono } from "npm:hono";
import { AlbumListResponse } from "./generated-core/models/AlbumListResponse.ts";
import { AlbumSongListResponse } from "./generated-core/models/AlbumSongListResponse.ts";

import { albumApi } from "./api.ts";
import { FileStatus } from "./generated-core/models/FileStatus.ts";

export default class App {
  private readonly app: Hono;

  constructor(private fileBasePath: string) {
    const app = new Hono();

    app.get("/albums", async (c) => {
      const { data } = await albumApi().albumsGet();

      return c.json<AlbumListResponse>({
        albums: data.map((album) => ({
          ...album,
          coverPath: album.coverUrl,
          status: FileStatus.NotExists,
        })),
      });
    });

    app.get("/album/:cid", async (c) => {
      const { cid } = c.req.param();
      try {
        const { data } = await albumApi().albumCidDetailGet(cid);

        return c.json<AlbumSongListResponse>({
          album: {
            cid: data.cid,
            coverPath: data.coverDeUrl,
            name: data.name,
            status: FileStatus.NotExists,
            songs: data.songs.map((song) => ({
              artistes: song.artistes,
              cid: song.cid,
              name: song.name,
              status: FileStatus.NotExists,
              filePath: "",
            })),
          },
        });
      } catch (e) {
        console.error(e);
        return c.json({ error: "Not Found" }, 404);
      }
    });

    this.app = app;
  }

  public get fetch() {
    return this.app.fetch;
  }
}
