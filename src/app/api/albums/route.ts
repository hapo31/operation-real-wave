import { albums } from "@core/api.js";
import { escapeFileName } from "@core/file.js";
import { NextResponse } from "next/server.js";

export async function GET() {
  return NextResponse.json(await fetchAllAlbums());
}

export async function fetchAllAlbums() {
  const albumList = await albums();

  const res = albumList.data.map((album) => ({
    ...album,
    name: escapeFileName(album.name),
    originalName: album.name,
  }));

  return res;
}
