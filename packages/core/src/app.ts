import { Hono } from "npm:hono";
import { AlbumListResponse } from "./generated-core/models/AlbumListResponse.ts";
import { fetchAlbumList } from "./fetcher.ts";

export default class App {
  private readonly app: Hono;

  constructor(private fileBasePath: string) {
    const app = new Hono();

    app.get("/albums", async (c) => {
      const modelData = await fetchAlbumList();
      return c.json<AlbumListResponse>({ albums: modelData });
    });

    this.app = app;
  }

  public get fetch() {
    return this.app.fetch;
  }
}
