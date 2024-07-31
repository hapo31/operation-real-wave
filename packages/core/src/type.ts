export type Album = {
  cid: string;
  name: string;
  coverUrl: string;
  artistes: string[];
};

export type SongSummary = {
  cid: string;
  name: string;
  artistes: string[];
};

export type AlbumDetails = {
  cid: string;
  name: string;
  intro: string;
  belong: string;
  coverUrl: string;
  coverDeUrl: string;
  songs: SongSummary[];
};

export type Song = {
  cid: string;
  name: string;
  albumCid: string;
  sourceUrl: string;
  artists: string[];
};

export type AlbumsAPIResponse = {
  code: number;
  msg: string;
  data: Album[];
};

export type AlbumDetailsAPIResponse = {
  code: number;
  msg: string;
  data: AlbumDetails;
};

export type SongDetailsAPIResponse = {
  code: number;
  msg: string;
  data: Song;
};
