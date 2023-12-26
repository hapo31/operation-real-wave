import { songDetails } from "@core/api.js";
import { escapeFileName } from "@core/file.js";
import { Param } from "@apptypes/urlParam.js";
import { NextResponse } from "next/server.js";

export default async function GET(
  _req: Request,
  { params: { cid } }: Param<{ cid: string }>
) {
  return NextResponse.json(await fetchSong(cid));
}

export function fetchSong(cid: string) {
  return songDetails(cid).then(({ data }) => ({
    ...data,
    name: escapeFileName(data.name),
    originalName: data.name,
  }));
}
