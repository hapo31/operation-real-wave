import { MsrAlbumSummary } from "../generated-msr/models/MsrAlbumSummary.ts";
import { SafeFilePath, safeIsExists, safeMkdir } from "../lib/safeFilePath.ts";
import { FileStatus } from "../type.ts";

export default class Album implements MsrAlbumSummary {
  cid: string;
  name: string;
  artistes: string[];

  coverUrl: string;
  coverDeUrl: string;

  constructor(entity: MsrAlbumSummary) {
    this.cid = entity.cid;
    this.name = entity.name;
    this.artistes = entity.artistes;
    this.coverUrl = entity.coverUrl;
    this.coverDeUrl = entity.coverDeUrl;
  }
}
