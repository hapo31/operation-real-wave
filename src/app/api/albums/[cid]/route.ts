import { albumDetails, albums } from "@core/api.js";
import { escapeFileName } from "@core/file.js";
import { Param } from "@apptypes/urlParam.js";
import { NextResponse } from "next/server.js";

export async function GET(
  _req: Request,
  { params: { cid } }: Param<{ cid: string }>
) {
  const album = await fetchAlbums(cid);

  return NextResponse.json(album);
}

export async function fetchAlbums(cid: string) {
  const album = await albumDetails(cid);

  return {
    ...album.data,
    name: escapeFileName(album.data.name),
    originalName: album.data.name,
  };
}
