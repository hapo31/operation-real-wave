import { z } from "zod";
import { SafeFilePath } from "../lib/safeFilePath.ts";
import type { Response } from "npm:express";
import { Buffer } from "node:buffer";

type Params = {
  albumCid: string;
  songCid: string;
};

const paramSchema = z.object({
  albumCid: z.string(),
  songCid: z.string(),
});

export async function playRoute(req: Params, res: Response) {
  const { albumCid, songCid } = paramSchema.parse(req);

  let targetFile: SafeFilePath | null = null;
  for await (const dir of Deno.readDir(`./albums`)) {
    if (dir.name.startsWith(albumCid) && dir.isDirectory) {
      for await (const file of Deno.readDir(`./albums/${dir.name}`)) {
        if (file.name.startsWith(songCid) && file.isFile) {
          targetFile = new SafeFilePath("albums", dir.name, file.name);
          break;
        }
      }
    }
  }
  if (targetFile == null) {
    return await res.status(404).send("Not Found");
  }
  const data = await Deno.readFile(targetFile.toString());

  res.set("Content-Type", "audio/flac");
  res.set("Content-Length", data.byteLength.toString());
  await res.end(Buffer.from(data));
}
