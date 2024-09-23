import { AlbumSummary } from "../generated-core/models/AlbumSummary.ts";
import { FileStatus } from "../generated-core/models/FileStatus.ts";
import { AlbumSummary as MsrAlbumSummary } from "../generated-msr/models/AlbumSummary.ts";
import { SafeFilePath, safeIsExists } from "../safeFilePath.ts";

export default class AlbumModel extends AlbumSummary {
  static async fromMsrEntity(entity: MsrAlbumSummary): Promise<AlbumSummary> {
    const model = new AlbumModel();

    model.cid = entity.cid;
    model.name = entity.name;
    model.artistes = entity.artistes;
    const path = new SafeFilePath(`${entity.cid}_${entity.name}`, "cover.jpg");
    model.coverPath = path.toString();
    model.status = await safeIsExists(path)
      ? FileStatus.Exists
      : FileStatus.NotExists;

    return model;
  }
}
