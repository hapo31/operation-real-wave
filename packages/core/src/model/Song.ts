import { MsrSong } from "../generated-msr/models/MsrSong.ts";

export default class Song implements MsrSong {
  cid: string;
  name: string;
  albumCid: string;
  sourceUrl: string;
  lyricUrl: string;
  mvUrl: string | null;
  mvCoverUrl: string | null;
  artists: string[];

  constructor(entity: MsrSong) {
    this.cid = entity.cid;
    this.name = entity.name;
    this.albumCid = entity.albumCid;
    this.sourceUrl = entity.sourceUrl;
    this.lyricUrl = entity.lyricUrl;
    this.mvUrl = entity.mvUrl;
    this.mvCoverUrl = entity.mvCoverUrl;
    this.artists = entity.artists;
  }
}
