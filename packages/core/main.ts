import { Hono } from "npm:hono";
import { pLimit } from "https://deno.land/x/p_limit@v1.0.0/mod.ts";
import { HTTPException } from "npm:hono/http-exception";
import * as api from "./src/api.ts";
import type { Album, AlbumDetails, Song } from "./src/type.ts";
import { SafeFilePath, safeIsExists } from "./src/safeFilePath.ts";
import "https://deno.land/std@0.203.0/dotenv/load.ts";
import { toArray, toArrayAsync } from "./src/iterator.ts";

const basePath = Deno.env.get("FILE_BASE_FULLPATH");

if (basePath == null) {
  throw new Error("FILE_BASE_FULLPATH is required on environment variables");
}

const app = new Hono();
const kv = await Deno.openKv();

app.get("/albums", async (c) => {
  const { data: originAlbums } = await api.albums();
  const albumsResult = await kv.list<Album>({ prefix: ["albums"] });

  const albums = await toArrayAsync(albumsResult);

  if (originAlbums.length === albums.length) {
    return c.json({ albums });
  }

  await Promise.all(
    originAlbums.map((album) => kv.set(["albums", album.cid], album)),
  );

  return c.json({ albums: originAlbums });
});

app.get("/albums/:albumCid", async (c) => {
  const { albumCid } = c.req.param();

  const albumResult = await kv.get(["albums", albumCid]);
  if (albumResult.versionstamp != null) {
    return c.json({ ...(albumResult.value as Album) });
  }

  const { data: albumDetail } = await api.albumDetails(albumCid);

  const album: Album = {
    name: albumDetail.name,
    cid: albumDetail.cid,
    coverUrl: albumDetail.coverUrl,
    artistes: albumDetail.songs.map((song) => song.artistes).flat(),
  };

  await kv.set(["albums", albumCid], album);
  await kv.set(["albums", "details", albumCid], albumDetail);

  return c.json({ ...album });
});

app.get("/albums/:albumCid/details", async (c) => {
  const { albumCid } = c.req.param();

  const albumDetailsesult = await kv.get(["albums", "details", albumCid]);
  if (albumDetailsesult.versionstamp != null) {
    return c.json({ ...(albumDetailsesult.value as AlbumDetails) });
  }

  const { data: albumDetail } = await api.albumDetails(albumCid);

  await kv.set(["albums", "details", albumCid], albumDetail);

  await Promise.all(
    albumDetail.songs.map((song) =>
      kv.set(["songs", albumDetail.cid, song.cid], song)
    ),
  );

  return c.json({ ...albumDetail });
});

app.get("/song/:songCid", async (c) => {
  const { songCid } = c.req.param();

  const song = await kv.get(["songs", songCid]);
  if (song.versionstamp != null) {
    return c.json({ ...(song.value as Song) });
  }

  const { data: originSong } = await api.songDetails(songCid);

  await kv.set(["songs", originSong.albumCid, songCid], originSong);
  await kv.set(["songs", "details", songCid], originSong);

  return c.json({ ...originSong });
});

app.post("/file/cover/:albumCid", async (c) => {
  const { albumCid } = c.req.param();

  const albumResult = await kv.get(["albums", albumCid]);
  if (albumResult.versionstamp == null) {
    return c.notFound();
  }

  const album = albumResult.value as AlbumDetails;

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

app.post("/file/songs", async (c) => {
  const { targetCids } = await c.req.json<{ targetCids: string[] }>();
  if (targetCids == null) {
    throw new HTTPException(400, {
      message: 'require { "targetCids": string[] } property in body.',
    });
  }
  const songs = await kv.getMany<Song[]>(
    targetCids.map((cid) => ["songs", "details", cid]),
  );
  const songStatuses = (await kv.getMany<{ cid: string; state: string }[]>(
    targetCids.map((cid) => ["status", "song", cid]),
  )).reduce(
    (acc, prev) =>
      prev.value == null ? acc : { ...acc, [prev.value.state]: prev.value },
    {} as Record<string, { cid: string; state: string }>,
  );

  const targetSongs = await toArray(songs.values()).map((song) => song.value)
    .filter((song): song is Song =>
      song != null && songStatuses[song.cid] == null
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

Deno.serve(app.fetch);
