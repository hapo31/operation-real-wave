import { Song as MsrSong } from "../generated-msr/models/Song.ts";
import { SafeFilePath } from "../safeFilePath.ts";
import { FileStatus } from "../type.ts";

export default class SongModel implements MsrSong {
  cid: string;
  name: string;
  artistes: string[];
  filePath: string;
  status: FileStatus;

  constructor(entity: MsrSong, fileStatus: FileStatus) {
    this.cid = entity.cid;
    this.name = entity.name;
    this.artistes = entity.artists;
    const path = new SafeFilePath(`${entity.cid}_${entity.name}.flac`);
    this.filePath = path.toString();
    this.status = fileStatus;
  }
}
