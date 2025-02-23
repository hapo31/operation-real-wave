import { MsrAlbumDetails } from "../generated-msr/index.ts";

export default class AlbumDetail implements MsrAlbumDetails {
  cid: string;
  name: string;
  intro: string;
  belong: string;
  coverUrl: string;
  coverDeUrl: string;
  songs: never[];
  artistes: string[];

  songCids: string[] = [];

  constructor(entity: MsrAlbumDetails) {
    this.cid = entity.cid;
    this.name = entity.name;
    this.intro = entity.intro;
    this.belong = entity.belong;
    this.coverUrl = entity.coverUrl;
    this.coverDeUrl = entity.coverDeUrl;
    this.artistes = entity.artistes;
    // 曲情報は AlbumDetails では扱わない
    this.songs = [];
    this.songCids = entity.songs.map((song) => song.cid);
  }
}
