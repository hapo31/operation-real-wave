import { MsrAlbumSummary } from "../generated-msr/models/MsrAlbumSummary.ts";
import { SafeFilePath, safeIsExists, safeMkdir } from "../lib/safeFilePath.ts";
import { FileStatus } from "../type.ts";

export default class Album implements MsrAlbumSummary {
  dirPath: string;
  coverPath: string;

  cid: string;
  name: string;
  artistes: string[];

  coverUrl: string;
  coverDeUrl: string;

  constructor(entity: MsrAlbumSummary) {
    this.cid = entity.cid;
    this.name = entity.name;
    this.artistes = entity.artistes;
    const base = new SafeFilePath(
      `${entity.cid}_${entity.name}`,
    );
    this.dirPath = base.toString();
    this.coverPath = base.join("cover.jpg").toString();
    this.coverUrl = entity.coverUrl;
    this.coverDeUrl = entity.coverDeUrl;
  }

  static async fileStatus(album: Album): Promise<FileStatus> {
    return await safeIsExists(new SafeFilePath(album.dirPath))
      ? FileStatus.EXISTS
      : FileStatus.NOT_EXISTS;
  }

  static async writeCover(album: Album, cover: ArrayBuffer): Promise<void> {
    // ディレクトリを作ってから保存
    await safeMkdir(new SafeFilePath(album.coverPath).dirname());

    await Deno.writeFile(album.coverPath.toString(), new Uint8Array(cover));
  }
}
