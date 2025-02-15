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
    const base = Album.getAlbumPath(entity);
    this.dirPath = base.toString();
    this.coverPath = base.join("cover.jpg").toString();
    this.coverUrl = entity.coverUrl;
    this.coverDeUrl = entity.coverDeUrl;
  }

  static async fileStatus(album: Pick<Album, "cid" | "name">): Promise<FileStatus> {
    return await safeIsExists(Album.getAlbumPath(album))
      ? FileStatus.EXISTS
      : FileStatus.NOT_EXISTS;
  }

  static async writeCover(album: Pick<Album, "cid" | "name">, cover: ArrayBuffer): Promise<void> {
    const filePath = Album.getAlbumPath(album).joinLeft(SafeFilePath.basePath);

    // ディレクトリを作ってから保存
    await safeMkdir(filePath);
    await Deno.writeFile(filePath.join("cover.jpg").toString(), new Uint8Array(cover));
  }

  static getAlbumPath(entity: Pick<Album, "cid" | "name">): SafeFilePath {
    return new SafeFilePath(
      `${entity.cid}_${entity.name}`,
    );
  }
}
