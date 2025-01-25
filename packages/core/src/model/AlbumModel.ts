import { AlbumSummary } from "../generated-core/models/AlbumSummary.ts";
import { FileStatus } from "../generated-core/models/FileStatus.ts";
import { AlbumSummary as MsrAlbumSummary } from "../generated-msr/models/AlbumSummary.ts";
import { SafeFilePath, safeIsExists } from "../lib/safeFilePath.ts";

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
}
