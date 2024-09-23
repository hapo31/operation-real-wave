import { FileStatus } from "../generated-core/models/FileStatus.ts";
import { Song } from "../generated-core/models/Song.ts";
import { Song as MsrSong } from "../generated-msr/models/Song.ts";
import { SafeFilePath, safeIsExists } from "../safeFilePath.ts";

export default class SongModel extends Song {
  static async fromMsrEntity(entity: MsrSong): Promise<SongModel> {
    const model = new SongModel();

    model.cid = entity.cid;
    model.name = entity.name;
    model.artistes = entity.artists;
    const path = new SafeFilePath(`${entity.cid}_${entity.name}.flac`);
    model.filePath = path.toString();
    model.status = await safeIsExists(path)
      ? FileStatus.Exists
      : FileStatus.NotExists;

    return model;
  }
}
