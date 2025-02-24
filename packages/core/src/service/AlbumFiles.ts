import { SafeFilePath, safeMkdir } from "../lib/safeFilePath.ts";
import Album from "../model/Album.ts";

export default class AlbumFileService {
  static async writeCover(album: Pick<Album, "cid" | "name">, cover: ArrayBuffer): Promise<void> {
    const filePath = Album.getAlbumPath(album).joinLeft(SafeFilePath.basePath);

    // ディレクトリを作ってから保存
    await safeMkdir(filePath);
    await Deno.writeFile(filePath.join("cover.jpg").toString(), new Uint8Array(cover));
  }
}
