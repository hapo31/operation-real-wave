import { Hono } from "npm:hono";
import { HTTPException } from "npm:hono/http-exception";
import { z } from "npm:zod";

import * as api from "./src/api.ts";
import type { Album, AlbumDetails, Song } from "./src/type.ts";
import { SafeFilePath, safeIsExists } from "./src/safeFilePath.ts";
import "https://deno.land/std@0.203.0/dotenv/load.ts";
import { toArray } from "./src/iterator.ts";
import DenoKVModel from "./src/lib/DenoKVModel.ts";
import { AlbumSchema, SongSummary } from "./src/type.ts";

import * as songStatus from "./src/songStatus.ts";
import { AlbumFetchEventPayload } from "./src/worker/albumFetcher.ts";
import { AlbumEntity } from "./src/fetcher.ts";
import { OpenAPIHonoWA } from "./src/lib/OpenAPIWrapper.ts";

const basePath = Deno.env.get("FILE_BASE_FULLPATH");

if (basePath == null) {
  throw new Error("FILE_BASE_FULLPATH is required on environment variables");
}

const app = new Hono();
const app2 = new OpenAPIHonoWA();
const kv = await Deno.openKv();

const albumModel = new DenoKVModel<Album>(["albums"]);
const albumDetailsModel = new DenoKVModel<AlbumDetails>(["albums", "details"]);
const songsBelongToAlbumModel = new DenoKVModel<SongSummary>(["songs"]);
const songModel = new DenoKVModel<Song>(["songs", "details"]);

app2.add({
  path: "albums",
  method: "get",
  request: { schema: AlbumSchema },
  response: {
    200: {
      schema: z.array(AlbumSchema),
    },
  },
}, async () => {
  const [albums] = await albumModel.list();
  return albums;
}).swagger("/doc.json", "/swagger");

app.get("/albums", async (c) => {
  const [albums] = await albumModel.list();
  return c.json({ albums });
});

app.post("/albums", async (c) => {
  const { data: originAlbums } = await api.albums();

  const [albums] = await albumModel.list();

  if (originAlbums.length === albums.length) {
    return c.json({ albums });
  }

  await albumModel.setMany("cid", originAlbums);

  return c.json({ albums: originAlbums });
});

app.get("/albums/:albumCid", async (c) => {
  const { albumCid } = c.req.param();

  const [albumDetail, albumResult] = await albumDetailsModel.get(
    albumCid,
    async () => {
      const { data: albumDetail } = await api.albumDetails(albumCid);
      return albumDetail;
    },
  );
  if (albumResult.versionstamp != null) {
    return c.json({ albumDetail });
  }

  const album: Album = {
    name: albumDetail.name,
    cid: albumDetail.cid,
    coverUrl: albumDetail.coverUrl,
    artistes: albumDetail.songs.map((song) => song.artistes).flat(),
  };

  await albumModel.set(albumCid, album);

  return c.json({ album });
});

app.get("/albums/:albumCid/details", async (c) => {
  const { albumCid } = c.req.param();

  const [albumDetail, albumDetailsResult] = await albumDetailsModel.get(
    albumCid,
    async () => {
      const { data: albumDetail } = await api.albumDetails(albumCid);
      return albumDetail;
    },
  );

  if (albumDetailsResult.versionstamp != null) {
    return c.json({ albumDetail });
  }

  await songsBelongToAlbumModel.setMany("cid", albumDetail.songs, [
    albumDetail.cid,
  ]);

  return c.json({ albumDetail });
});

app.get("/albums/:albumCid/songs", async (c) => {
  const { albumCid } = c.req.param();

  const [songs] = await songsBelongToAlbumModel.list(
    albumCid,
  );

  if (songs.length === 0) {
    const { data: albumDetails } = await api.albumDetails(albumCid);
    await songsBelongToAlbumModel.setMany("cid", albumDetails.songs);
    return c.json({ songs: albumDetails.songs });
  }

  return c.json({ songs });
});

app.get("/song/:songCid", async (c) => {
  const { songCid } = c.req.param();

  const [song, songResult] = await songModel.get(songCid, async () => {
    const { data: originSong } = await api.songDetails(songCid);
    return originSong;
  });
  if (songResult.versionstamp != null) {
    return c.json({ song });
  }

  songsBelongToAlbumModel.set([songCid, song.albumCid], {
    name: song.name,
    cid: song.cid,
    artistes: song.artists,
  });

  return c.json({ song });
});

app.post("/file/cover/:albumCid", async (c) => {
  const { albumCid } = c.req.param();

  const [album] = await albumModel.get(albumCid);
  if (album == null) {
    return c.notFound();
  }

  const destDirPath = new SafeFilePath(
    basePath,
    `${albumCid}_${album.name}`,
  );

  const filePath = destDirPath.join("cover.jpg");

  if (await safeIsExists(filePath)) {
    return c.json({ filePath: filePath.toString(), new: false });
  }

  const coverBuffer = await fetch(album.coverUrl).then((res) =>
    res.arrayBuffer()
  );

  await Deno.mkdir(destDirPath.toString(), { recursive: true }).catch(() => {});
  await Deno.writeFile(
    destDirPath.join("cover.jpg").toString(),
    new Uint8Array(coverBuffer),
  );

  return c.json({ filePath: filePath.toString(), new: true });
});

app.post("/file/album/", async (c) => {
  const { targetAlbumCids } = await c.req.json<{ targetAlbumCids: string[] }>();
  if (targetAlbumCids == null) {
    throw new HTTPException(400, {
      message: 'require { "targetAlbumCids": string[] } property in body.',
    });
  }
  const [albums] = await albumDetailsModel.getMany(targetAlbumCids);

  const [songs] = await songModel.getMany(
    albums.flatMap((album) => album.songs.map((song) => song.cid)),
  );

  const songRecord = Object.fromEntries(songs.map((song) => [song.cid, song]));

  const targetAlbums: AlbumEntity[] = albums.map((album) => ({
    ...album,
    songs: album.songs.map((song) => songRecord[song.cid]),
    albumArtistes: album.songs.map((song) => songRecord[song.cid].artists)
      .flat(),
  }));
  await startWorker({ type: "fetchAlbum", targetAlbums, basePath: "dist" });
});

app.post("/file/songs", async (c) => {
  const { targetCids } = await c.req.json<{ targetCids: string[] }>();
  if (targetCids == null) {
    throw new HTTPException(400, {
      message: 'require { "targetCids": string[] } property in body.',
    });
  }
  const [songs] = await songModel.getMany(targetCids);
  const songStatuses = await songStatus.getSongStatuses(targetCids);

  const targetSongs = songs
    .filter((song): song is Song =>
      song != null && songStatuses[song.cid].status === "NOT_EXIST"
    );

  setTimeout(async () => {
    await Promise.all(
      targetSongs.map((song) =>
        kv.set(["status", "song", song.cid], { state: "QUEUED", cid: song.cid })
      ),
    );

    // TODO: setTimeout でワーカー立ち上げみたいなことはできるっぽい
    // 曲を取得してファイルとステータスに書き込む処理
    // つらくなってきたのでちょっと構造化したさある
    const int = setInterval(() => console.log("test"), 500);
    setTimeout(() => clearInterval(int), 3000);
  }, 0);

  return c.json({
    targetSongs,
  });
});

app.post("/file/status", async (c) => {
  const { targetCids } = await c.req.json<{ targetCids: string[] }>();
  if (targetCids == null) {
    throw new HTTPException(400, {
      message: 'require { "targetCids": string[] } property in body.',
    });
  }
  const songs = await kv.getMany<Song[]>(
    targetCids.map((cid) => ["status", "song", cid]),
  );

  const targetSongStatuses = await toArray(songs.values()).map((song) =>
    song.value
  );

  return c.json({
    targetSongStatuses,
  });
});

function startWorker(req: AlbumFetchEventPayload) {
  const worker = new Worker(
    new URL("./worker/albumFetcher.ts", import.meta.url).href,
    {
      type: "module",
      deno: true,
      // deno-lint-ignore no-explicit-any
    } as any,
  );

  worker.postMessage(req);
}

app2.serve();
