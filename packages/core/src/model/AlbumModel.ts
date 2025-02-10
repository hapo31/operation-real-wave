import { FileStatus } from "../generated-core/models/FileStatus.ts";
import { MsrAlbumSummary } from "../generated-msr/models/MsrAlbumSummary.ts";
import { SafeFilePath, safeIsExists, safeMkdir } from "../lib/safeFilePath.ts";

export default class AlbumModel implements MsrAlbumSummary {
  private filePath: SafeFilePath;
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
    this.filePath = new SafeFilePath(
      `${entity.cid}_${entity.name}`,
      "cover.jpg",
    );
    this.coverPath = this.filePath.toString();
    this.coverUrl = entity.coverUrl;
    this.coverDeUrl = entity.coverDeUrl;
  }

  static async fileStatus(album: AlbumModel): Promise<FileStatus> {
    return await safeIsExists(album.filePath) ? FileStatus.Exists : FileStatus.NotExists;
  }

  static async writeCover(album: AlbumModel, cover: ArrayBuffer): Promise<void> {
    // ディレクトリを作ってから保存
    await safeMkdir(album.filePath.dirname());

    await Deno.writeFile(album.filePath.toString(), new Uint8Array(cover));
  }
}
