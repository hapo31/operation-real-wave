import { Hono } from "npm:hono";
import * as api from "./src/api.ts";
import type { Album, AlbumDetails, Song } from "./src/type.ts";
import { SafeFilePath, safeIsExists } from "./src/safeFilePath.ts";
import "https://deno.land/std@0.203.0/dotenv/load.ts";

const basePath = Deno.env.get("FILE_BASE_FULLPATH");

if (basePath == null) {
  throw new Error("FILE_BASE_FULLPATH is required on environment variables");
}

const app = new Hono();
const kv = await Deno.openKv();

app.get("/albums", async (c) => {
  const { data: originAlbums } = await api.albums();
  const albumsResult = await kv.list({ prefix: ["albums"] });

  const albums: Album[] = [];
  for await (const item of albumsResult) {
    albums.push(item.value as Album);
  }

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

  return c.json({ ...albumDetail });
});

app.get("/song/:songCid", async (c) => {
  const { songCid } = c.req.param();

  const song = await kv.get(["song", songCid]);
  if (song.versionstamp != null) {
    return c.json({ ...(song.value as Song) });
  }

  const { data: originSong } = await api.songDetails(songCid);

  await kv.set(["song", songCid], originSong);

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

Deno.serve(app.fetch);
