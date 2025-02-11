import { MsrSong } from "../generated-msr/models/MsrSong.ts";
import { SafeFilePath, safeIsExists } from "../lib/safeFilePath.ts";
import { FileStatus } from "../type.ts";

export default class Song implements MsrSong {
  cid: string;
  name: string;
  filePath: string;
  status: FileStatus;
  albumCid: string;
  sourceUrl: string;
  lyricUrl: string;
  mvUrl: string | null;
  mvCoverUrl: string | null;
  artists: string[];

  constructor(entity: MsrSong, fileStatus: FileStatus) {
    this.cid = entity.cid;
    this.name = entity.name;
    const path = new SafeFilePath(`${entity.cid}_${entity.name}.flac`);
    this.filePath = path.toString();
    this.status = fileStatus;

    this.albumCid = entity.albumCid;
    this.sourceUrl = entity.sourceUrl;
    this.lyricUrl = entity.lyricUrl;
    this.mvUrl = entity.mvUrl;
    this.mvCoverUrl = entity.mvCoverUrl;
    this.artists = entity.artists;
  }

  static async fileStatus(entity: MsrSong): Promise<FileStatus> {
    return await safeIsExists(new SafeFilePath(`${entity.cid}_${entity.name}.flac`))
      ? FileStatus.EXISTS
      : FileStatus.NOT_EXISTS;
  }
}
