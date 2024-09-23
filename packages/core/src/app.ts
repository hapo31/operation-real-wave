import { Hono } from "npm:hono";
import DenoKVModel from "./lib/DenoKVModel.ts";
import { Song } from "./generated-core/models/Song.ts";
import { albumApi } from "./api.ts";
import { AlbumListResponse } from "./generated-core/models/AlbumListResponse.ts";
import { AlbumSummary } from "./generated-core//models/AlbumSummary.ts";
import AlbumModel from "./model/AlbumModel.ts";

export default class App {
  private readonly app: Hono;
  private readonly songModel = new DenoKVModel<Song>(["songs"]);
  private readonly albumSummaryModel = new DenoKVModel<AlbumSummary>([
    "albumSummary",
  ]);

  constructor(private kv: Deno.Kv, private fileBasePath: string) {
    const app = new Hono();

    app.get("/albums", async (c) => {
      const isFetchFromOrigin = c.req.query("origin") === "1";

      if (isFetchFromOrigin) {
        const { data } = await albumApi().albumsGet();
        const modelData = await Promise.all(data.map(AlbumModel.fromMsrEntity));
        await this.albumSummaryModel.setMany(
          "cid",
          modelData,
        );

        return c.json<AlbumListResponse>({ albums: modelData });
      } else {
        const [albums] = await this.albumSummaryModel.list();
        return c.json({ albums });
      }
    });

    this.app = app;
  }

  public run() {
    Deno.serve(this.app.fetch);
  }
}
