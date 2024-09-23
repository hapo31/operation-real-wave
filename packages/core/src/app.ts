import { Hono } from "npm:hono";
import DenoKVModel from "./lib/DenoKVModel.ts";
import { Album } from "./generated-core/models/Album.ts";
import { Song } from "./generated-core/models/Song.ts";
import { albumApi } from "./api.ts";
import { AlbumListResponse } from "./generated-core/models/AlbumListResponse.ts";

export default class App {
  private readonly app: Hono;
  private readonly songModel = new DenoKVModel<Song>(["songs"]);
  private readonly albumModel = new DenoKVModel<Album>(["albums"]);

  constructor(private kv: Deno.Kv, private fileBasePath: string) {
    const app = new Hono();

    app.get("/albums", async (c) => {
      const isFetchFromOrigin = c.req.query("origin") === "1";

      if (isFetchFromOrigin) {
        const { data } = await albumApi().albumsGet();
        const result: Album[] = data.map((r) => ({ ...r }));
        await this.albumModel.setMany("cid", result);

        return c.json<AlbumListResponse>({ albums: data.map() });
      } else {
        const [albums] = await this.albumModel.list();
        return c.json({ albums });
      }
    });

    this.app = app;
  }

  public run() {
  }
}
