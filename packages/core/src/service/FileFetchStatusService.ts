/// <reference lib="deno.unstable" />

import { z } from "zod";
import Album from "../model/Album.ts";
import Song from "../model/Song.ts";

const StateSchema = z.enum(["not-exists", "fetch", "complete", "error"]);

const StatusSchema = z.object({
  albumCid: z.string(),
  cid: z.string(),
  state: StateSchema,
  progress: z.number(),
  throughput: z.number(),
  errorTrace: z.string().optional(),
  updatedAt: z.date(),
});

type State = z.infer<typeof StateSchema>;
export type SongStatus = z.infer<typeof StatusSchema>;

export default class FileFetchStatusService {
  kv!: Deno.Kv;
  kvName: string = "./status.db";

  openPromise: Promise<void> | null = null;

  constructor(kvName = this.kvName) {
    this.kvName = kvName;
    this.openPromise = Deno.openKv(this.kvName).then((kv) => {
      this.kv = kv;
    });
  }

  async update(
    args: Omit<SongStatus, "updatedAt">,
  ) {
    await this.openPromise;
    await this.kv.set([args.albumCid, args.cid], {
      ...args,
      updatedAt: new Date(),
    });
  }

  async get(
    album: Pick<Album, "cid" | "name">,
    song: Pick<Song, "cid" | "name">,
  ): Promise<SongStatus> {
    await this.openPromise;
    const albumCid = album.cid;
    const cid = song.cid;

    const { value } = await this.kv.get([albumCid, cid]);
    if (value) {
      return StatusSchema.parse(value);
    }

    return {
      albumCid,
      cid,
      state: "not-exists",
      progress: 0,
      throughput: 0,
      updatedAt: new Date(),
    };
  }
}
