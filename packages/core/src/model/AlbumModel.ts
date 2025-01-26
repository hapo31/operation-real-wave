import { AlbumSummary } from "../generated-core/models/AlbumSummary.ts";
import { FileStatus } from "../generated-core/models/FileStatus.ts";
import { MsrAlbumSummary } from "../generated-msr/models/MsrAlbumSummary.ts";
import { SafeFilePath, safeIsExists, safeMkdir } from "../lib/safeFilePath.ts";

export default class AlbumModel extends AlbumSummary {
  private filePath: SafeFilePath;

  constructor(entity: MsrAlbumSummary) {
    super();
    this.cid = entity.cid;
    this.name = entity.name;
    this.artistes = entity.artistes;
    this.filePath = new SafeFilePath(
      `${entity.cid}_${entity.name}`,
      "cover.jpg",
    );
    this.coverPath = this.filePath.toString();
  }

  async fileStatus(): Promise<FileStatus> {
    return await safeIsExists(this.filePath)
      ? FileStatus.Exists
      : FileStatus.NotExists;
  }

  async writeCover(cover: ArrayBuffer): Promise<void> {
    // ディレクトリを作ってから保存
    await safeMkdir(this.filePath.dirname());

    await Deno.writeFile(this.filePath.toString(), new Uint8Array(cover));
  }
}
